import React from "react";
import "./Skills.css";

const section = (title: string, items: { name: string; icon: string }[]) => (
  <div className="skills-section">
    <p>
      <strong>{title}</strong>
    </p>
    <ul className="skills-list">
      {items.map((it) => (
        <li key={it.name} className="skill-item">
          <span className="skill-icon" aria-hidden>
            {it.icon}
          </span>
          <span className="skill-name">{it.name}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Skills = () => {
  const languages = [
    { name: "Java", icon: "☕" },
    { name: "JavaScript", icon: "🟨" },
    { name: "Python", icon: "🐍" },
    { name: "C#", icon: "♯" },
  ];

  const frontend = [
    { name: "React", icon: "⚛️" },
    { name: "Vue", icon: "🟩" },
    { name: "Angular", icon: "🅰️" },
    { name: "Next", icon: "⏭️" },
  ];

  const backend = [
    { name: "Node.js", icon: "🟩" },
    { name: "Express", icon: "🚂" },
    { name: "Spring Boot", icon: "🌱" },
    { name: "Nest", icon: "🛡️" },
  ];

  const databases = [
    { name: "Oracle", icon: "🟣" },
    { name: "MySQL", icon: "🐬" },
    { name: "MongoDB", icon: "🍃" },
  ];

  const cloud = [
    { name: "AWS", icon: "☁️" },
    { name: "Azure", icon: "🔷" },
    { name: "Jenkins", icon: "🤖" },
    { name: "Docker", icon: "🐳" },
    { name: "GitHub Actions", icon: "⚙️" },
    { name: "Git", icon: "🔧" },
  ];

  const extras = [
    { name: "REST APIs / GraphQL", icon: "🔗" },
    { name: "Testing (unit / integration)", icon: "🧪" },
    { name: "CI/CD & despliegue", icon: "🚀" },
  ];

  return (
    <div className="command-response skills-response">
      <p className="response-title">🧰 Habilidades y Conocimientos</p>
      <div className="skills-grid">
        {section("Lenguajes:", languages)}
        {section("Frontend (Frameworks / Bibliotecas):", frontend)}
        {section("Backend (Frameworks / Bibliotecas):", backend)}
        {section("Bases de datos:", databases)}
        {section("Cloud Native / DevOps:", cloud)}
        {section("Complementos:", extras)}
      </div>
    </div>
  );
};

export default Skills;
