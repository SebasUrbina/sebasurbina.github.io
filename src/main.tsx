import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import cloudflareScreenshot from "./content/posts/cloudflare-screenshot.png";
import {
  achievements,
  changelog,
  education,
  experience,
  personalInfo,
  posts,
  socialLinks,
} from "./data";
import type { Post } from "./types";
import { translations } from "./i18n";
import type { Language } from "./i18n";
import "./globals.css";

const cvUrl =
  "https://github.com/SebasUrbina/sebasurbina/raw/refs/heads/main/tech/genai/CV_Sebastian_Urbina_en.pdf";
const cvFilename = "CV_Sebastian_Urbina_en.pdf";

type PaletteCommand = {
  id: string;
  icon: string;
  label: string;
  meta: string;
  keywords: string;
  run: () => void;
};


function inline(text: string) {
  return text
    .replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      (_m, alt) => `<img src="${cloudflareScreenshot}" alt="${alt}" />`,
    )
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noreferrer">$1</a>',
    )
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

function Markdown({ source }: { source: string }) {
  const output: string[] = [];
  let code = false;
  let list = false;
  let table = false;
  for (const raw of source.split("\n")) {
    if (raw.startsWith("```")) {
      if (list) {
        output.push("</ul>");
        list = false;
      }
      output.push(code ? "</code></pre>" : "<pre><code>");
      code = !code;
      continue;
    }
    if (code) {
      output.push(
        raw.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") +
          "\n",
      );
      continue;
    }
    if (/^\|/.test(raw)) {
      if (!table) {
        output.push('<pre class="table">');
        table = true;
      }
      output.push(raw + "\n");
      continue;
    }
    if (table) {
      output.push("</pre>");
      table = false;
    }
    const item = raw.match(/^[-*] (.+)/);
    if (item) {
      if (!list) {
        output.push("<ul>");
        list = true;
      }
      output.push(`<li>${inline(item[1])}</li>`);
      continue;
    }
    if (list) {
      output.push("</ul>");
      list = false;
    }
    const heading = raw.match(/^(#{1,3}) (.+)/);
    if (heading) {
      const level = Math.min(heading[1].length + 1, 4);
      output.push(`<h${level}>${inline(heading[2])}</h${level}>`);
    } else if (raw.startsWith("> "))
      output.push(`<blockquote>${inline(raw.slice(2))}</blockquote>`);
    else if (raw === "---") output.push("<hr>");
    else if (raw.trim()) output.push(`<p>${inline(raw)}</p>`);
  }
  if (list) output.push("</ul>");
  if (table) output.push("</pre>");
  return (
    <div
      className="markdown"
      dangerouslySetInnerHTML={{ __html: output.join("") }}
    />
  );
}

function Home() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("portfolio-language");
    if (saved === "es" || saved === "en") return saved;
    return navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
  });
  const [time, setTime] = useState("");
  const [active, setActive] = useState("about");
  const [launcher, setLauncher] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedCommand, setSelectedCommand] = useState(0);
  const [post, setPost] = useState<Post | null>(null);
  const [careerOpen, setCareerOpen] = useState(false);
  const [changelogOpen, setChangelogOpen] = useState(false);
  const [cvDownload, setCvDownload] = useState<"idle" | "running" | "done">("idle");
  const t = translations[language];
  const localizedPosts = posts.map((item, index) => ({
    ...item,
    title: t.postText[index]?.[0] ?? item.title,
    excerpt: t.postText[index]?.[1] ?? item.excerpt,
  }));
  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat(t.locale, {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
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
    const close = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setLauncher((open) => !open);
        setQuery("");
        setSelectedCommand(0);
        return;
      }
      if (event.key === "Escape") {
        setPost(null);
        setCareerOpen(false);
        setChangelogOpen(false);
        setLauncher(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  const focus = (name: string) => {
    setActive(name);
    document
      .getElementById(name)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
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
  const closeLauncher = () => {
    setLauncher(false);
    setQuery("");
    setSelectedCommand(0);
  };
  const commands: PaletteCommand[] = [
    { id: "about", icon: ">_", label: t.palette.about, meta: t.nav.about, keywords: "about profile sobre mi perfil fastfetch", run: () => { focus("about"); closeLauncher(); } },
    { id: "blog", icon: "≡", label: t.palette.blog, meta: `${localizedPosts.length} posts`, keywords: "blog articles articulos writing escritura", run: () => { focus("blog"); closeLauncher(); } },
    { id: "career", icon: "▣", label: t.palette.career, meta: t.experience, keywords: `career carrera experience experiencia education educacion ${experience.map(item => `${item.name} ${item.role} ${item.skills}`).join(" ")}`, run: () => { setCareerOpen(true); closeLauncher(); } },
    { id: "changelog", icon: "↻", label: t.palette.changelog, meta: t.log.latest, keywords: `changelog bitacora log learning aprendizaje achievements logros resources recursos ${changelog.flatMap(item => [...item.tags, item.title.es, item.title.en]).join(" ")}`, run: () => { setChangelogOpen(true); closeLauncher(); } },
    { id: "cv", icon: "↓", label: t.palette.cv, meta: "PDF", keywords: "cv resume curriculum descargar download", run: () => { downloadCv(); closeLauncher(); focus("about"); } },
    ...localizedPosts.map((item, index) => ({ id: `post-${index}`, icon: "¶", label: item.title, meta: item.tag, keywords: `${item.title} ${item.tag} ${item.excerpt}`, run: () => { setPost(item); closeLauncher(); } })),
    { id: "github", icon: "GH", label: t.palette.github, meta: "social", keywords: "github code codigo repos repositories", run: () => { window.open(socialLinks[0].url, "_blank", "noopener,noreferrer"); closeLauncher(); } },
    { id: "linkedin", icon: "in", label: t.palette.linkedin, meta: "social", keywords: "linkedin work trabajo contact contacto", run: () => { window.open(socialLinks[1].url, "_blank", "noopener,noreferrer"); closeLauncher(); } },
    { id: "email", icon: "@", label: t.palette.email, meta: "email", keywords: "email mail correo contact contacto", run: () => { window.location.assign(socialLinks[2].url); closeLauncher(); } },
  ];
  const normalizedQuery = query.trim().toLocaleLowerCase(language);
  const filteredCommands = commands.filter((command) =>
    `${command.label} ${command.meta} ${command.keywords}`.toLocaleLowerCase(language).includes(normalizedQuery),
  ).slice(0, 8);
  const runCommand = (command: PaletteCommand | undefined) => command?.run();
  return (
    <main className="desktop">
      <header className="bar">
        <button className="brand" onClick={() => { setLauncher(!launcher); setQuery(""); setSelectedCommand(0); }}>
          <span className="brand-mark">◈</span> sebastián.urbina
        </button>
        <nav>
          {(["about", "blog", "career", "changelog"] as const).map((item, index) => (
            <button
              key={item}
              className={active === item ? "active" : ""}
              onClick={() => focus(item)}
            >
              <span>{index + 1}</span> {t.nav[item]}
            </button>
          ))}
        </nav>
        <div className="status">
          <span className="recording">●</span>
          <span className="status-word"> {t.available}</span>
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
        <div className="launcher launcher-shell">
          <div className="launcher-search">
            <span>⌕</span>
            <input
              autoFocus
              value={query}
              placeholder={t.launcher}
              aria-label={t.launcher}
              onChange={(event) => { setQuery(event.target.value); setSelectedCommand(0); }}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") { event.preventDefault(); setSelectedCommand((current) => Math.min(current + 1, filteredCommands.length - 1)); }
                if (event.key === "ArrowUp") { event.preventDefault(); setSelectedCommand((current) => Math.max(current - 1, 0)); }
                if (event.key === "Enter") { event.preventDefault(); runCommand(filteredCommands[selectedCommand]); }
              }}
            />
            <kbd>esc</kbd>
          </div>
          <div className="command-results" role="listbox">
            {filteredCommands.length ? filteredCommands.map((command, index) => (
              <button
                key={command.id}
                className={index === selectedCommand ? "selected" : ""}
                onMouseEnter={() => setSelectedCommand(index)}
                onClick={() => runCommand(command)}
                role="option"
                aria-selected={index === selectedCommand}
              >
                <i>{command.icon}</i><strong>{command.label}</strong><small>{command.meta}</small>
              </button>
            )) : <p>{t.palette.empty}</p>}
          </div>
          <div className="command-help"><span>↑↓ navigate</span><span>↵ select</span><b>{filteredCommands.length} {t.palette.actions}</b></div>
        </div>
      )}
      <section className="workspace">
        <article
          id="about"
          className={`window terminal ${active === "about" ? "focused" : ""}`}
          onClick={() => setActive("about")}
        >
          <div className="titlebar">
            <div className="dots">
              <i />
              <i />
              <i />
            </div>
            <span>seba@portfolio: ~</span>
            <span className="window-actions">− □ ×</span>
          </div>
          <div className="terminal-body">
            <p className="command">
              <b>❯</b> fastfetch <span className="muted">--me</span>
            </p>
            <div className="neo">
              <div className="portrait">
                <img
                  src="https://unavatar.io/github/sebasurbina"
                  alt="Sebastián Urbina"
                />
              </div>
              <dl>
                <div className="identity">
                  <dt>sebastián</dt>
                  <dd>@urbina</dd>
                </div>
                <div className="rule" />
                {(Object.entries(personalInfo) as [keyof typeof personalInfo, string][]).map(([label, value]) => (
                  <div key={label}>
                    <dt>{t.labels[label]}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
                <div className="swatches">
                  <dt>{t.labels.theme}</dt>
                  <dd>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <i key={n} />
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
            <p className="bio">
              {t.bio}
            </p>
            <button
              className="cv-button"
              type="button"
              onClick={downloadCv}
              disabled={cvDownload === "running"}
            >
              <span aria-hidden="true">↓</span> {t.downloadCv}
            </button>
            {cvDownload !== "idle" && (
              <div className="download-command" aria-live="polite">
                <p><b>❯</b> curl -L -o {cvFilename} {cvUrl}</p>
                <small>
                  {cvDownload === "running"
                    ? "[ transferring... ]"
                    : `[ saved: ${cvFilename} ]`}
                </small>
              </div>
            )}
            <p className="command bottom">
              <b>❯</b> <span className="cursor" />
            </p>
          </div>
        </article>
        <article
          id="blog"
          className={`window blog ${active === "blog" ? "focused" : ""}`}
          onClick={() => setActive("blog")}
        >
          <div className="titlebar">
            <div className="dots">
              <i />
              <i />
              <i />
            </div>
            <span>blog — ~/writing</span>
            <span className="window-actions">− □ ×</span>
          </div>
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
        </article>
        <article
          id="career"
          className={`window projects ${active === "career" ? "focused" : ""}`}
          onClick={() => setActive("career")}
        >
          <div className="titlebar">
            <div className="dots">
              <i />
              <i />
              <i />
            </div>
            <span>career — experience</span>
            <span className="window-actions">− □ ×</span>
          </div>
          <div className="projects-body">
            <aside>
              <b>{t.careerLabel}</b>
              <span className="selected">◇ {t.experience}</span>
              <span>⌂ {t.education}</span>
              <span>★ {t.achievements}</span>
            </aside>
            <div className="files">
              {experience.slice(0, 3).map((item, index) => (
                <button key={item.role} onClick={() => setCareerOpen(true)}>
                  <i className={item.color}>{item.icon}</i>
                  <span>
                    <strong>{item.role}</strong>
                    <small>
                      {item.name} · {t.periods[index]}
                    </small>
                  </span>
                  <b>›</b>
                </button>
              ))}
              <button className="view-all" onClick={() => setCareerOpen(true)}>
                {t.viewCareer} <span>→</span>
              </button>
            </div>
          </div>
        </article>
        <article
          id="changelog"
          className={`window changelog ${active === "changelog" ? "focused" : ""}`}
          onClick={() => setActive("changelog")}
        >
          <div className="titlebar">
            <div className="dots"><i /><i /><i /></div>
            <span>changelog — ~/learning</span>
            <span className="window-actions">− □ ×</span>
          </div>
          <div className="changelog-body">
            <div className="section-heading">
              <div><span>{t.log.eyebrow}</span><h2>{t.log.title}</h2></div>
              <span className="count">{changelog.length} {t.log.latest}</span>
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
            <button className="log-view-all" onClick={() => setChangelogOpen(true)}>{t.log.viewAll} <span>→</span></button>
          </div>
        </article>
      </section>
      <footer className="dock">
        {socialLinks.map((item) => (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            title={item.name}
          >
            {item.label}
          </a>
        ))}
      </footer>
      <div className="hint">
        <kbd>ESC</kbd>
        <span>{t.closeWindows}</span>
        <i />© {new Date().getFullYear()} Sebastián Urbina
      </div>
      {post && (
        <div
          className="overlay"
          onMouseDown={(event) =>
            event.target === event.currentTarget && setPost(null)
          }
        >
          <article className="reader window">
            <div className="titlebar">
              <div className="dots">
                <i />
                <i />
                <i />
              </div>
              <span>{post.title}</span>
              <button onClick={() => setPost(null)}>{t.close} ×</button>
            </div>
            <header>
              <span>
                {post.date} · {post.tag}
              </span>
              <p>{post.excerpt}</p>
              {language === "en" && <small>{t.articleLanguage}</small>}
            </header>
            <Markdown source={post.content} />
          </article>
        </div>
      )}
      {careerOpen && (
        <div
          className="overlay"
          onMouseDown={(event) =>
            event.target === event.currentTarget && setCareerOpen(false)
          }
        >
          <article className="reader window career-detail">
            <div className="titlebar">
              <div className="dots">
                <i />
                <i />
                <i />
              </div>
              <span>{t.careerLabel} — Sebastián Urbina</span>
              <button onClick={() => setCareerOpen(false)}>{t.close} ×</button>
            </div>
            <section>
              <p className="eyebrow">01 / {t.experience.toUpperCase()}</p>
              {experience.map((item, index) => (
                <div className="timeline" key={item.role}>
                  <i className={item.color}>{item.icon}</i>
                  <div>
                    <h3>{item.role}</h3>
                    <b>
                      {item.name} · {t.periods[index]}
                    </b>
                    <p>{item.skills}</p>
                  </div>
                </div>
              ))}
              <p className="eyebrow">02 / {t.education.toUpperCase()}</p>
              {education.map((item, index) => (
                <div className="timeline education" key={item.degree}>
                  <i>U</i>
                  <div>
                    <h3>{t.degrees[index]}</h3>
                    <b>Universidad de Chile · {item.period}</b>
                    <p>{item.skills}</p>
                  </div>
                </div>
              ))}
              <p className="eyebrow">03 / {t.achievements.toUpperCase()}</p>
              {achievements.map((item, index) => (
                <div className="achievement" key={item.text}>
                  <b>{item.year}</b>
                  <p>{t.achievementTexts[index]}</p>
                </div>
              ))}
            </section>
          </article>
        </div>
      )}
      {changelogOpen && (
        <div
          className="overlay"
          onMouseDown={(event) =>
            event.target === event.currentTarget && setChangelogOpen(false)
          }
        >
          <article className="reader window changelog-detail">
            <div className="titlebar">
              <div className="dots"><i /><i /><i /></div>
              <span>{t.log.window}</span>
              <button onClick={() => setChangelogOpen(false)}>{t.close} ×</button>
            </div>
            <section>
              <p className="eyebrow">{t.log.eyebrow}</p>
              <div className="log-timeline">
                {changelog.map((item) => (
                  <article className="log-entry" key={`${item.date}-${item.type}`}>
                    <div className="log-marker"><i /><time>{item.date}</time></div>
                    <div className="log-content">
                      <span className={`log-type ${item.type}`}>{t.log.types[item.type]}</span>
                      <h3>{item.title[language]}</h3>
                      <p>{item.description[language]}</p>
                      <div className="log-tags">
                        {"resources" in item
                          ? item.resources.map((resource) => (
                              <a key={resource.name} href={resource.url} target="_blank" rel="noreferrer">
                                {resource.name} ↗
                              </a>
                            ))
                          : item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                      </div>
                      {"link" in item && <a href={item.link.url} target="_blank" rel="noreferrer">{item.link.label} ↗</a>}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </article>
        </div>
      )}
    </main>
  );
}
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Home />
  </StrictMode>,
);
