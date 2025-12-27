import React from "react";
import "./Extras.css";

type Tech = { name: string; icon: string; level: "Avanzado" | "Intermedio" };

const Stack = () => {
  const techs: Tech[] = [
    { name: "React", icon: "⚛️", level: "Avanzado" },
    { name: "TypeScript", icon: "🟦", level: "Avanzado" },

    { name: "Java", icon: "☕", level: "Intermedio" },
    { name: "JavaScript", icon: "🟨", level: "Intermedio" },
    { name: "Python", icon: "🐍", level: "Intermedio" },
    { name: "C#", icon: "♯", level: "Intermedio" },

    { name: "Vue", icon: "🟩", level: "Intermedio" },
    { name: "Angular", icon: "🅰️", level: "Intermedio" },
    { name: "Next", icon: "⏭️", level: "Intermedio" },

    { name: "Node.js", icon: "🟩", level: "Intermedio" },
    { name: "Express", icon: "🚂", level: "Intermedio" },
    { name: "Spring Boot", icon: "🌱", level: "Intermedio" },
    { name: "Nest", icon: "🛡️", level: "Intermedio" },

    { name: "Oracle", icon: "🟣", level: "Intermedio" },
    { name: "MySQL", icon: "🐬", level: "Intermedio" },
    { name: "MongoDB", icon: "🍃", level: "Intermedio" },

    { name: "AWS", icon: "☁️", level: "Intermedio" },
    { name: "Azure", icon: "🔷", level: "Intermedio" },
    { name: "Jenkins", icon: "🤖", level: "Intermedio" },
    { name: "Docker", icon: "🐳", level: "Intermedio" },
    { name: "GitHub Actions", icon: "⚙️", level: "Intermedio" },
    { name: "Git", icon: "🔧", level: "Intermedio" },
  ];

  return (
    <div className="command-response">
      <p className="response-title">🧩 Tech Stack</p>
      <div className="stack-grid">
        {techs.map((t) => (
          <div key={t.name} className="stack-item">
            <span className="stack-icon">{t.icon}</span>
            <div className="stack-info">
              <div className="stack-name">{t.name}</div>
              <div
                className={`stack-level ${
                  t.level === "Avanzado" ? "adv" : "mid"
                }`}
              >
                {t.level}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stack;
