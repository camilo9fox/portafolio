import { useState, useEffect, useRef, useLayoutEffect } from "react";
import "./terminal.css";
import WidgetMenu from "../widgets/WidgetMenu";
import Skills from "../widgets/Skills";
import Certifications from "../widgets/Certifications";
import Stack from "../widgets/Stack";
import Contact from "../widgets/Contact";
import Projects from "../widgets/Projects";

type Theme = "dark" | "light";

interface CommandOutput {
  type: "command" | "response" | "neofetch";
  content: string | React.ReactNode;
  timestamp?: number;
}

const Terminal = () => {
  const [showNeofetch, setShowNeofetch] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [theme, setTheme] = useState<Theme>("dark");
  const [commandHistory, setCommandHistory] = useState<CommandOutput[]>([]);
  const [showNeofetchInHistory, setShowNeofetchInHistory] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const terminalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Efecto de escritura para el neofetch
    const timer = setTimeout(() => {
      setShowNeofetch(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Efecto glitch aleatorio en el ASCII art
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 100);
    }, 5000);

    return () => clearInterval(glitchInterval);
  }, []);

  useEffect(() => {
    // Cargar tema desde localStorage al iniciar
    const savedTheme = localStorage.getItem("terminal-theme") as Theme;
    if (savedTheme && (savedTheme === "dark" || savedTheme === "light")) {
      setTheme(savedTheme);
      document.body.setAttribute("data-theme", savedTheme);
    } else {
      // Tema por defecto
      document.body.setAttribute("data-theme", "dark");
    }
  }, []);

  useEffect(() => {
    // Guardar tema en localStorage y aplicar al body
    localStorage.setItem("terminal-theme", theme);
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    // Auto-focus en el input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Reposicionar cursor directamente usando refs (evita desfases de estado)
  const repositionCursor = (value?: string, sel?: number) => {
    const input = inputRef.current;
    const measure = measureRef.current;
    const cursor = cursorRef.current;
    if (!input || !measure || !cursor) return;
    const val = value !== undefined ? value : input.value;
    const selection =
      sel !== undefined ? sel : input.selectionStart ?? val.length;
    // actualizar contenido de medida (hidden span)
    measure.textContent = val.substring(0, selection);
    const measureWidth = measure.offsetWidth;
    const scrollLeft = input.scrollLeft || 0;
    const left = Math.max(0, measureWidth - scrollLeft);
    cursor.style.left = `${left}px`;
    // mantener sincronizado el estado para que el JSX no sobrescriba el span oculto
    setCursorPosition(selection);
  };

  useLayoutEffect(() => {
    repositionCursor();
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    // reset history navigation when user types
    if (historyIndex !== null) setHistoryIndex(null);
    // actualizar y reposicionar inmediatamente usando el valor nuevo
    repositionCursor(e.target.value, e.target.selectionStart || 0);
  };

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    repositionCursor(undefined, input.selectionStart || 0);
  };

  const handleInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    repositionCursor(undefined, input.selectionStart || 0);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget;

    // Ejecutar comando con Enter
    if (e.key === "Enter") {
      e.preventDefault();
      const command = inputValue.trim();

      if (command) {
        executeCommand(command);
        // guardar en historial de inputs para navegación con flechas
        setInputHistory((prev) => [...prev, command]);
        setInputValue("");
        setCursorPosition(0);
      }
      return;
    }

    // Navegación por historial con flechas
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (inputHistory.length === 0) return;
      const nextIndex =
        historyIndex === null
          ? inputHistory.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputValue(inputHistory[nextIndex]);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (inputHistory.length === 0) return;
      if (historyIndex === null) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= inputHistory.length) {
        setHistoryIndex(null);
        setInputValue("");
      } else {
        setHistoryIndex(nextIndex);
        setInputValue(inputHistory[nextIndex]);
      }
      return;
    }

    // Usar setTimeout para que el cursor se actualice después de que el navegador procese la tecla
    repositionCursor(undefined, input.selectionStart || 0);
  };

  // Ajustar posición cuando el input hace scroll horizontal
  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    const onScroll = () => repositionCursor();
    input.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);
    return () => {
      input.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const executeCommand = (command: string) => {
    const lowerCommand = command.toLowerCase().trim();

    // Agregar el comando al historial
    setCommandHistory((prev) => [
      ...prev,
      {
        type: "command",
        content: `root@localhost:~$ ${command}`,
        timestamp: Date.now(),
      },
    ]);

    // Ocultar neofetch si aún está visible
    if (showNeofetchInHistory) {
      setShowNeofetchInHistory(false);
    }

    // Procesar comandos
    switch (lowerCommand) {
      case "clear":
        setCommandHistory([]);
        setShowNeofetchInHistory(true);
        break;
      case "experiencia":
      case "exp":
        addExperienceOutput();
        break;
      case "habilidades":
      case "skills":
        addSkillsOutput();
        break;
      case "certificaciones":
      case "certs":
        addCertificationsOutput();
        break;
      case "stack":
        addStackOutput();
        break;
      case "proyectos":
        addProjectsOutput();
        break;
      case "contacto":
      case "contact":
        addContactOutput();
        break;
      case "demo":
      case "showcase":
      case "widgets":
        addDemoOutput();
        break;
      case "help":
        addHelpOutput();
        break;
      default:
        addErrorOutput(command);
        break;
    }

    // Scroll al final
    setTimeout(() => {
      if (terminalContentRef.current) {
        terminalContentRef.current.scrollTop =
          terminalContentRef.current.scrollHeight;
      }
    }, 0);
  };

  const addExperienceOutput = () => {
    const experienceContent = (
      <div className="command-response">
        <p className="response-title">📋 Experiencia Profesional</p>

        <div className="experience-item">
          <p className="experience-header">
            <strong>Desarrollador Fullstack & Consultor - Orbis Data</strong>
            <span className="experience-period">3 años</span>
          </p>
          <p className="experience-company">Orbis Data</p>
          <ul className="experience-details">
            <li>
              Consultoría y desarrollo fullstack en proyectos empresariales
            </li>
            <li>Diseño e implementación de APIs y microservicios</li>
            <li>Participación en arquitecturas y despliegues cloud-native</li>
          </ul>
          <p className="experience-tech">
            <strong>Tecnologías principales:</strong> React, Next, Nest,
            Node.js, Express
          </p>
        </div>

        <div className="experience-item">
          <p className="experience-header">
            <strong>Práctica Profesional - Desarrollador Web</strong>
            <span className="experience-period">Práctica profesional</span>
          </p>
          <p className="experience-company">Proyectos académicos y freelance</p>
          <ul className="experience-details">
            <li>
              Desarrollo de sitios y aplicaciones web con PHP, HTML, CSS y
              JavaScript
            </li>
            <li>Implementación y mantenimiento de sitios en WordPress</li>
            <li>Integración de APIs y adaptaciones frontend responsivas</li>
          </ul>
          <p className="experience-tech">
            <strong>Tecnologías:</strong> PHP, HTML, CSS, JavaScript, WordPress
          </p>
        </div>
      </div>
    );

    setCommandHistory((prev) => [
      ...prev,
      { type: "response", content: experienceContent, timestamp: Date.now() },
    ]);
  };

  const addSkillsOutput = () => {
    const skillsContent = <Skills />;

    setCommandHistory((prev) => [
      ...prev,
      { type: "response", content: skillsContent, timestamp: Date.now() },
    ]);
  };

  const addCertificationsOutput = () => {
    const content = <Certifications />;
    setCommandHistory((prev) => [
      ...prev,
      { type: "response", content, timestamp: Date.now() },
    ]);
  };

  const addStackOutput = () => {
    const content = <Stack />;
    setCommandHistory((prev) => [
      ...prev,
      { type: "response", content, timestamp: Date.now() },
    ]);
  };

  const addContactOutput = () => {
    const content = <Contact />;
    setCommandHistory((prev) => [
      ...prev,
      { type: "response", content, timestamp: Date.now() },
    ]);
  };

  const addProjectsOutput = () => {
    const content = <Projects />;
    setCommandHistory((prev) => [
      ...prev,
      { type: "response", content, timestamp: Date.now() },
    ]);
  };

  const addPlaygroundOutput = () => {
    // legacy placeholder removed
  };

  const addDemoOutput = () => {
    const demoContent = <WidgetMenu />;

    setCommandHistory((prev) => [
      ...prev,
      { type: "response", content: demoContent, timestamp: Date.now() },
    ]);
  };

  const addHelpOutput = () => {
    const helpContent = (
      <div className="command-response">
        <p className="response-title">Comandos disponibles:</p>
        <ul className="help-list">
          <li>
            <code>experiencia</code> o <code>exp</code> - Muestra mi experiencia
            profesional
          </li>
          <li>
            <code>demo</code>, <code>showcase</code> o <code>widgets</code> -
            Componentes interactivos y modernos
          </li>
          <li>
            <code>proyectos</code> - Lista de proyectos realizados
          </li>
          <li>
            <code>habilidades</code> - Tecnologías y habilidades
          </li>
          <li>
            <code>certificaciones</code> - Certificados y cursos
          </li>
          <li>
            <code>stack</code> - Tech stack con niveles
          </li>
          <li>
            <code>contacto</code> - Información de contacto
          </li>
          <li>
            <code>clear</code> - Limpia la terminal
          </li>
          <li>
            <code>help</code> - Muestra esta ayuda
          </li>
        </ul>
      </div>
    );

    setCommandHistory((prev) => [
      ...prev,
      { type: "response", content: helpContent, timestamp: Date.now() },
    ]);
  };

  const addErrorOutput = (command: string) => {
    const errorContent = (
      <div className="command-response error">
        <p>
          Comando no encontrado: <code>{command}</code>
        </p>
        <p>
          Escribe <code>help</code> para ver los comandos disponibles.
        </p>
      </div>
    );

    setCommandHistory((prev) => [
      ...prev,
      { type: "response", content: errorContent, timestamp: Date.now() },
    ]);
  };
  //   const NeofetchOutput = () => {
  //     // prettier-ignore
  //     const asciiArt = `
  // ..............                                      CamiloAcuña@Portafolio
  //             ..,;:ccc,.                              -------------------------
  //           ......''';lxO.                            **Nombre:** Camilo Acuña
  // .....''''..........,:ld;                            **Profesión:** Desarrollador(a) Web | Full Stack
  //            .';;;:::;,,.x,                           **Ubicación:** Buin, Region Metropolitana
  //       ..'''.            0Xxoc:,.  ...               **Experiencia:** 3 Años como desarrollador web
  //   ....                ,ONkc;,;cokOdc',.             **Tecnologías:**
  //  .                   OMo           ':ddo.             - **Frontend:** React, Vue o Angular
  //                     dMc               :OO;            - **Backend:** Node.js, Python/Django o Java
  //                     0M.                 .:o.          - **Base de Datos:** PostgreSQL, MongoDB
  //                     ;Wd                              **Estado:** Buscando nuevas oportunidades
  //                      ;XO,                            **Contacto:**
  //                        ,d0Odlc;,..                    - **GitHub:** /tu-usuario
  //                            ..',;:cdOOd::,.            - **LinkedIn:** /tu-perfil
  //                                     .:d;.':;.         - **Email:** tu@email.com
  //                                        'd,  .'      **Comandos disponibles:**
  //                                          ;l   ..      - "proyectos"
  //                                           .o          - "habilidades"
  //                                             c         - "contacto"
  //                                             .'        - "clear"
  //                                              .
  //     `;
  //     return asciiArt;
  //   };

  const NeofetchOutput = () => {
    // prettier-ignore
    const asciiArt = `################%%@@@@@@@@@@@@*::::=-=+:-:=:--:=:==-:-=:::-=-:=-==--===--=-::-::*%%%
############%%%%@@@@@@@@@@@@@@@-:-:::-+-:---::=:+=::=:::::==:=-=-+=-=:::-=-:-=-=%%%%
%########%%%%%@@@@@@@@@@@@@@@@@@-:-:-==::+=::-:-=:::::+*+*--:--=======::-=--+-=+---=
@%%%@%@@@%%%@@@@@@@@@@@@@@%@@@@@@-:-:-:::+-:-::=::::+===--::::-======-:=:-++-=+-:=:=
@@@@@@@@%%%@@@@@@@@@@@@@@@@---:::---:-::=+-:-:::::=+===-:::::=======+:---:+-+-+-:-=%
@@@@@@@@@#**@%@@@@@@@@@@@@@@*:---=-:::-:-*=--=-::+===-:::::-*+-====+-=--:-=*+--=-=%%
@@@@@@@@@#**#%@@@@@@@@@@@@@@@%=:::=----::===-==:==#=-::::=*-::====+==-::-*--*+--#%%%
@@@@@@@@@@###%@@@@@@@@@@@@@@@@@%-:-:----=:=+===:+===-::-+::::-++=++=+=*==+=+=-=%@@@@
@@@@@@@@@@#%#%#%@@@@@@@@@@@@@@@@@%---+=+==--+==-++=::=-=:--+-:=+*#+=%*+#++--+++=++@%
@@@@@@@@@@#%%%*#@@@@@@@@@@@@@@@@@%%%#-==*+::--==***+=+##+*-=*#++++==+*#++*+==+-=%@@%
@@@@@@@@@%#%%%#%@@@@@%%%%%%%%%%#--====--+*=:-==++##*+=--=+==---=====***+++---=%@@@%@
@@@@@@@@@%%%%%*%@@%%%%%%%%%%%%%%%%*::::-:-#=::-#-=--:*:--:::=======#*==+--+%%%@@@@%@
@@@@@@@@@@%%%%#%@@#%%%%%%%%%%%%%%%%#+-+==-**-:::::::-*:=+=========+==++=-=*#%%%@@@%@
@@@@@@@@@@%##%#*%%*%%%%%%%%%%%%%%%##--+=-:-++::::::::-============%#++%%%%%%%%@@@@@@
@@@@@@@@@@%%*##**%##@@%%%%%%%%%%%##*--+*####*=::::::-::-=========***==#%%%%%%%%@@%@@
@@@@@@@@@@@%###**%%#@%%@%%%%%%%####+--**####*:--:::::-#%+=======*+===-=%%%%%%%%%%%@@
**%@@@@@@@@@%##*+#%#@@%@@@@@@##%%%*--+*#####*:=-+-::::--======*#+===---#%%%%%%%%%%@@
%*##%@@@@@@@%%#*+*%%@%#%@@@%%%@@%+--+#*#####*:--==+=:::-===*#**+=====--=*#%%%%%#+++#
@@##%*@@@@@@%%##**%%@@###@@@%%%@#=--=%**%#%%%::-:===+####*****+=======--+----%@@**%%
@@##%%%#@@@@@%%%##%%@@%##@@@@%#@#---+*=---=*-=:+::-===+++++=*-=+======-=##*===+@%#%%
@@@%%%#**@@%%@%%*%#%@@%#*@@@@@#@#+=-==+%#*::++:==::::-======:-+========*=====+@@@%%%
@@@@%#***#@%%%%#*%*#%%%#*#@@@@+-====*@@-:-***+:=+-:::-===*::-**+==========+**#@@@%%%
@@@%%%****@%%%%#*#**#%%%##=#+====+%@#+=---::=+:-=-::-==+-::-+#*++=======++***#@@%##%
@@@@@%****%@%%%#**+***=#+=#+====%@@++++**---+::===:-=+=-==::::::::-=========%@@@==*%
@@@@@@#***#@%%%%*=-==*#=+#*====#@%=::::::::-=+++=+==*-:::::::::-===========#@@@===+#`;
    return asciiArt;
  };
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <div
      className={`terminal ${theme === "light" ? "theme-light" : "theme-dark"}`}
    >
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        title="Cambiar tema"
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
      <div className="terminal-content" ref={terminalContentRef}>
        {showNeofetchInHistory && (
          <div className={`neofetch-output ${showNeofetch ? "visible" : ""}`}>
            <pre className={`neofetch-art ${glitchActive ? "glitch" : ""}`}>
              {NeofetchOutput()}
            </pre>
            <div className={`neofetch-info ${showNeofetch ? "visible" : ""}`}>
              <p className="neofetch-user">
                CamiloA<span className="at">@</span>Portafolio
              </p>
              <p className="separator-text">---------------------------</p>
              {/* Bloque de Información Principal */}
              <div className="info-block">
                <p>
                  <strong>Nombre:</strong> Camilo A.
                </p>
                <p>
                  <strong>Profesión:</strong> Desarrollador Web | FullStack
                </p>
                <p>
                  <strong>Ubicación:</strong> Region Metropolitana
                </p>
                <p>
                  <strong>Experiencia:</strong> 3 años como desarrollador web
                </p>
              </div>

              {/* Bloque de Tecnologías */}
              <div className="info-block">
                <p>
                  <strong>Tecnologías:</strong>
                </p>
                <ul>
                  <li>Frontend: React, Vue o Angular</li>
                  <li>Backend: Node.js, Python/Django o Java/Spring Boot</li>
                  <li>Base de Datos: MySQL, Oracle, PostgreSQL, MongoDB</li>
                </ul>
              </div>

              {/* Bloque de Contacto y Estado */}
              <div className="info-block">
                <p>
                  <strong>Estado:</strong> Buscando nuevas oportunidades
                </p>
                <p>
                  <strong>Contacto:</strong>
                </p>
                <ul>
                  <li>
                    <span className="contact-label">GitHub:</span> camilo9fox
                  </li>
                  <li>
                    <span className="contact-label">Email:</span>{" "}
                    camiloacz@proton.me
                  </li>
                </ul>
              </div>

              {/* Bloque de Comandos */}
              <div className="info-block">
                <p className="commands-title">
                  <strong>Comandos disponibles:</strong>
                </p>
                <ul className="commands-list">
                  <li>`experiencia` / `exp`</li>
                  <li>`proyectos`</li>
                  <li>`habilidades` / `skills`</li>
                  <li>`certificaciones` / `certs`</li>
                  <li>`stack`</li>
                  <li>`demo` / `showcase` / `widgets`</li>
                  <li>`contacto` / `contact`</li>
                  <li>`clear`</li>
                  <li>`help`</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Historial de comandos */}
        {commandHistory.map((item, index) => (
          <div key={index} className={`command-output ${item.type}`}>
            {typeof item.content === "string" ? (
              <p>{item.content}</p>
            ) : (
              item.content
            )}
          </div>
        ))}
      </div>
      <div className="command-line">
        <span className="command-line-text">root@localhost:~$</span>
        <div className="input-wrapper">
          <span ref={measureRef} className="input-measure">
            {inputValue.substring(0, cursorPosition)}
          </span>
          <input
            ref={inputRef}
            type="text"
            className="command-line-input"
            aria-label="Terminal input"
            value={inputValue}
            onChange={handleInputChange}
            onClick={handleInputClick}
            onKeyUp={handleInputKeyUp}
            onKeyDown={handleInputKeyDown}
            autoFocus
          />
          <span className="cursor-blink" ref={cursorRef}></span>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
