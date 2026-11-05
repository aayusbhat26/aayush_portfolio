import Image from "next/image";

export default function CaseFigure({
  src,
  alt,
  caption,
  width,
  height,
  priority = false,
}: {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  priority?: boolean;
}) {
  return (
    <figure className="reveal">
      <div className="border border-[#111]/20 bg-[#ebebe5] p-1.5">
        <Image
          src={src}
          width={width}
          height={height}
          alt={alt}
          sizes="(min-width: 1024px) 760px, 100vw"
          className="h-auto w-full"
          priority={priority}
        />
      </div>
      <figcaption className="mt-2 flex flex-wrap justify-between gap-2 font-mono text-[8px] uppercase leading-relaxed tracking-[0.1em] text-[#111]/40">
        <span>{caption}</span>
        <span>Free-tier demo · first load may take a minute</span>
      </figcaption>
    </figure>
  );
}
