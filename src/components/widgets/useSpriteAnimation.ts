import { useEffect, useState } from "react";

interface UseSpriteAnimationProps {
  imageSrc: string;
  frameCount: number;
  fps?: number;
  loop?: boolean;
  onComplete?: () => void;
}

export const useSpriteAnimation = ({
  imageSrc,
  frameCount,
  fps = 60,
  loop = true,
  onComplete,
}: UseSpriteAnimationProps) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      setImageLoaded(true);
    };
    img.onerror = () => {
      console.error(`Failed to load sprite: ${imageSrc}`);
    };
  }, [imageSrc]);

  useEffect(() => {
    if (!imageLoaded) {
      setCurrentFrame(0);
      return;
    }

    const interval = 1000 / fps;
    let frame = 0;
    let timeoutId: NodeJS.Timeout;

    const animate = () => {
      setCurrentFrame(frame);
      frame++;

      if (frame >= frameCount) {
        if (loop) {
          frame = 0;
        } else {
          onComplete?.();
          return;
        }
      }

      timeoutId = setTimeout(animate, interval);
    };

    // Iniciar inmediatamente con el primer frame
    setCurrentFrame(0);
    timeoutId = setTimeout(animate, interval);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [imageLoaded, frameCount, fps, loop, onComplete]);

  // Calcular la posición del background correctamente
  // Para un spritesheet horizontal con N frames:
  // - background-size: N * 100% hace que la imagen ocupe N veces el ancho del contenedor
  // - Cada frame ocupa 1/N del ancho total de la imagen escalada
  // - background-position se mueve en incrementos de 100% / N para mostrar cada frame
  const frameWidthPercent = 100 / frameCount;
  const backgroundPosition = `${-currentFrame * frameWidthPercent}% 0`;

  return {
    currentFrame,
    backgroundPosition,
    imageLoaded,
    backgroundSize: `${frameCount * 100}% 100%`,
  };
};
