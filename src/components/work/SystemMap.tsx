const nodes = [
  { label: "Browser", detail: "React · WebSocket", x: 10, y: 200, w: 170, h: 100 },
  { label: "Node proxy", detail: "$PORT · routing", x: 270, y: 200, w: 180, h: 100 },
  { label: "Next.js 14", detail: "App Router", x: 540, y: 40, w: 200, h: 92 },
  { label: "Express auth", detail: "NextAuth", x: 540, y: 202, w: 200, h: 92 },
  { label: "Socket.IO 4.7", detail: "chat · presence", x: 540, y: 364, w: 200, h: 92 },
  { label: "PostgreSQL 16", detail: "Neon · Prisma · 62 models", x: 830, y: 200, w: 190, h: 100 },
];

const packets = [
  { path: "M180 250 H270", dur: "2.6s" },
  { path: "M450 250 C495 250 495 86 540 86", dur: "3.2s" },
  { path: "M450 250 C495 250 495 410 540 410", dur: "3.5s" },
  { path: "M640 132 V202", dur: "2.2s" },
  { path: "M740 86 H790 V250 H830", dur: "4.2s" },
  { path: "M740 248 H830", dur: "3.1s" },
  { path: "M740 410 H790 V250 H830", dur: "4.6s" },
];

export default function SystemMap() {
  return (
    <div className="mt-10">
      <div className="hidden overflow-hidden border border-[#1B1915]/15 bg-[#F8F4EC] md:block">
        <svg
          viewBox="0 0 1040 500"
          role="img"
          aria-label="TaskFlow system architecture: a browser connects to a Node proxy, which routes to Next.js, Express auth and Socket.IO, all backed by PostgreSQL through Prisma"
          className="h-auto w-full"
        >
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#1B1915" fillOpacity="0.35" />
            </marker>
          </defs>

          <text x="10" y="32" fill="#1B1915" fillOpacity="0.4" className="font-mono" fontSize="10" letterSpacing="2">
            REQUEST PATH / SINGLE CONTAINER
          </text>
          <text x="1030" y="32" fill="#7A2020" textAnchor="end" className="font-mono" fontSize="10" letterSpacing="2">
            RENDER FREE · NEON FREE
          </text>

          {[
            "M180 250 H270",
            "M450 250 C495 250 495 86 540 86",
            "M450 250 C495 250 495 410 540 410",
            "M640 132 V202",
            "M740 86 H790 V250 H830",
            "M740 248 H830",
            "M740 410 H790 V250 H830",
          ].map((d) => (
            <path
              key={d}
              d={d}
              fill="none"
              stroke="#1B1915"
              strokeOpacity="0.26"
              strokeWidth="1"
              markerEnd="url(#arrow)"
              strokeDasharray={d === "M640 132 V202" ? "3 3" : undefined}
            />
          ))}

          {packets.map((packet) => (
            <circle key={packet.path} r="3" fill="#7A2020">
              <animateMotion dur={packet.dur} repeatCount="indefinite" path={packet.path} />
            </circle>
          ))}

          <text x="225" y="240" fill="#1B1915" fillOpacity="0.4" textAnchor="middle" className="font-mono" fontSize="9" letterSpacing="1">
            HTTP / WS
          </text>
          <text x="488" y="156" fill="#1B1915" fillOpacity="0.4" textAnchor="middle" className="font-mono" fontSize="9" letterSpacing="1">
            {"/*"}
          </text>
          <text x="488" y="356" fill="#1B1915" fillOpacity="0.4" textAnchor="middle" className="font-mono" fontSize="9" letterSpacing="1">
            /socket.io
          </text>
          <text x="650" y="174" fill="#1B1915" fillOpacity="0.4" className="font-mono" fontSize="9" letterSpacing="1">
            server-side fetch
          </text>

          {nodes.map((node, index) => (
            <g key={node.label}>
              <rect
                x={node.x}
                y={node.y}
                width={node.w}
                height={node.h}
                fill="#F8F4EC"
                stroke="#1B1915"
                strokeOpacity="0.24"
              />
              <text x={node.x + 16} y={node.y + 24} fill="#7A2020" className="font-mono" fontSize="9" letterSpacing="1.5">
                {String(index + 1).padStart(2, "0")}
              </text>
              <text
                x={node.x + 16}
                y={node.y + 50}
                fill="#1B1915"
                className="font-mono"
                fontSize="13"
                letterSpacing="1.4"
              >
                {node.label.toUpperCase()}
              </text>
              <text x={node.x + 16} y={node.y + 70} fill="#1B1915" fillOpacity="0.48" fontSize="11">
                {node.detail}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="border border-[#1B1915]/15 bg-[#F8F4EC] p-5 md:hidden">
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#1B1915]/40">
          Request path / single container
        </p>
        <div className="mt-5 space-y-3">
          {[
            ["01", "Browser", "React · WebSocket"],
            ["02", "Node proxy", "routes /*, /api/auth, /socket.io"],
          ].map(([n, title, detail]) => (
            <div key={n} className="border border-[#1B1915]/15 px-4 py-3">
              <div className="font-mono text-[9px] tracking-[1.5px] text-[#7A2020]">{n}</div>
              <div className="mt-1 font-mono text-[12px] tracking-[1px]">{title.toUpperCase()}</div>
              <div className="mt-0.5 text-[11px] text-[#1B1915]/50">{detail}</div>
            </div>
          ))}
          <div className="grid grid-cols-2 gap-2">
            {["Next.js", "Socket.IO"].map((label) => (
              <div key={label} className="border border-[#1B1915]/15 px-2 py-3 text-center">
                <div className="font-mono text-[9px] tracking-[0.8px]">{label.toUpperCase()}</div>
              </div>
            ))}
          </div>
          <div className="border border-[#1B1915]/15 px-4 py-3">
            <div className="font-mono text-[9px] tracking-[1.5px] text-[#7A2020]">03</div>
            <div className="mt-1 font-mono text-[12px] tracking-[1px]">EXPRESS AUTH</div>
            <div className="mt-0.5 text-[11px] text-[#1B1915]/50">Called server-side by Next.js</div>
          </div>
          <div className="border border-[#1B1915]/15 px-4 py-3">
            <div className="font-mono text-[9px] tracking-[1.5px] text-[#7A2020]">04</div>
            <div className="mt-1 font-mono text-[12px] tracking-[1px]">POSTGRESQL 16</div>
            <div className="mt-0.5 text-[11px] text-[#1B1915]/50">Neon · Prisma · 62 models</div>
          </div>
        </div>
      </div>
    </div>
  );
}
