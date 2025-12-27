import { useState, useEffect, useRef } from "react";
import "./WidgetStyles.css";

const WORK_SECONDS = 25 * 60;
const BREAK_SECONDS = 5 * 60;

const PomodoroTimer = () => {
  const [remaining, setRemaining] = useState<number>(WORK_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"work" | "break">("work");
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setRemaining((prev) => prev - 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  // Handle reaching zero
  useEffect(() => {
    if (remaining <= 0) {
      // stop and toggle mode
      setIsRunning(false);
      if (mode === "work") {
        setMode("break");
        setRemaining(BREAK_SECONDS);
        alert("¡Tiempo de descanso! 🎉");
      } else {
        setMode("work");
        setRemaining(WORK_SECONDS);
        alert("¡Vuelve al trabajo! 💪");
      }
    }
  }, [remaining, mode]);

  const reset = () => {
    setIsRunning(false);
    setRemaining(mode === "work" ? WORK_SECONDS : BREAK_SECONDS);
  };

  const formatTime = (total: number) => {
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const totalSeconds = mode === "work" ? WORK_SECONDS : BREAK_SECONDS;
  const progress = ((totalSeconds - remaining) / totalSeconds) * 100;

  return (
    <div className="widget-content">
      <h3 className="widget-title">⏱️ Pomodoro Timer</h3>

      <div className="pomodoro-display">
        <div className={`timer-circle ${mode}`}>
          <div className="timer-text">
            <div className="timer-mode">
              {mode === "work" ? "💼 Trabajo" : "☕ Descanso"}
            </div>
            <div className="timer-time">{formatTime(remaining)}</div>
          </div>
        </div>
      </div>

      <div className="pomodoro-controls">
        <button
          onClick={() => setIsRunning((prev) => !prev)}
          className={`timer-btn ${isRunning ? "pause" : "play"}`}
        >
          {isRunning ? "⏸️ Pausar" : "▶️ Iniciar"}
        </button>
        <button onClick={reset} className="timer-btn reset">
          🔄 Reiniciar
        </button>
      </div>

      <div className="pomodoro-presets">
        <button
          onClick={() => {
            setMode("work");
            setRemaining(WORK_SECONDS);
            setIsRunning(false);
          }}
          className={`preset-btn ${mode === "work" ? "active" : ""}`}
        >
          Trabajo (25 min)
        </button>
        <button
          onClick={() => {
            setMode("break");
            setRemaining(BREAK_SECONDS);
            setIsRunning(false);
          }}
          className={`preset-btn ${mode === "break" ? "active" : ""}`}
        >
          Descanso (5 min)
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
