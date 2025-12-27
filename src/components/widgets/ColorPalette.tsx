import { useState } from "react";
import "./WidgetStyles.css";

const ColorPalette = () => {
  const [color, setColor] = useState("#528dff");
  const [palette, setPalette] = useState<string[]>([]);

  const generatePalette = () => {
    const baseColor = color.substring(1);
    const r = parseInt(baseColor.substring(0, 2), 16);
    const g = parseInt(baseColor.substring(2, 4), 16);
    const b = parseInt(baseColor.substring(4, 6), 16);

    const colors: string[] = [];

    // Generar variaciones
    for (let i = 0; i < 5; i++) {
      const factor = i * 0.2;
      const newR = Math.min(
        255,
        Math.max(0, Math.round(r + (255 - r) * factor))
      );
      const newG = Math.min(
        255,
        Math.max(0, Math.round(g + (255 - g) * factor))
      );
      const newB = Math.min(
        255,
        Math.max(0, Math.round(b + (255 - b) * factor))
      );

      colors.push(
        `#${newR.toString(16).padStart(2, "0")}${newG
          .toString(16)
          .padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`
      );
    }

    // Agregar color base
    colors.splice(2, 0, color);

    // Generar tonos más oscuros
    for (let i = 0; i < 3; i++) {
      const factor = (i + 1) * 0.3;
      const newR = Math.max(0, Math.round(r * (1 - factor)));
      const newG = Math.max(0, Math.round(g * (1 - factor)));
      const newB = Math.max(0, Math.round(b * (1 - factor)));

      colors.push(
        `#${newR.toString(16).padStart(2, "0")}${newG
          .toString(16)
          .padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`
      );
    }

    setPalette(colors);
  };

  const copyColor = (colorToCopy: string) => {
    navigator.clipboard.writeText(colorToCopy);
    alert(`Color ${colorToCopy} copiado!`);
  };

  return (
    <div className="widget-content">
      <h3 className="widget-title">🎨 Paleta de Colores</h3>

      <div className="color-picker-section">
        <label>Selecciona un color base:</label>
        <div className="color-picker-wrapper">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="color-picker"
          />
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="color-input"
            placeholder="#528dff"
          />
        </div>
        <button onClick={generatePalette} className="generate-palette-btn">
          ✨ Generar Paleta
        </button>
      </div>

      {palette.length > 0 && (
        <div className="palette-display">
          <h4>Tu paleta generada:</h4>
          <div className="palette-grid">
            {palette.map((paletteColor, index) => (
              <div
                key={index}
                className="palette-color"
                style={{ backgroundColor: paletteColor }}
                onClick={() => copyColor(paletteColor)}
              >
                <div className="color-info">
                  <span className="color-hex">{paletteColor}</span>
                  <span className="color-copy-hint">Click para copiar</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPalette;




