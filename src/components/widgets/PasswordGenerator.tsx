import { useState, useCallback } from "react";
import "./WidgetStyles.css";

const PasswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    let charset = "";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!charset) {
      setPassword("Selecciona al menos una opción");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert("¡Contraseña copiada al portapapeles!");
  };

  return (
    <div className="widget-content">
      <h3 className="widget-title">🔐 Generador de Contraseñas</h3>
      
      <div className="password-display">
        <input
          type="text"
          value={password}
          readOnly
          className="password-input"
          placeholder="Tu contraseña aparecerá aquí"
        />
        <button onClick={copyToClipboard} className="copy-btn" disabled={!password}>
          📋 Copiar
        </button>
      </div>

      <div className="widget-controls">
        <div className="control-group">
          <label>
            Longitud: <strong>{length}</strong>
          </label>
          <input
            type="range"
            min="8"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="slider"
          />
        </div>

        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
            />
            Mayúsculas (A-Z)
          </label>
          <label>
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
            />
            Minúsculas (a-z)
          </label>
          <label>
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
            />
            Números (0-9)
          </label>
          <label>
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
            />
            Símbolos (!@#$...)
          </label>
        </div>

        <button onClick={generatePassword} className="generate-btn">
          ✨ Generar Contraseña
        </button>
      </div>
    </div>
  );
};

export default PasswordGenerator;





