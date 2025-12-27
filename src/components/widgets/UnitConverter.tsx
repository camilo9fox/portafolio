import { useState } from "react";
import "./WidgetStyles.css";

type UnitType = "temperature" | "length" | "weight";

const UnitConverter = () => {
  const [unitType, setUnitType] = useState<UnitType>("temperature");
  const [fromValue, setFromValue] = useState("");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const units = {
    temperature: {
      units: ["Celsius", "Fahrenheit", "Kelvin"],
      convert: (value: number, from: string, to: string): number => {
        let celsius = value;
        if (from === "Fahrenheit") celsius = (value - 32) * (5 / 9);
        if (from === "Kelvin") celsius = value - 273.15;

        if (to === "Celsius") return celsius;
        if (to === "Fahrenheit") return celsius * (9 / 5) + 32;
        if (to === "Kelvin") return celsius + 273.15;
        return celsius;
      },
    },
    length: {
      units: ["Metros", "Kilómetros", "Pies", "Millas", "Pulgadas"],
      convert: (value: number, from: string, to: string): number => {
        const toMeters: Record<string, number> = {
          Metros: 1,
          Kilómetros: 1000,
          Pies: 0.3048,
          Millas: 1609.34,
          Pulgadas: 0.0254,
        };
        const meters = value * toMeters[from];
        return meters / toMeters[to];
      },
    },
    weight: {
      units: ["Kilogramos", "Gramos", "Libras", "Onzas"],
      convert: (value: number, from: string, to: string): number => {
        const toKg: Record<string, number> = {
          Kilogramos: 1,
          Gramos: 0.001,
          Libras: 0.453592,
          Onzas: 0.0283495,
        };
        const kg = value * toKg[from];
        return kg / toKg[to];
      },
    },
  };

  const handleConvert = () => {
    if (!fromValue || !fromUnit || !toUnit) return;
    const value = parseFloat(fromValue);
    if (isNaN(value)) return;

    const converted = units[unitType].convert(value, fromUnit, toUnit);
    setResult(converted);
  };

  const currentUnits = units[unitType];

  return (
    <div className="widget-content">
      <h3 className="widget-title">🔄 Conversor de Unidades</h3>

      <div className="converter-type-selector">
        {(["temperature", "length", "weight"] as UnitType[]).map((type) => (
          <button
            key={type}
            className={`type-btn ${unitType === type ? "active" : ""}`}
            onClick={() => {
              setUnitType(type);
              setFromUnit("");
              setToUnit("");
              setResult(null);
            }}
          >
            {type === "temperature" ? "🌡️ Temperatura" : type === "length" ? "📏 Longitud" : "⚖️ Peso"}
          </button>
        ))}
      </div>

      <div className="converter-inputs">
        <div className="input-group">
          <input
            type="number"
            value={fromValue}
            onChange={(e) => setFromValue(e.target.value)}
            placeholder="Valor"
            className="number-input"
          />
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="unit-select"
          >
            <option value="">Desde...</option>
            {currentUnits.units.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>

        <div className="arrow">→</div>

        <div className="input-group">
          <div className="result-display">
            {result !== null ? result.toFixed(4) : "---"}
          </div>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="unit-select"
          >
            <option value="">Hasta...</option>
            {currentUnits.units.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button onClick={handleConvert} className="convert-btn" disabled={!fromValue || !fromUnit || !toUnit}>
        🔄 Convertir
      </button>
    </div>
  );
};

export default UnitConverter;





