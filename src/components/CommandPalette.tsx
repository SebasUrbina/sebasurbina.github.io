import { useState } from "react";

import type { Language, Translation } from "../i18n";

export type PaletteCommand = {
  id: string;
  icon: string;
  label: string;
  meta: string;
  keywords: string;
  run: () => void;
};

type CommandPaletteProps = {
  commands: PaletteCommand[];
  language: Language;
  t: Translation;
  onClose: () => void;
};

export function CommandPalette({ commands, language, t, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const normalizedQuery = query.trim().toLocaleLowerCase(language);
  const filtered = commands
    .filter((command) =>
      `${command.label} ${command.meta} ${command.keywords}`.toLocaleLowerCase(language).includes(normalizedQuery),
    )
    .slice(0, 8);
  const run = (command: PaletteCommand | undefined) => {
    if (!command) return;
    command.run();
    onClose();
  };

  return (
    <div className="launcher launcher-shell">
      <div className="launcher-search">
        <span>⌕</span>
        <input
          autoFocus
          value={query}
          placeholder={t.launcher}
          aria-label={t.launcher}
          onChange={(event) => {
            setQuery(event.target.value);
            setSelected(0);
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setSelected((current) => Math.min(current + 1, filtered.length - 1));
            }
            if (event.key === "ArrowUp") {
              event.preventDefault();
              setSelected((current) => Math.max(current - 1, 0));
            }
            if (event.key === "Enter") {
              event.preventDefault();
              run(filtered[selected]);
            }
          }}
        />
        <kbd>esc</kbd>
      </div>
      <div className="command-results" role="listbox">
        {filtered.length ? (
          filtered.map((command, index) => (
            <button
              key={command.id}
              className={index === selected ? "selected" : ""}
              onMouseEnter={() => setSelected(index)}
              onClick={() => run(command)}
              role="option"
              aria-selected={index === selected}
            >
              <i>{command.icon}</i>
              <strong>{command.label}</strong>
              <small>{command.meta}</small>
            </button>
          ))
        ) : (
          <p>{t.palette.empty}</p>
        )}
      </div>
      <div className="command-help">
        <span>↑↓ {t.palette.navigate}</span>
        <span>↵ {t.palette.select}</span>
        <b>
          {filtered.length} {t.palette.actions}
        </b>
      </div>
    </div>
  );
}
