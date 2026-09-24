"use client";

import Image from "next/image";
import { useState } from "react";

/** Simple screenshot carousel with prev/next controls and dot indicators. */
export function ImageCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);
  const current = images[index % images.length];
  if (!current) return null;

  const prev = () => {
    setIndex((i) => (i - 1 + images.length) % images.length);
  };
  const next = () => {
    setIndex((i) => (i + 1) % images.length);
  };

  return (
    <div className="mt-8">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
        {/* All images are mounted and loaded on page open; inactive ones are
            just faded out, so switching is instant with a smooth cross-fade. */}
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`${alt} — screenshot ${i + 1} of ${images.length}`}
            fill
            className={`object-cover transition-opacity duration-300 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            sizes="(max-width: 896px) 100vw, 896px"
            priority={i === 0}
          />
        ))}
        {images.length > 1 ? (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-3 py-2 text-white transition-colors hover:bg-black/70"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-3 py-2 text-white transition-colors hover:bg-black/70"
            >
              ›
            </button>
          </>
        ) : null}
      </div>
      {images.length > 1 ? (
        <div className="mt-3 flex justify-center gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => {
                setIndex(i);
              }}
              aria-label={`Go to image ${i + 1}`}
              aria-current={i === index}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === index
                  ? "bg-primary"
                  : "bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-600"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
