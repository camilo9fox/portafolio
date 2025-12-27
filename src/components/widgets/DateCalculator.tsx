import { useState } from "react";
import "./WidgetStyles.css";

const DateCalculator = () => {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<string>("");

  const calculateDifference = () => {
    if (!date1 || !date2) {
      setResult("Por favor, selecciona ambas fechas");
      return;
    }

    const d1 = new Date(date1);
    const d2 = new Date(date2);

    if (d1 > d2) {
      setResult("La primera fecha debe ser anterior a la segunda");
      return;
    }

    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    const weeks = Math.floor(diffDays / 7);
    const remainingDays = diffDays % 7;

    setResult(
      `📅 Diferencia: ${diffDays} días\n` +
        `📆 ${diffYears} años, ${diffMonths % 12} meses\n` +
        `📊 ${weeks} semanas y ${remainingDays} días`
    );
  };

  const calculateAge = () => {
    if (!birthDate) {
      setResult("Por favor, selecciona tu fecha de nacimiento");
      return;
    }

    const birth = new Date(birthDate);
    const today = new Date();

    if (birth > today) {
      setResult("La fecha de nacimiento no puede ser futura");
      return;
    }

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor(
      (today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24)
    );
    const totalWeeks = Math.floor(totalDays / 7);

    setResult(
      `🎂 Edad: ${years} años, ${months} meses, ${days} días\n` +
        `📅 Total: ${totalDays} días vividos\n` +
        `📊 ${totalWeeks} semanas de vida`
    );
  };

  const addDays = () => {
    if (!date1) {
      setResult("Por favor, selecciona una fecha");
      return;
    }

    const input = prompt("¿Cuántos días quieres agregar?");
    if (!input) return;

    const days = parseInt(input);
    if (isNaN(days)) {
      setResult("Por favor, ingresa un número válido");
      return;
    }

    const date = new Date(date1);
    date.setDate(date.getDate() + days);

    setResult(
      `📅 Fecha original: ${new Date(date1).toLocaleDateString()}\n` +
        `➕ Agregando ${days} días\n` +
        `📆 Nueva fecha: ${date.toLocaleDateString()}\n` +
        `📅 ${date.toLocaleDateString("es-ES", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}`
    );
  };

  const getToday = () => {
    const today = new Date();
    setDate1(today.toISOString().split("T")[0]);
    setDate2(today.toISOString().split("T")[0]);
  };

  return (
    <div className="widget-content">
      <h3 className="widget-title">📅 Calculadora de Fechas</h3>

      <div className="date-calculator-section">
        <h4>📊 Calcular diferencia entre fechas</h4>
        <div className="date-inputs">
          <div className="date-input-group">
            <label>Fecha inicial:</label>
            <input
              type="date"
              value={date1}
              onChange={(e) => setDate1(e.target.value)}
              className="date-input"
            />
          </div>
          <div className="date-input-group">
            <label>Fecha final:</label>
            <input
              type="date"
              value={date2}
              onChange={(e) => setDate2(e.target.value)}
              className="date-input"
            />
          </div>
        </div>
        <button onClick={calculateDifference} className="date-btn">
          🔄 Calcular Diferencia
        </button>
        <button onClick={getToday} className="date-btn secondary">
          📅 Usar Hoy
        </button>
      </div>

      <div className="date-calculator-section">
        <h4>🎂 Calcular edad</h4>
        <div className="date-input-group">
          <label>Fecha de nacimiento:</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="date-input"
          />
        </div>
        <button onClick={calculateAge} className="date-btn">
          🎂 Calcular Edad
        </button>
      </div>

      <div className="date-calculator-section">
        <h4>➕ Agregar días a una fecha</h4>
        <div className="date-input-group">
          <label>Fecha base:</label>
          <input
            type="date"
            value={date1}
            onChange={(e) => setDate1(e.target.value)}
            className="date-input"
          />
        </div>
        <button onClick={addDays} className="date-btn">
          ➕ Agregar Días
        </button>
      </div>

      {result && (
        <div className="date-result">
          <h4>Resultado:</h4>
          <pre className="result-text">{result}</pre>
        </div>
      )}
    </div>
  );
};

export default DateCalculator;




