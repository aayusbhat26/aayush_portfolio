"use client";

import { useEffect, useRef, useState } from "react";

type Difficulty = "easy" | "medium" | "hard";

const CELL_COLORS: Record<Difficulty, string> = {
  easy: "bg-[#c9c9c1]",
  medium: "bg-[#6f6f69]",
  hard: "bg-[#c74634]",
};

export default function SolvedMosaic({
  easy,
  medium,
  hard,
}: {
  easy: number;
  medium: number;
  hard: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const cells: Difficulty[] = [
    ...Array<Difficulty>(easy).fill("easy"),
    ...Array<Difficulty>(medium).fill("medium"),
    ...Array<Difficulty>(hard).fill("hard"),
  ];

  return (
    <div
      ref={ref}
      role="img"
      aria-label={`${cells.length} accepted LeetCode solutions: ${easy} easy, ${medium} medium, ${hard} hard`}
      className="grid gap-[2px]"
      style={{ gridTemplateColumns: "repeat(47, minmax(0, 1fr))" }}
    >
      {cells.map((difficulty, index) => (
        <span
          key={`${difficulty}-${index}`}
          aria-hidden="true"
          className={`aspect-square transition-[opacity,transform] duration-500 ease-out ${CELL_COLORS[difficulty]} ${
            visible ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
          style={{ transitionDelay: `${Math.min(index * 1.1, 450)}ms` }}
        />
      ))}
    </div>
  );
}
