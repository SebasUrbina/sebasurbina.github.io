import { Fragment } from "react";

import { projects } from "../data";
import type { Language, Translation } from "../i18n";

type ProjectsPanelProps = {
  language: Language;
  t: Translation;
  selectedId: string;
  onSelect: (id: string) => void;
  onOpenPost: (index: number) => void;
};

export function ProjectsPanel({ language, t, selectedId, onSelect, onOpenPost }: ProjectsPanelProps) {
  const project = projects.find((item) => item.id === selectedId) ?? projects[0];

  return (
    <div className="projects-window-body">
      <aside className="project-tree">
        <b>~/builds</b>
        {projects.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.id === project.id ? "selected" : ""}
            onClick={() => onSelect(item.id)}
            aria-pressed={item.id === project.id}
          >
            <span>{item.id === project.id ? "▾" : "▸"}</span>
            {item.name}
            <small>{item.year}</small>
          </button>
        ))}
      </aside>
      <div className="project-detail" key={project.id}>
        <div className="section-heading">
          <div>
            <span>{t.projects.eyebrow}</span>
            <h2>{project.name}</h2>
          </div>
          <span className="count">{project.status[language]}</span>
        </div>
        <p className="project-summary">{project.summary[language]}</p>
        <p className="project-description">{project.description[language]}</p>
        <p className="project-label">{t.projects.architecture}</p>
        <div className="arch" role="img" aria-label={project.architecture.map((column) => column.map((node) => node.label).join(" + ")).join(" → ")}>
          {project.architecture.map((column, index) => (
            <Fragment key={column.map((node) => node.label).join()}>
              {index > 0 && (
                <div className="arch-link" style={{ animationDelay: `${index * 0.35}s` }}>
                  <i style={{ animationDelay: `${index * 0.35}s` }} />
                </div>
              )}
              <div className="arch-column">
                {column.map((node) => (
                  <div key={node.label} className={`arch-node ${node.kind}`}>
                    <strong>{node.label}</strong>
                    <small>{node.detail[language]}</small>
                  </div>
                ))}
              </div>
            </Fragment>
          ))}
        </div>
        <div className="project-footer">
          <div className="log-tags">
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="project-links">
            {project.links.map((link) => (
              <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                {link.label} ↗
              </a>
            ))}
            {project.post !== undefined && (
              <button type="button" onClick={() => onOpenPost(project.post!)}>
                {t.projects.readPost} ¶
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
