"use client";
import { useState } from "react";
import clsx from "clsx";
import { useT, STR } from "@/lib/i18n";

type GalleryImage = {
  title: string;
  alt: string;
  src: string;
};

export function Gallery({ images }: { images: GalleryImage[] }) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <section className="px-14 py-8 border-y border-border bg-surface/50">
        <div className="text-center py-12">
          <p className="text-text-mute">Sin imágenes disponibles por ahora.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Gallery Grid */}
      <section className="px-14 py-10 border-b border-border">
        <div className="font-mono text-[12px] text-text-dim tracking-[0.12em] mb-5">
          GALERÍA
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIdx(idx)}
              className="relative aspect-video bg-bg border border-border hover:border-accent transition-colors overflow-hidden group cursor-pointer"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              <div className="absolute inset-0 flex items-end p-3 bg-gradient-to-t from-black/60 to-transparent">
                <span className="text-white text-[12px] font-medium">{img.title}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedIdx(null)}
        >
          <div className="max-w-4xl w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[selectedIdx].src}
              alt={images[selectedIdx].alt}
              className="w-full h-full object-contain"
            />
            <div className="text-center mt-3 text-text-mute text-[13px]">
              {images[selectedIdx].title}
            </div>
            <div className="text-center mt-2 text-text-dim text-[11px]">
              {selectedIdx + 1} / {images.length}
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-3 mt-4">
              <button
                type="button"
                onClick={() => setSelectedIdx(Math.max(0, selectedIdx - 1))}
                disabled={selectedIdx === 0}
                className="px-3 py-1 border border-border-hi text-text-mute disabled:opacity-50 hover:bg-surface/20 text-[12px]"
              >
                ← {selectedIdx > 0 ? "Anterior" : ""}
              </button>
              <button
                type="button"
                onClick={() => setSelectedIdx(null)}
                className="px-3 py-1 border border-border-hi text-text-mute hover:bg-surface/20 text-[12px]"
              >
                Cerrar
              </button>
              <button
                type="button"
                onClick={() => setSelectedIdx(Math.min(images.length - 1, selectedIdx + 1))}
                disabled={selectedIdx === images.length - 1}
                className="px-3 py-1 border border-border-hi text-text-mute disabled:opacity-50 hover:bg-surface/20 text-[12px]"
              >
                {selectedIdx < images.length - 1 ? "Siguiente" : ""} →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
