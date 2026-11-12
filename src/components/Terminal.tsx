import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";

import { runAgent } from "../agent";
import { channels, experience, personalInfo, projects, socialLinks, stackGroups } from "../data";
import { features } from "../features";
import { translations } from "../i18n";
import type { Language, Translation } from "../i18n";
import { themes } from "../themes";
import type { ThemeId } from "../themes";

type TerminalProps = {
  language: Language;
  t: Translation;
  themeId: ThemeId;
  cvDownload: "idle" | "running" | "done";
  cvUrl: string;
  cvFilename: string;
  onTheme: (id: ThemeId) => void;
  onLanguage: (language: Language) => void;
  onDownloadCv: () => void;
  onOpenProject: (id: string) => void;
  onShowProjects: () => void;
  onReboot: () => void;
};

type Line = { id: number; command: string; output: ReactNode };

const COMMANDS = [
  "help", "whoami", "ls", "projects", "open", "stack", "career", "channels", "ask", "theme",
  "lang", "cv", "contact", "date", "history", "clear", "reboot", "sudo", "exit",
].filter((command) => features.agent || command !== "ask");

export function Terminal({
  language,
  t,
  themeId,
  cvDownload,
  cvUrl,
  cvFilename,
  onTheme,
  onLanguage,
  onDownloadCv,
  onOpenProject,
  onShowProjects,
  onReboot,
}: TerminalProps) {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(0);

  useEffect(() => {
    const body = bodyRef.current;
    if (body && lines.length) body.scrollTop = body.scrollHeight;
  }, [lines]);

  const execute = (raw: string): ReactNode => {
    const [name = "", ...args] = raw.trim().split(/\s+/);
    const arg = args.join(" ");
    switch (name.toLowerCase()) {
      case "help":
        return (
          <dl className="term-help">
            {Object.entries(t.terminal.help)
              .filter(([command]) => COMMANDS.includes(command))
              .map(([command, description]) => (
                <div key={command}>
                  <dt>{command}</dt>
                  <dd>{description}</dd>
                </div>
              ))}
          </dl>
        );
      case "whoami":
        return `sebastián urbina — ${personalInfo.role} · ${personalInfo.focus} · ${personalInfo.location}`;
      case "ls":
        return <span className="term-ls">projects/  posts/  career/  stack/  {cvFilename}</span>;
      case "projects":
        return (
          <dl className="term-help">
            {projects.map((project) => (
              <div key={project.id}>
                <dt>{project.id}</dt>
                <dd>{project.summary[language]}</dd>
              </div>
            ))}
          </dl>
        );
      case "open": {
        const query = arg.toLowerCase();
        const project = projects.find(
          (item) => query && (item.id === query || item.name.toLowerCase().startsWith(query)),
        );
        if (!project) return t.terminal.projectUnknown;
        onOpenProject(project.id);
        return `${t.terminal.opening} ${project.name}…`;
      }
      case "stack":
        return (
          <dl className="term-help">
            {stackGroups.map((group) => (
              <div key={group.id}>
                <dt>:: {group.label}</dt>
                <dd>{group.items.map((item) => item.name).join(", ")}</dd>
              </div>
            ))}
          </dl>
        );
      case "career":
        return (
          <dl className="term-help wide">
            {experience.map((item, index) => (
              <div key={item.role}>
                <dt>{t.periods[index]}</dt>
                <dd>
                  {item.role} @ {item.name}
                </dd>
              </div>
            ))}
          </dl>
        );
      case "channels":
        return (
          <dl className="term-help">
            {channels.map((channel) => (
              <div key={channel.handle}>
                <dt>
                  <a href={`https://www.youtube.com/@${channel.handle}`} target="_blank" rel="noreferrer">
                    @{channel.handle}
                  </a>
                </dt>
                <dd>{channel.topic[language]}</dd>
              </div>
            ))}
          </dl>
        );
      case "ask":
        if (!features.agent) return `zsh: ${t.terminal.notFound}: ${name} — ${t.terminal.suggestion}`;
        if (!arg) return t.terminal.help.ask;
        return <span className="term-pre">{runAgent(arg, language).answer}</span>;
      case "theme": {
        if (!arg) {
          return `${t.terminal.themes}: ${themes.map((theme) => (theme.id === themeId ? `[${theme.id}]` : theme.id)).join("  ")}`;
        }
        const query = arg.toLowerCase();
        const theme = themes.find((item) => item.id === query || item.name.toLowerCase() === query);
        if (!theme) return `${t.terminal.themeUnknown}: ${arg}`;
        onTheme(theme.id);
        return `${t.terminal.themeSet}: ${theme.name}`;
      }
      case "lang":
        if (arg === "es" || arg === "en") {
          onLanguage(arg);
          return translations[arg].terminal.langSet;
        }
        return t.terminal.help.lang;
      case "cv":
        onDownloadCv();
        return t.terminal.downloading;
      case "contact":
        return (
          <span className="term-links">
            {socialLinks.map((link) => (
              <a key={link.name} href={link.url} target="_blank" rel="noreferrer">
                {link.name} ↗
              </a>
            ))}
          </span>
        );
      case "date":
        return new Date().toLocaleString(t.locale);
      case "history":
        return history.length ? history.map((item, index) => `${index + 1}  ${item}`).join("\n") : "—";
      case "reboot":
        onReboot();
        return "rebooting…";
      case "sudo":
        return t.terminal.sudo;
      case "exit":
        return t.terminal.exit;
      default:
        return `zsh: ${t.terminal.notFound}: ${name} — ${t.terminal.suggestion}`;
    }
  };

  const submit = () => {
    const command = input.trim();
    setInput("");
    setCursor(-1);
    if (!command) return;
    setHistory((current) => [...current, command]);
    if (command.toLowerCase() === "clear") {
      setLines([]);
      return;
    }
    const output = execute(command);
    setLines((current) => [...current, { id: nextId.current++, command, output }]);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submit();
    } else if (event.key === "ArrowUp" && history.length) {
      event.preventDefault();
      const next = cursor === -1 ? history.length - 1 : Math.max(cursor - 1, 0);
      setCursor(next);
      setInput(history[next]);
    } else if (event.key === "ArrowDown" && cursor !== -1) {
      event.preventDefault();
      const next = cursor + 1;
      if (next >= history.length) {
        setCursor(-1);
        setInput("");
      } else {
        setCursor(next);
        setInput(history[next]);
      }
    } else if (event.key === "Tab") {
      event.preventDefault();
      const [first, ...rest] = input.split(" ");
      if (rest.length) {
        const options = first === "theme" ? themes.map((theme) => theme.id) : first === "open" ? projects.map((project) => project.id) : [];
        const match = options.find((option) => option.startsWith(rest.join(" ").toLowerCase()));
        if (match) setInput(`${first} ${match}`);
        return;
      }
      const match = COMMANDS.find((command) => command.startsWith(first.toLowerCase()));
      if (match) setInput(`${match} `);
    } else if (event.key === "l" && event.ctrlKey) {
      event.preventDefault();
      setLines([]);
    }
  };

  return (
    <div
      className="terminal-body"
      ref={bodyRef}
      onClick={(event) => {
        const target = event.target as HTMLElement;
        if (target.closest("button, a, input") || window.getSelection()?.toString()) return;
        inputRef.current?.focus({ preventScroll: true });
      }}
    >
      <header className="hero">
        <div className="hero-id">
          <img src="https://unavatar.io/github/sebasurbina" alt="Sebastián Urbina" />
          <div>
            <strong>Sebastián Urbina</strong>
            <span className="hero-eyebrow">{t.hero.eyebrow}</span>
          </div>
        </div>
        <h1>{t.hero.title}</h1>
        <p className="bio">{t.bio}</p>
        <div className="hero-actions">
          <a className="cv-button primary" href={socialLinks[2].url}>
            <span aria-hidden="true">@</span> {t.hero.contact}
          </a>
          <button className="cv-button" type="button" onClick={onShowProjects}>
            <span aria-hidden="true">▣</span> {t.hero.projects}
          </button>
          <button className="cv-button" type="button" onClick={onDownloadCv} disabled={cvDownload === "running"}>
            <span aria-hidden="true">↓</span> {t.downloadCv}
          </button>
        </div>
        {cvDownload !== "idle" && (
          <div className="download-command" aria-live="polite">
            <p>
              <b>❯</b> curl -L -o {cvFilename} {cvUrl}
            </p>
            <small>{cvDownload === "running" ? "[ transferring... ]" : `[ saved: ${cvFilename} ]`}</small>
          </div>
        )}
      </header>
      <p className="command">
        <b>❯</b> fastfetch <span className="muted">--me</span>
      </p>
      <div className="neo">
        <dl>
          <div className="identity">
            <dt>sebastián</dt>
            <dd>@urbina</dd>
          </div>
          <div className="rule" />
          {(Object.entries(personalInfo) as [keyof typeof personalInfo, string][]).map(([label, value]) => (
            <div key={label} className={label === "stack" ? "wide" : undefined}>
              <dt>{t.labels[label]}</dt>
              <dd>{value}</dd>
            </div>
          ))}
          {(Object.entries(t.profile) as [keyof typeof t.profile, string][]).map(([label, value]) => (
            <div key={label} className={label === "education" ? "wide" : undefined}>
              <dt>{t.labels[label]}</dt>
              <dd>{value}</dd>
            </div>
          ))}
          <div className="swatches">
            <dt>{t.labels.theme}</dt>
            <dd>
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  className={theme.id === themeId ? "active" : ""}
                  style={{ background: theme.swatch }}
                  title={theme.name}
                  aria-label={`Theme: ${theme.name}`}
                  aria-pressed={theme.id === themeId}
                  onClick={() => onTheme(theme.id)}
                />
              ))}
              <span>{themes.find((theme) => theme.id === themeId)?.name}</span>
            </dd>
          </div>
        </dl>
      </div>
      <p className="term-hint">
        # {t.terminal.hint} · <kbd>tab</kbd> <kbd>↑</kbd>
      </p>
      <div className="term-history" aria-live="polite">
        {lines.map((line) => (
          <div key={line.id} className="term-entry">
            <p className="command">
              <b>❯</b> {line.command}
            </p>
            <div className="term-output">{line.output}</div>
          </div>
        ))}
      </div>
      <label className="term-prompt">
        <b>❯</b>
        <input
          ref={inputRef}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={onKeyDown}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          aria-label={t.terminal.hint}
          placeholder="help"
        />
      </label>
    </div>
  );
}
