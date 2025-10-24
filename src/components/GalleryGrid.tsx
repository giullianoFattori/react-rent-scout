import { useState } from 'react';

import { Modal } from './Modal';

interface GalleryGridProps {
  images: string[];
}

export const GalleryGrid = ({ images }: GalleryGridProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images.length) {
    return null;
  }

  const displayImages = images.slice(0, 5);

  const openModalAt = (index: number) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 rounded-2xl overflow-hidden">
        <button
          type="button"
          onClick={() => openModalAt(0)}
          className="relative col-span-2 row-span-2 aspect-[4/3] md:aspect-auto overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600"
        >
          <img
            src={displayImages[0]}
            alt="Foto principal da acomodação"
            className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
          />
        </button>
        {displayImages.slice(1).map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => openModalAt(index + 1)}
            className="aspect-[4/3] overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600"
          >
            <img
              src={src}
              alt={`Foto ${index + 2} da acomodação`}
              className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
            />
          </button>
        ))}
        {displayImages.length < 5
          ? Array.from({ length: 5 - displayImages.length }).map((_, index) => (
              <div key={`placeholder-${index}`} className="hidden md:block aspect-[4/3] bg-slate-200/60" />
            ))
          : null}
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Galeria">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-xl">
            <img
              src={images[activeIndex]}
              alt={`Imagem ${activeIndex + 1} de ${images.length}`}
              className="w-full object-cover"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={goToPrevious}
              className="h-9 px-3 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600"
            >
              Anterior
            </button>
            <span className="text-sm text-slate-600">
              {activeIndex + 1} / {images.length}
            </span>
            <button
              type="button"
              onClick={goToNext}
              className="h-9 px-3 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600"
            >
              Próxima
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default GalleryGrid;
