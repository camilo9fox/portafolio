import { useState } from "react";
import "./WidgetStyles.css";

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState(`# Bienvenido al Editor Markdown

## Características

- **Texto en negrita**
- *Texto en cursiva*
- [Enlaces](https://ejemplo.com)
- \`Código inline\`

### Lista de tareas

- [x] Tarea completada
- [ ] Tarea pendiente

### Código

\`\`\`javascript
function saludar() {
  console.log("¡Hola mundo!");
}
\`\`\`

> Esta es una cita

---

**¡Edita el texto para ver el preview en tiempo real!**`);

  const parseMarkdown = (text: string): string => {
    let html = text;

    // Headers
    html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
    html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
    html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>");

    // Italic
    html = html.replace(/\*(.*?)\*/gim, "<em>$1</em>");

    // Links
    html = html.replace(
      /\[([^\]]+)\]\(([^)]+)\)/gim,
      '<a href="$2" target="_blank">$1</a>'
    );

    // Code blocks
    html = html.replace(
      /```(\w+)?\n([\s\S]*?)```/gim,
      "<pre><code>$2</code></pre>"
    );

    // Inline code
    html = html.replace(/`([^`]+)`/gim, "<code>$1</code>");

    // Lists
    html = html.replace(/^- \[x\] (.*$)/gim, '<li class="checked">$1</li>');
    html = html.replace(/^- \[ \] (.*$)/gim, "<li>$1</li>");
    html = html.replace(/^- (.*$)/gim, "<li>$1</li>");

    // Blockquote
    html = html.replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>");

    // Horizontal rule
    html = html.replace(/^---$/gim, "<hr>");

    // Line breaks
    html = html.replace(/\n/gim, "<br>");

    // Wrap lists
    html = html.replace(/(<li>.*<\/li>)/gim, "<ul>$1</ul>");

    return html;
  };

  const copyMarkdown = () => {
    navigator.clipboard.writeText(markdown);
    alert("Markdown copiado al portapapeles!");
  };

  const clearEditor = () => {
    if (window.confirm("¿Estás seguro de limpiar el editor?")) {
      setMarkdown("");
    }
  };

  return (
    <div className="widget-content">
      <h3 className="widget-title">📝 Editor Markdown</h3>

      <div className="markdown-actions">
        <button onClick={copyMarkdown} className="markdown-btn">
          📋 Copiar Markdown
        </button>
        <button onClick={clearEditor} className="markdown-btn secondary">
          🗑️ Limpiar
        </button>
      </div>

      <div className="markdown-container">
        <div className="markdown-editor-section">
          <label>Editor:</label>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="markdown-textarea"
            placeholder="Escribe tu markdown aquí..."
            spellCheck={false}
          />
        </div>

        <div className="markdown-preview-section">
          <label>Preview:</label>
          <div
            className="markdown-preview"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(markdown) }}
          />
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;
