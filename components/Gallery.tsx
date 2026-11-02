"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useT } from "@/lib/i18n";

type GalleryImage = {
  title: string;
  alt: string;
  src: string;
};

export function Gallery({ images }: { images: GalleryImage[] }) {
  const t = useT();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lastOpened = useRef<number | null>(null);

  const close = useCallback(() => setSelectedIdx(null), []);
  const prev = useCallback(() => setSelectedIdx((i) => (i === null ? i : Math.max(0, i - 1))), []);
  const next = useCallback(
    () => setSelectedIdx((i) => (i === null ? i : Math.min(images.length - 1, i + 1))),
    [images.length],
  );

  const isOpen = selectedIdx !== null;

  // While the lightbox is open: Esc closes, arrows navigate, the page behind
  // doesn't scroll, and focus sits on the close button. On close, focus goes
  // back to the thumbnail that opened it.
  useEffect(() => {
    if (!isOpen) return;
    const opener = lastOpened.current !== null ? thumbRefs.current[lastOpened.current] : null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      opener?.focus();
    };
  }, [isOpen, close, prev, next]);

  if (images.length === 0) {
    return (
      <section className="px-6 md:px-14 py-8 border-y border-border bg-surface/50">
        <div className="text-center py-12">
          <p className="text-text-mute">{t({ es: "Sin imágenes disponibles por ahora.", en: "No images available yet." })}</p>
        </div>
      </section>
    );
  }

  const current = selectedIdx !== null ? images[selectedIdx] : null;

  return (
    <>
      {/* Gallery Grid */}
      <section className="px-6 md:px-14 py-10 border-b border-border">
        <div className="font-mono text-[12px] text-text-dim tracking-[0.12em] mb-5">
          {t({ es: "GALERÍA", en: "GALLERY" })}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img, idx) => (
            <button
              key={idx}
              ref={(el) => { thumbRefs.current[idx] = el; }}
              type="button"
              onClick={() => { lastOpened.current = idx; setSelectedIdx(idx); }}
              aria-label={t({ es: `Ampliar: ${img.title}`, en: `Enlarge: ${img.title}` })}
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

      {/* Lightbox Modal — any click outside the image and the controls closes it */}
      {current && selectedIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          className="fixed inset-0 z-50 bg-black/95 flex flex-col"
          onClick={close}
        >
          {/* Top bar: always on screen, whatever the image size */}
          <div className="flex items-center justify-between gap-4 px-4 md:px-8 py-3 shrink-0">
            <div className="font-mono text-[12px] text-text-mute truncate">
              <span className="text-text-dim">{selectedIdx + 1} / {images.length}</span>
              <span className="mx-2 text-text-faint">·</span>
              {current.title}
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="shrink-0 inline-flex items-center gap-2 px-3 py-1.5 border border-border-hi bg-bg font-mono text-[12px] text-text hover:border-accent focus-visible:outline-1 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              ✕ {t({ es: "Cerrar", en: "Close" })}
              <kbd className="hidden md:inline text-[10px] text-text-dim border border-border px-1">Esc</kbd>
            </button>
          </div>

          {/* Image: capped to the space left, so it never pushes the controls off screen */}
          <div className="flex-1 min-h-0 flex items-center justify-center px-4 md:px-16">
            <img
              src={current.src}
              alt={current.alt}
              onClick={(e) => e.stopPropagation()}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {/* Navigation */}
          {images.length > 1 && (
            <div className="flex justify-center gap-3 py-4 shrink-0">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                disabled={selectedIdx === 0}
                className="px-3 py-1.5 border border-border-hi bg-bg font-mono text-[12px] text-text-mute hover:text-text disabled:opacity-40 disabled:hover:text-text-mute"
              >
                ← {t({ es: "Anterior", en: "Previous" })}
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); next(); }}
                disabled={selectedIdx === images.length - 1}
                className="px-3 py-1.5 border border-border-hi bg-bg font-mono text-[12px] text-text-mute hover:text-text disabled:opacity-40 disabled:hover:text-text-mute"
              >
                {t({ es: "Siguiente", en: "Next" })} →
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
