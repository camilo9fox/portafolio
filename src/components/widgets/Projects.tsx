import React from "react";
import "./Extras.css";

const Projects = () => {
  return (
    <div className="command-response projects-response">
      <p className="response-title">🗂️ Proyectos</p>

      <div className="projects-list">
        <div className="project-item">
          <p className="project-header">
            <strong>SIM - Plataforma de Movilidad Interinstitucional</strong>
            <span className="project-role">Orbis Data (empleador)</span>
          </p>
          <p className="project-desc">
            Proyecto para la Pontificia Universidad Católica enfocado en
            centralizar la movilidad entre instituciones (intercambio de
            estudiantes, funcionarios y académicos) y gestión centralizada en
            una sola plataforma.
          </p>
          <ul className="project-points">
            <li>
              Rol: Fullstack — desarrollo de componentes frontend (Next.js)
            </li>
            <li>Backend: Consumo y co-desarrollo de microservicios con Nest</li>
            <li>Tareas: diseño de UI, integración con APIs, despliegues</li>
          </ul>
        </div>

        <div className="project-item">
          <p className="project-header">
            <strong>DGA — Gestión de Trámites y Recursos Hídricos</strong>
            <span className="project-role">Orbis Data (empleador)</span>
          </p>
          <p className="project-desc">
            Suite de aplicaciones para trámites asociados a bocatomas, acuíferos
            y otros recursos hídricos, incluyendo captura de coordenadas y
            gestión documental.
          </p>
          <ul className="project-points">
            <li>Frontend: React — componentes y lógica de interacción</li>
            <li>
              Funcionalidades: toma de coordenadas en mapa, gestión de
              documentos y flujos de trámites
            </li>
            <li>
              Integración con servicios de backend y APIs de geolocalización
            </li>
          </ul>
        </div>

        <div className="project-item">
          <p className="project-header">
            <strong>HVC Energías — Sitio Corporativo</strong>
            <span className="project-role">Freelance</span>
          </p>
          <p className="project-desc">
            Página web para empresa del rubro de energías renovables y
            construcción. Implementación centrada en core web (HTML, CSS,
            JavaScript) y optimización básica SEO/performance.
          </p>
          <ul className="project-points">
            <li>Responsivo y accesible, optimizado para SEO</li>
            <li>
              Implementación de secciones de servicios, contacto y portafolio
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Projects;
