import React from "react";
import "./Extras.css";

const Contact = () => {
  return (
    <div className="command-response contact-response">
      <p className="response-title">📬 Contacto</p>

      <div className="contact-card">
        <p className="contact-text">
          Puedes contactarme por cualquiera de los siguientes medios. Respondo
          rápido y con gusto coordino entrevistas o demos.
        </p>

        <div className="contact-list">
          <div className="contact-row">
            <span className="contact-icon">✉️</span>
            <a href="mailto:camiloacunacz@gmail.com" className="contact-link">
              camiloacunacz@gmail.com
            </a>
          </div>
          <div className="contact-row">
            <span className="contact-icon">📧</span>
            <a href="mailto:camiloacz@proton.me" className="contact-link">
              camiloacz@proton.me
            </a>
          </div>
          <div className="contact-row">
            <span className="contact-icon">📞</span>
            <a href="tel:+56964323777" className="contact-link">
              +56 9 6432 3777
            </a>
          </div>
        </div>

        <div className="contact-cta">
          <p className="contact-note">
            Si quieres, envíame un correo con tu disponibilidad y tema — con
            gusto coordinamos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
