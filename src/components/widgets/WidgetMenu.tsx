import { useState } from "react";
import PasswordGenerator from "./PasswordGenerator";
import UnitConverter from "./UnitConverter";
import PomodoroTimer from "./PomodoroTimer";
import ColorPalette from "./ColorPalette";
import QRCodeGenerator from "./QRCodeGenerator";
import MarkdownEditor from "./MarkdownEditor";
import DateCalculator from "./DateCalculator";
import BusinessDashboard from "./BusinessDashboard";
import FishingGame from "./FishingGame";
import "./WidgetMenu.css";

interface WidgetMenuProps {
  onClose?: () => void;
}

const WidgetMenu = ({ onClose }: WidgetMenuProps) => {
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);

  const widgets = [
    {
      id: "password",
      name: "🔐 Generador de Contraseñas",
      component: PasswordGenerator,
    },
    {
      id: "converter",
      name: "🔄 Conversor de Unidades",
      component: UnitConverter,
    },
    { id: "pomodoro", name: "⏱️ Pomodoro Timer", component: PomodoroTimer },
    { id: "colors", name: "🎨 Paleta de Colores", component: ColorPalette },
    { id: "qrcode", name: "📱 Generador de QR", component: QRCodeGenerator },
    { id: "markdown", name: "📝 Editor Markdown", component: MarkdownEditor },
    {
      id: "dates",
      name: "📅 Calculadora de Fechas",
      component: DateCalculator,
    },
    {
      id: "dashboard",
      name: "📈 Dashboard Empresarial",
      component: BusinessDashboard,
    },
    {
      id: "fishing",
      name: "🎣 ¿Quieres relajarte un rato?",
      component: FishingGame,
    },
  ];

  const WidgetComponent = selectedWidget
    ? widgets.find((w) => w.id === selectedWidget)?.component
    : null;

  if (selectedWidget && WidgetComponent) {
    return (
      <div className="widget-container">
        <button
          className="widget-back-btn"
          onClick={() => setSelectedWidget(null)}
        >
          ← Volver al menú
        </button>
        <WidgetComponent />
      </div>
    );
  }

  return (
    <div className="widget-menu">
      <div className="widget-menu-header">
        <h2>🚀 Demo de Componentes</h2>
        <p>Selecciona un componente para interactuar:</p>
      </div>
      <div className="widget-grid">
        {widgets.map((widget) => (
          <button
            key={widget.id}
            className="widget-card"
            onClick={() => setSelectedWidget(widget.id)}
          >
            <span className="widget-icon">{widget.name.split(" ")[0]}</span>
            <span className="widget-name">
              {widget.name.substring(widget.name.indexOf(" ") + 1)}
            </span>
          </button>
        ))}
      </div>
      <div className="widget-info">
        <p>
          💡 Estos componentes demuestran habilidades en React, TypeScript y UI
          moderna
        </p>
      </div>
    </div>
  );
};

export default WidgetMenu;
