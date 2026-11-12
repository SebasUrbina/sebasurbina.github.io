import type { ReactNode } from "react";

import { achievements, changelog, education, experience } from "../data";
import type { Language, Translation } from "../i18n";
import type { Post } from "../types";
import { Markdown } from "./Markdown";

type OverlayProps = {
  title: string;
  className?: string;
  closeLabel: string;
  onClose: () => void;
  children: ReactNode;
};

function Overlay({ title, className = "", closeLabel, onClose, children }: OverlayProps) {
  return (
    <div className="overlay" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <article className={`reader window ${className}`} role="dialog" aria-label={title}>
        <div className="titlebar">
          <div className="dots">
            <i />
            <i />
            <i />
          </div>
          <span>{title}</span>
          <button onClick={onClose}>{closeLabel} ×</button>
        </div>
        {children}
      </article>
    </div>
  );
}

type BaseProps = { t: Translation; onClose: () => void };

export function PostReader({ post, language, t, onClose }: BaseProps & { post: Post; language: Language }) {
  return (
    <Overlay title={post.title} closeLabel={t.close} onClose={onClose}>
      <header>
        <span>
          {post.date} · {post.tag}
        </span>
        <p>{post.excerpt}</p>
        {language === "en" && <small>{t.articleLanguage}</small>}
      </header>
      <Markdown source={post.content} />
    </Overlay>
  );
}

export function CareerDetail({ t, onClose }: BaseProps) {
  return (
    <Overlay title={`${t.careerLabel} — Sebastián Urbina`} className="career-detail" closeLabel={t.close} onClose={onClose}>
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
    </Overlay>
  );
}

export function ChangelogDetail({ language, t, onClose }: BaseProps & { language: Language }) {
  return (
    <Overlay title={t.log.window} className="changelog-detail" closeLabel={t.close} onClose={onClose}>
      <section>
        <p className="eyebrow">{t.log.eyebrow}</p>
        <div className="log-timeline">
          {changelog.map((item) => (
            <article className="log-entry" key={`${item.date}-${item.type}`}>
              <div className="log-marker">
                <i />
                <time>{item.date}</time>
              </div>
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
                {"link" in item && (
                  <a href={item.link.url} target="_blank" rel="noreferrer">
                    {item.link.label} ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </Overlay>
  );
}
