import { useCallback, useEffect, useState } from "react";

import { knowledgeBase } from "./agent";
import { AgentPanel } from "./components/AgentPanel";
import { BootScreen } from "./components/BootScreen";
import { ChannelsPanel } from "./components/ChannelsPanel";
import { CommandPalette } from "./components/CommandPalette";
import type { PaletteCommand } from "./components/CommandPalette";
import { CareerDetail, ChangelogDetail, PostReader } from "./components/Overlays";
import { ProjectsPanel } from "./components/ProjectsPanel";
import { StackPanel } from "./components/StackPanel";
import { Terminal } from "./components/Terminal";
import { Wallpaper } from "./components/Wallpaper";
import { Window } from "./components/Window";
import { channels, changelog, experience, posts, projects, socialLinks } from "./data";
import { features } from "./features";
import { useWindowManager, windowIds } from "./hooks/useWindowManager";
import type { WindowId } from "./hooks/useWindowManager";
import { translations } from "./i18n";
import type { Language } from "./i18n";
import { themes } from "./themes";
import type { ThemeId } from "./themes";
import type { Post } from "./types";

const cvUrl =
  "https://github.com/SebasUrbina/sebasurbina/raw/refs/heads/main/tech/genai/CV_Sebastian_Urbina_en.pdf";
const cvFilename = "CV_Sebastian_Urbina_en.pdf";
const BOOT_KEY = "portfolio-booted";

const dockIcons: Record<WindowId, string> = {
  about: ">_",
  channels: "▶",
  agent: "◆",
  projects: "▣",
  stack: "≣",
  blog: "¶",
  career: "◇",
  changelog: "↻",
};

const visibleWindowIds = windowIds.filter((id) => features.agent || id !== "agent");

function shouldBoot() {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    return !sessionStorage.getItem(BOOT_KEY);
  } catch {
    return false;
  }
}

export function App() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("portfolio-language");
    if (saved === "es" || saved === "en") return saved;
    return navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
  });
  const [themeId, setThemeId] = useState<ThemeId>(() => {
    const saved = localStorage.getItem("portfolio-theme");
    return themes.some((theme) => theme.id === saved) ? (saved as ThemeId) : "omarchy";
  });
  const [booting, setBooting] = useState(shouldBoot);
  const [time, setTime] = useState("");
  const [launcher, setLauncher] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const [careerOpen, setCareerOpen] = useState(false);
  const [changelogOpen, setChangelogOpen] = useState(false);
  const [cvDownload, setCvDownload] = useState<"idle" | "running" | "done">("idle");
  const [selectedProject, setSelectedProject] = useState(projects[0].id);
  const { windows, active, raise, minimize, close, toggleMaximize } = useWindowManager();
  const t = translations[language];
  const theme = themes.find((item) => item.id === themeId) ?? themes[0];
  const localizedPosts = posts.map((item, index) => ({
    ...item,
    title: t.postText[index]?.[0] ?? item.title,
    excerpt: t.postText[index]?.[1] ?? item.excerpt,
  }));

  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat(t.locale, { hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()),
      );
    update();
    const timer = setInterval(update, 30_000);
    return () => clearInterval(timer);
  }, [t.locale]);

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem("portfolio-language", language);
  }, [language]);

  useEffect(() => {
    for (const [property, value] of Object.entries(theme.colors)) {
      document.documentElement.style.setProperty(`--${property}`, value);
    }
    document.documentElement.dataset.theme = theme.id;
    localStorage.setItem("portfolio-theme", theme.id);
  }, [theme]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setLauncher((open) => !open);
        return;
      }
      if (event.key === "Escape") {
        setPost(null);
        setCareerOpen(false);
        setChangelogOpen(false);
        setLauncher(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const finishBoot = useCallback(() => {
    setBooting(false);
    try {
      sessionStorage.setItem(BOOT_KEY, "1");
    } catch {
      // Storage can be unavailable in private browsing.
    }
  }, []);

  const focusWindow = (id: WindowId) => {
    raise(id);
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 30);
  };

  const openProject = (id: string) => {
    setSelectedProject(id);
    focusWindow("projects");
  };

  const downloadCv = () => {
    if (cvDownload === "running") return;
    setCvDownload("running");
    window.setTimeout(() => {
      const link = document.createElement("a");
      link.href = cvUrl;
      link.download = cvFilename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setCvDownload("done");
    }, 700);
  };

  const onDockClick = (id: WindowId) => {
    const win = windows[id];
    if (win.open && !win.minimized && active === id) minimize(id);
    else focusWindow(id);
  };

  const bootLines = [
    "[    0.000000] Linux version 6.12-seba (sebastian@santiago) #1 SMP PREEMPT",
    "[  OK  ] Mounted /home/seba.",
    "[  OK  ] Started NetworkManager — Santiago, CL.",
    `[  OK  ] Loaded ${experience.length} experience records, ${projects.length} projects, ${posts.length} posts.`,
    `[  OK  ] Synced ${channels.length} YouTube feeds.`,
    ...(features.agent
      ? [
          `[  OK  ] Started rag-index.service — ${knowledgeBase.length} documents indexed.`,
          "[  OK  ] Started langgraph-agent.service — ask-seba is listening.",
        ]
      : []),
    `[  OK  ] Applied theme: ${theme.name}.`,
    "[  OK  ] Reached target portfolio.target.",
    "seba-portfolio login: seba (automatic login)",
  ];

  const commands: PaletteCommand[] = [
    { id: "about", icon: ">_", label: t.palette.about, meta: t.nav.about, keywords: "about profile sobre mi perfil fastfetch terminal", run: () => focusWindow("about") },
    { id: "channels", icon: "▶", label: t.palette.channels, meta: `${channels.length}`, keywords: `channels canales youtube ciencia science inspiracion ${channels.map((item) => item.name).join(" ")}`, run: () => focusWindow("channels") },
    ...(features.agent
      ? [
          {
            id: "agent",
            icon: "◆",
            label: t.palette.agent,
            meta: "rag",
            keywords: "agent agente ai ia rag langgraph chat ask preguntar",
            run: () => {
              focusWindow("agent");
              window.setTimeout(() => document.getElementById("agent-input")?.focus({ preventScroll: true }), 60);
            },
          },
        ]
      : []),
    { id: "projects", icon: "▣", label: t.palette.projects, meta: `${projects.length}`, keywords: `projects proyectos architecture arquitectura ${projects.map((item) => item.name).join(" ")}`, run: () => focusWindow("projects") },
    { id: "stack", icon: "≣", label: t.palette.stack, meta: "pacman", keywords: "stack tecnologias technologies tools herramientas skills", run: () => focusWindow("stack") },
    { id: "blog", icon: "¶", label: t.palette.blog, meta: `${localizedPosts.length} posts`, keywords: "blog articles articulos writing escritura", run: () => focusWindow("blog") },
    { id: "career", icon: "◇", label: t.palette.career, meta: t.experience, keywords: `career carrera experience experiencia education educacion ${experience.map((item) => `${item.name} ${item.role} ${item.skills}`).join(" ")}`, run: () => setCareerOpen(true) },
    { id: "changelog", icon: "↻", label: t.palette.changelog, meta: t.log.latest, keywords: `changelog bitacora log learning aprendizaje achievements logros resources recursos ${changelog.flatMap((item) => [...item.tags, item.title.es, item.title.en]).join(" ")}`, run: () => setChangelogOpen(true) },
    { id: "cv", icon: "↓", label: t.palette.cv, meta: "PDF", keywords: "cv resume curriculum descargar download", run: () => { downloadCv(); focusWindow("about"); } },
    ...projects.map((item) => ({ id: `project-${item.id}`, icon: "▸", label: item.name, meta: item.year, keywords: `${item.summary.es} ${item.summary.en} ${item.stack.join(" ")}`, run: () => openProject(item.id) })),
    ...localizedPosts.map((item, index) => ({ id: `post-${index}`, icon: "¶", label: item.title, meta: item.tag, keywords: `${item.title} ${item.tag} ${item.excerpt}`, run: () => setPost(item) })),
    { id: "github", icon: "GH", label: t.palette.github, meta: "social", keywords: "github code codigo repos repositories", run: () => window.open(socialLinks[0].url, "_blank", "noopener,noreferrer") },
    { id: "linkedin", icon: "in", label: t.palette.linkedin, meta: "social", keywords: "linkedin work trabajo contact contacto", run: () => window.open(socialLinks[1].url, "_blank", "noopener,noreferrer") },
    { id: "email", icon: "@", label: t.palette.email, meta: "email", keywords: "email mail correo contact contacto", run: () => window.location.assign(socialLinks[2].url) },
    { id: "reboot", icon: "⏻", label: t.palette.reboot, meta: "boot", keywords: "reboot reiniciar boot arranque restart", run: () => setBooting(true) },
  ];

  const windowProps = (id: WindowId) => ({
    id,
    state: windows[id],
    focused: active === id,
    labels: t.win,
    onFocus: raise,
    onMinimize: minimize,
    onMaximize: toggleMaximize,
    onClose: close,
  });

  return (
    <main className="desktop">
      <Wallpaper colors={theme.colors} />
      {booting && <BootScreen lines={bootLines} skipLabel={t.bootSkip} onDone={finishBoot} />}
      <header className="bar">
        <button className="brand" onClick={() => setLauncher(!launcher)}>
          <span className="brand-mark">◈</span> sebastián.urbina
        </button>
        <nav>
          {visibleWindowIds.map((id, index) => (
            <button key={id} className={active === id ? "active" : ""} onClick={() => focusWindow(id)}>
              <span>{index + 1}</span> {t.nav[id]}
            </button>
          ))}
        </nav>
        <div className="status">
          <a className="talk-link" href={socialLinks[2].url}>
            <span className="recording">●</span>
            <span className="status-word">{t.talk}</span>
          </a>
          <button
            className="language-toggle"
            onClick={() => setLanguage(language === "es" ? "en" : "es")}
            aria-label={language === "es" ? "Switch to English" : "Cambiar a español"}
          >
            {language.toUpperCase()}
          </button>
          <span>CL</span>
          <span className="wifi">⌑</span>
          <strong>{time || "21:42"}</strong>
        </div>
      </header>
      {launcher && (
        <CommandPalette commands={commands} language={language} t={t} onClose={() => setLauncher(false)} />
      )}
      <section className={`workspace ${features.agent ? "with-agent" : ""}`}>
        <Window {...windowProps("about")} title="seba@portfolio: ~" className="terminal">
          <Terminal
            language={language}
            t={t}
            themeId={themeId}
            cvDownload={cvDownload}
            cvUrl={cvUrl}
            cvFilename={cvFilename}
            onTheme={setThemeId}
            onLanguage={setLanguage}
            onDownloadCv={downloadCv}
            onOpenProject={openProject}
            onShowProjects={() => focusWindow("projects")}
            onReboot={() => setBooting(true)}
          />
        </Window>
        <Window {...windowProps("channels")} title={t.channels.window} className="channels">
          <ChannelsPanel language={language} t={t} />
        </Window>
        {features.agent && (
          <Window {...windowProps("agent")} title={t.agent.window} className="agent">
            <AgentPanel language={language} t={t} />
          </Window>
        )}
        <Window {...windowProps("projects")} title={t.projects.window} className="projects-window">
          <ProjectsPanel
            language={language}
            t={t}
            selectedId={selectedProject}
            onSelect={setSelectedProject}
            onOpenPost={(index) => setPost(localizedPosts[index])}
          />
        </Window>
        <Window {...windowProps("stack")} title={t.stack.window} className="stack">
          <StackPanel language={language} t={t} />
        </Window>
        <Window {...windowProps("career")} title="career — experience" className="career">
          <div className="career-body">
            <div className="section-heading">
              <div>
                <span>{t.careerLabel.toUpperCase()}</span>
                <h2>{t.careerProgress}</h2>
              </div>
            </div>
            <ol className="career-steps">
              {experience.map((item, index) => (
                <li key={item.role} className={index === 0 ? "current" : ""}>
                  <i className={item.color} />
                  <button type="button" onClick={() => setCareerOpen(true)}>
                    <strong>{item.role}</strong>
                    <small>
                      {item.name} · {t.periods[index]}
                    </small>
                  </button>
                  {index === 0 ? (
                    <em>{t.current}</em>
                  ) : experience[index + 1]?.name === item.name ? (
                    <em className="promo">↑ {t.promoted}</em>
                  ) : null}
                </li>
              ))}
            </ol>
            <button className="log-view-all" onClick={() => setCareerOpen(true)}>
              {t.viewCareer} <span>→</span>
            </button>
          </div>
        </Window>
        <Window {...windowProps("changelog")} title="changelog — ~/learning" className="changelog">
          <div className="changelog-body">
            <div className="section-heading">
              <div>
                <span>{t.log.eyebrow}</span>
                <h2>{t.log.title}</h2>
              </div>
              <span className="count">
                {changelog.length} {t.log.latest}
              </span>
            </div>
            <div className="log-preview">
              {changelog.map((item) => (
                <button key={`${item.date}-${item.type}`} onClick={() => setChangelogOpen(true)}>
                  <time>{item.date}</time>
                  <i>{t.log.types[item.type]}</i>
                  <strong>{item.title[language]}</strong>
                  <span>{item.tags.slice(0, 3).join(" · ")}</span>
                </button>
              ))}
            </div>
            <button className="log-view-all" onClick={() => setChangelogOpen(true)}>
              {t.log.viewAll} <span>→</span>
            </button>
          </div>
        </Window>
        <Window {...windowProps("blog")} title="blog — ~/writing" className="blog">
          <div className="blog-body">
            <div className="section-heading">
              <div>
                <span>{t.writing}</span>
                <h2>{t.writingTitle}</h2>
              </div>
              <span className="count">{localizedPosts.length} posts</span>
            </div>
            <div className="post-list">
              {localizedPosts.map((item) => (
                <button onClick={() => setPost(item)} key={item.title}>
                  <time>{item.date}</time>
                  <strong>{item.title}</strong>
                  <span>{item.tag} ↗</span>
                </button>
              ))}
            </div>
          </div>
        </Window>
      </section>
      <footer className="dock">
        {visibleWindowIds.map((id) => {
          const win = windows[id];
          const running = win.open;
          const visible = running && !win.minimized;
          return (
            <button
              key={id}
              type="button"
              className={`dock-app ${running ? "running" : ""} ${visible && active === id ? "current" : ""}`}
              onClick={() => onDockClick(id)}
              title={t.nav[id]}
              aria-label={t.nav[id]}
            >
              {dockIcons[id]}
            </button>
          );
        })}
        <span />
        {socialLinks.map((item) => (
          <a key={item.name} href={item.url} target="_blank" rel="noreferrer" title={item.name}>
            {item.label}
          </a>
        ))}
      </footer>
      <div className="hint">
        <kbd>ctrl k</kbd>
        <span>launcher</span>
        <kbd>ESC</kbd>
        <span>{t.closeWindows}</span>
        <span className="drag-hint">· {t.dragHint}</span>
        <i />© {new Date().getFullYear()} Sebastián Urbina
      </div>
      {post && <PostReader post={post} language={language} t={t} onClose={() => setPost(null)} />}
      {careerOpen && <CareerDetail t={t} onClose={() => setCareerOpen(false)} />}
      {changelogOpen && <ChangelogDetail language={language} t={t} onClose={() => setChangelogOpen(false)} />}
    </main>
  );
}
