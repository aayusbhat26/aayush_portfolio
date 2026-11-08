---
title: "One deploy, three services: the trade-offs of a single-container product"
published: false
description: "TaskFlow runs Next.js, an Express auth service, and Socket.IO inside one Render Free container. Here is what the constraint buys and what it costs."
tags: architecture, node, nextjs, webdev
---

A container is a deployment decision, not a packaging format.

When I started building TaskFlow, a chat-native work OS with tasks, notes, mind maps, calendar and realtime chat, I had a hard budget: Render Free, one web service, half a gigabyte of RAM. That single number did more to shape the architecture than any diagram I drew afterwards. The live app is at [taskflow-render.onrender.com](https://taskflow-render.onrender.com/en) and the code is at [aayusbhat26/task_flow](https://github.com/aayusbhat26/task_flow).

## The topology that fits the bill

TaskFlow is three services plus one entrypoint, all in a single image:

| Process | What it does | Port | V8 heap cap |
|---|---|---|---|
| `web` | Next.js standalone server | 3000 | 192 MB |
| `auth` | Express auth and onboarding API | 3003 | 96 MB |
| `socket` | Socket.IO server | 3002 | 96 MB |
| `proxy` | Node entrypoint on the public port | `$PORT` | 48 MB |

Those heap caps are not aspirations. They are `NODE_OPTIONS` values in `deploy/supervisord.conf`, and they sum to 432 MB inside a 512 MB container. The remaining 80 MB is not headroom, it is everything else: the Alpine base image, Prisma's engine, the Postgres client buffers, and the OS.

Supervisor starts them in priority order and restarts any of them that dies:

```ini
[program:socket]
command=node /app/socket/dist/server.js
directory=/app/socket
environment=NODE_ENV="production",PORT="3002",SOCKET_PORT="3002",HOME="/home/node",NODE_OPTIONS="--max-old-space-size=96"
autostart=true
autorestart=true
startretries=20
priority=20
```

So a socket crash takes the chat down for a few seconds and then brings it back without touching the dashboard.

## The proxy is the smallest interesting part

Render routes public traffic to one port. The proxy owns that port and forwards everything else to Next.js:

```js
const WEB = { host: '127.0.0.1', port: Number(process.env.WEB_PORT || 3000) };
const SOCKET = { host: '127.0.0.1', port: Number(process.env.SOCKET_PORT || 3002) };

function targetFor(url) {
  return url.startsWith('/socket.io') ? SOCKET : WEB;
}
```

The request path is a plain `http.request` upstream, so the browser gets one origin, one TLS certificate and one cookie policy:

```js
const upstream = http.request(
  { host: target.host, port: target.port, method: req.method, path: req.url, headers: requestHeaders(req) },
  (upstreamRes) => {
    res.writeHead(upstreamRes.statusCode || 502, responseHeaders(upstreamRes));
    upstreamRes.pipe(res);
  },
);
```

Realtime traffic takes the `upgrade` path, where the proxy hands the raw socket to Socket.IO:

```js
server.on('upgrade', (req, socket, head) => {
  const target = targetFor(req.url || '/');
  const upstream = net.connect(target.port, target.host, () => {
    const lines = Object.entries(req.headers).map(([key, value]) => `${key}: ${value}`).join('\r\n');
    upstream.write(`${req.method} ${req.url} HTTP/1.1\r\n${lines}\r\n\r\n`);
    if (head && head.length) upstream.write(head);
    upstream.pipe(socket);
    socket.pipe(upstream);
  });
});
```

The auth service never appears in `targetFor`. The browser cannot address it. Next.js API routes reach it over the container's internal network:

```ts
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || "http://localhost:3003";

const response = await fetch(`${AUTH_SERVICE_URL}/api/auth/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});
```

One public origin, one proxy, and identity checks that stay server-side.

There is a detail in the proxy's header handling worth keeping. It is the only place security headers are added, so a response from either upstream inherits them:

```js
const SECURITY_HEADERS = {
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'SAMEORIGIN',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'permissions-policy': 'camera=(self), microphone=(self), display-capture=(self)',
};
```

This proxy was not the original plan. The first version put Caddy in front of the same three services. Caddy could not be exec'd on Render's container security policy, so `deploy/proxy.js` replaced it and the Caddyfile has stayed in the repo as a fossil of the earlier design.

## What the constraint bought

### One schema

The three services generate their Prisma client from the same file, `prisma/schema.prisma`, which has 62 models. Users, workspaces, chat messages, notes, mind map nodes and calendar events are rows in one Postgres database. There is no synchronisation layer between "users" and "chat participants" because they are the same rows.

### One deploy

One image, one release, one rollback. Migrations run at startup against the direct connection string, with retries, before supervisor starts anything else:

```sh
attempt=1
migration_ok=0
while [ "$attempt" -le 8 ]; do
  if prisma migrate deploy --schema=/app/prisma/schema.prisma; then
    migration_ok=1
    break
  fi
  echo "Migration attempt $attempt failed. Retrying in 5s..."
  attempt=$((attempt + 1))
  sleep 5
done
```

### One mental model

The request path is short enough to keep in my head:

```text
Browser
  -> proxy (:10000)
     -> web  (:3000)   Next.js
          -> auth (:3003)  Express
     -> socket (:3002)  Socket.IO
          -> Postgres
```

When something breaks, I do not have to ask which service owns the request. I can trace it.

## What it costs

The trade-offs are equally real.

**Shared failure domain.** If the container is OOM-killed, chat, auth and the dashboard leave together. The heap caps reduce the chance of that, but they do not remove it.

**A single socket instance, and presence that lives in memory.** Socket.IO runs with no Redis adapter, so fan-out is local to one process. Presence is a `Map` in that process:

```ts
const activeUsers = new Map<
  string,
  { userId: string; username: string; socketId: string; workspaceId?: string }
>();
```

Rooms, typing indicators and read state all work for this build, and the durable part of chat is in Postgres. But who is online is only true inside one container. Restart the service and every presence list empties.

**No independent scaling.** A heavy dashboard query and two hundred realtime sockets compete for the same 512 MB. If I needed one to grow without the other, this topology would be the wrong answer.

**Ephemeral uploads.** Files land on the container's disk:

```ts
const uploadsDir = path.join(process.cwd(), "public", "uploads");
await mkdir(uploadsDir, { recursive: true });
await writeFile(path.join(uploadsDir, fileName), bytes);
```

That directory is gone on the next deploy. It is a documented limit of the free tier, not a bug, and it is exactly the kind of thing that should be written down rather than discovered by a user.

These are not embarrassing details. They are the shape of the system. A case study that only lists the wins is a brochure, not an engineering document.

## When I would split it

I would move off the single container when one of these becomes true:

1. Realtime traffic needs more than one instance, so fan-out needs a shared adapter.
2. Background jobs start competing with request latency for the same heap.
3. Uploads need durable, independently scalable storage.
4. Different parts of the product need to ship on different schedules.
5. The 512 MB ceiling turns into a recurring incident instead of a design constraint.

The first split would be the socket layer. Put fan-out behind a shared adapter, move background work out of the web process, and keep the single-origin contract for the browser. The Next.js app can still call auth server-side, so the browser does not need to learn about a new origin.

The repository still carries the other topology, in `docker-compose.yml` and the per-service Dockerfiles, because local development and the EC2 deployment use separate containers. One repo, two shapes, chosen by the budget in front of you.

## The rule I use

Use the simplest topology that makes the current failure modes visible. Do not reach for a distributed system to avoid writing down a limit.

TaskFlow's limit is written down: one container, one socket instance, one database, no Redis, uploads that do not survive a deploy. A reader can decide whether that is acceptable for their own scale. That is more useful than pretending the system is bigger than it is.

If you are building a small product on a free tier, a single container can be a feature. The important part is knowing exactly when it stops being one.
