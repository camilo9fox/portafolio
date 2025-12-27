import React from "react";
import "./Extras.css";

const Certifications = () => {
  const certs = [
    "Análisis y planificación de requerimientos informáticos - Duoc UC",
    "Análisis y desarrollo de modelos de datos - Duoc UC",
    "Programación de software - Duoc UC",
    "Inglés elemental - Duoc UC",
    "Calidad de software - Duoc UC",
    "Desarrollador de aplicaciones móviles - Duoc UC",
    "Desarrollador Cloud Native - Duoc UC",
    "Certificación FullStack - Duoc UC",
  ];

  return (
    <div className="command-response">
      <p className="response-title">🎓 Certificaciones</p>
      <div className="certs-list">
        {certs.map((c, i) => (
          <div key={i} className="cert-item">
            <span className="cert-icon">📜</span>
            <span className="cert-name">{c}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
