---
title: "One deploy, three services: the trade-offs of a single-container product"
published: false
description: "TaskFlow runs Next.js, Express auth, and Socket.IO in one 512 MB container. Here is what that buys and what it costs."
tags: architecture, nextjs, node, webdev
---

TaskFlow runs three services: a Next.js app, an Express authentication service, and a Socket.IO server.

On a larger team, that would be three deployments, a service mesh, and a shared Redis instance for presence. TaskFlow runs all three behind one Node proxy in a single 512 MB Render container.

That is not a claim that one container is the right architecture for every product. It is a claim that the constraint forced useful decisions early.

## The proxy is the smallest interesting part

The proxy has one job:

```text
/socket.io  -> Socket.IO
everything else -> Next.js
```

Next.js API routes call the Express auth service server-side over localhost. The browser only ever sees one origin. There is no CORS maze, no public auth hop, and no second TLS certificate.

```ts
// shape, not the exact TaskFlow implementation
server.on("request", (req, res) => {
  if (req.url?.startsWith("/socket.io")) {
    socketHandler(req, res);
    return;
  }
  nextHandler(req, res);
});
```

The auth service is not exposed directly. That keeps identity checks server-side and makes the browser-facing contract small: one origin, one cookie policy, one place to add a security header.

## What the constraint bought

### One schema

The app, auth, and socket processes share one Prisma schema and one PostgreSQL database. There is no synchronization layer between "users" and "chat participants" because they are the same rows.

### One deploy

There is one build, one release, one rollback, and one place to look when a request is slow. For a small product, that operational simplicity is worth more than independent scaling that is not needed yet.

### One mental model

The request path is short enough to keep in my head:

```text
Browser
  -> Node proxy
     -> Next.js
     -> Express auth
     -> Socket.IO
        -> PostgreSQL
```

When something breaks, I do not need to ask which service owns the request. I can trace it.

## What it costs

The trade-offs are equally real.

- **Shared failure domain.** If the container runs out of memory, chat, auth, and the dashboard leave together.
- **Single socket instance.** Socket.IO runs in-process with no Redis adapter. Presence and fan-out work for this build, but horizontal scaling would need shared state.
- **No independent scaling.** A heavy dashboard query and a realtime connection compete for the same memory and CPU.
- **Ephemeral uploads.** On the free tier, local files do not survive a restart. That is documented, not hidden.

These are not embarrassing details. They are the shape of the system. A case study that only lists the wins is a brochure, not an engineering document.

## When I would split it

I would move off the single container when one of these becomes true:

1. Realtime traffic needs more than one instance.
2. Background jobs start competing with request latency.
3. Uploads need durable, independently scalable storage.
4. Multiple teams need to deploy different services on different schedules.
5. The free-tier memory ceiling becomes a recurring incident.

The first split would be the socket layer. Put fan-out behind a shared adapter, move background work out of the web process, and keep the single-origin contract for the browser. The Next.js app can still call auth server-side.

## The rule I use

Use the simplest topology that makes the current failure modes visible. Do not use a distributed system to avoid writing down a limit.

TaskFlow's limit is written in the case study: one container, one socket instance, one database, no Redis. A reader can decide whether that is acceptable for their own scale. That is more useful than pretending the system is bigger than it is.

If you are building a small product on a free tier, a single container can be a feature. The important part is knowing exactly when it stops being one.
