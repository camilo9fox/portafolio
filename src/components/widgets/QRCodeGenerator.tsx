import { useState, useEffect } from "react";
import "./WidgetStyles.css";

const QRCodeGenerator = () => {
  const [text, setText] = useState("");
  const [size, setSize] = useState(200);
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    if (text.trim()) {
      const encodedText = encodeURIComponent(text);
      setQrUrl(
        `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedText}`
      );
    } else {
      setQrUrl("");
    }
  }, [text, size]);

  const downloadQR = () => {
    if (qrUrl) {
      const link = document.createElement("a");
      link.href = qrUrl;
      link.download = "qrcode.png";
      link.click();
    }
  };

  const copyQRUrl = () => {
    if (qrUrl) {
      navigator.clipboard.writeText(qrUrl);
      alert("URL del QR copiada al portapapeles!");
    }
  };

  return (
    <div className="widget-content">
      <h3 className="widget-title">📱 Generador de QR Code</h3>

      <div className="qr-input-section">
        <label>Ingresa texto o URL:</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="https://ejemplo.com o cualquier texto..."
          className="qr-textarea"
          rows={4}
        />
      </div>

      <div className="qr-size-control">
        <label>
          Tamaño: <strong>{size}px</strong>
        </label>
        <input
          type="range"
          min="100"
          max="400"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="slider"
        />
      </div>

      {qrUrl && (
        <div className="qr-display-section">
          <div className="qr-preview">
            <img src={qrUrl} alt="QR Code" className="qr-image" />
          </div>
          <div className="qr-actions">
            <button onClick={downloadQR} className="qr-btn download">
              💾 Descargar QR
            </button>
            <button onClick={copyQRUrl} className="qr-btn copy">
              📋 Copiar URL
            </button>
          </div>
        </div>
      )}

      {!text.trim() && (
        <div className="qr-placeholder">
          <p>💡 Ingresa texto o URL para generar el código QR</p>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;




