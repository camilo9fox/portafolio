import { useEffect, useRef } from "react";
import "./MatrixBackground.css";

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Configurar tamaño del canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Debounce resize para evitar recalculos excesivos
    let resizeTimeout: number | undefined;
    const handleResize = () => {
      if (resizeTimeout) window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        resizeCanvas();
        initDrops();
      }, 120);
    };

    resizeCanvas();
    window.addEventListener("resize", handleResize);

    // Caracteres para la animación matrix
    const chars =
      "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const charArray = chars.split("");

    // Configuración
    const fontSize = 14;
    let drops: number[] = [];

    const initDrops = () => {
      const columns = Math.floor(canvas.width / fontSize);
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
      }
    };

    initDrops();

    // Obtener tema actual
    const getTheme = () => {
      return document.body.getAttribute("data-theme") || "dark";
    };

    // Función de dibujo
    const draw = () => {
      const theme = getTheme();
      const isLight = theme === "light";

      // Fondo semi-transparente para efecto de rastro (muy sutil en tema claro para que destaquen los caracteres)
      ctx.fillStyle = isLight
        ? "rgba(255, 255, 255, 0.01)"
        : "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Color del texto según el tema (más intenso y brillante en tema claro)
      ctx.fillStyle = isLight ? "#0080ff" : "#00ff41";
      ctx.font = `bold ${fontSize}px monospace`;

      // Dibujar caracteres
      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Efecto de brillo en el primer carácter
        if (drops[i] > 0) {
          const theme = getTheme();
          const isLight = theme === "light";

          ctx.fillStyle = isLight ? "#0080ff" : "#00ff41";
          ctx.fillText(text, x, y);

          // Caracteres anteriores más tenues (mucho más visibles en tema claro)
          if (drops[i] > 1) {
            ctx.fillStyle = isLight
              ? "rgba(0, 128, 255, 0.7)"
              : "rgba(0, 255, 65, 0.3)";
            ctx.fillText(
              charArray[Math.floor(Math.random() * charArray.length)],
              x,
              (drops[i] - 1) * fontSize
            );
          }
          if (drops[i] > 2) {
            ctx.fillStyle = isLight
              ? "rgba(0, 128, 255, 0.5)"
              : "rgba(0, 255, 65, 0.15)";
            ctx.fillText(
              charArray[Math.floor(Math.random() * charArray.length)],
              x,
              (drops[i] - 2) * fontSize
            );
          }
        }

        // Resetear gota cuando llega al final
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Mover gota hacia abajo
        drops[i]++;
      }
    };

    // Animación usando requestAnimationFrame con intervalo cercano al original
    let rafId: number;
    const frameInterval = 35; // ms por frame (~28-30 FPS) — comportamiento original
    let lastTime = performance.now();
    const loop = (time: number) => {
      if (time - lastTime >= frameInterval) {
        draw();
        lastTime = time;
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      if (resizeTimeout) window.clearTimeout(resizeTimeout);
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-canvas" />;
};

export default MatrixBackground;
