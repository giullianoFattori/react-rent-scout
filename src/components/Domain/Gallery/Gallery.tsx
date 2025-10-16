import { useState } from 'react';
import { Modal } from 'flowbite-react';

import { Button, Stack, Text } from '../../Core';

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface GalleryProps {
  images: GalleryImage[];
  enableFullscreen?: boolean;
}

export const Gallery = ({ images, enableFullscreen = true }: GalleryProps) => {
  const [open, setOpen] = useState(false);

  const primary = images[0];
  const secondary = images.slice(1, 5);

  return (
    <div className="flex flex-col gap-sm">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-[2fr_1fr]">
        {primary && (
          <button
            type="button"
            onClick={() => enableFullscreen && setOpen(true)}
            className="group relative h-72 overflow-hidden rounded-xl focus-ring"
          >
            <img src={primary.src} alt={primary.alt} className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105" />
            {enableFullscreen && (
              <span className="absolute bottom-3 right-3 rounded-full bg-surface-base/90 px-3 py-1 text-sm font-medium text-text-primary shadow-sm">
                Ver todas as fotos
              </span>
            )}
          </button>
        )}
        <div className="hidden h-72 grid-cols-2 gap-2 md:grid">
          {secondary.map((image) => (
            <button
              key={image.src}
              type="button"
              onClick={() => enableFullscreen && setOpen(true)}
              className="group relative overflow-hidden rounded-xl focus-ring"
            >
              <img src={image.src} alt={image.alt} className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105" />
            </button>
          ))}
        </div>
      </div>
      {enableFullscreen && (
        <Modal show={open} onClose={() => setOpen(false)} size="5xl" position="center" aria-labelledby="gallery-modal-title">
          <Modal.Header>
            <Text as="span" id="gallery-modal-title" weight="semibold">
              Galeria de imagens
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Stack gap="sm">
              {images.map((image) => (
                <img key={image.src} src={image.src} alt={image.alt} className="w-full rounded-lg object-cover" />
              ))}
            </Stack>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};
