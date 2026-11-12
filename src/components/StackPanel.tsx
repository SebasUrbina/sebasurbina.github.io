import { changelog, education, experience, personalInfo, projects, stackGroups } from "../data";
import { translations } from "../i18n";
import type { Language, Translation } from "../i18n";
import type { StackItem } from "../types";

type Source = { label: Record<Language, string>; tags: readonly string[] };

const sources: Source[] = [
  ...experience.map((item) => ({ label: { es: item.name, en: item.name }, tags: item.skills.split(" · ") })),
  ...projects.map((item) => ({ label: { es: item.name, en: item.name }, tags: item.stack })),
  ...education.map((item, index) => ({
    label: { es: translations.es.degrees[index], en: translations.en.degrees[index] },
    tags: item.skills.split(" · "),
  })),
  ...changelog.map((item) => ({ label: { es: "bitácora", en: "changelog" }, tags: item.tags })),
  { label: { es: "perfil", en: "profile" }, tags: personalInfo.stack.split(" · ") },
];

const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function usedIn(item: StackItem) {
  const patterns = (item.aliases ?? [item.name]).map((alias) => new RegExp(`\\b${escape(alias)}\\b`, "i"));
  const matches = sources.filter((source) => source.tags.some((tag) => patterns.some((pattern) => pattern.test(tag))));
  const seen = new Set<string>();
  return matches.filter((source) => {
    if (seen.has(source.label.en)) return false;
    seen.add(source.label.en);
    return true;
  });
}

const stackUsage = stackGroups.map((group) => ({
  ...group,
  items: group.items.map((item) => ({ ...item, sources: usedIn(item) })),
}));

const packageCount = stackGroups.reduce((total, group) => total + group.items.length, 0);

type StackPanelProps = { language: Language; t: Translation };

export function StackPanel({ language, t }: StackPanelProps) {
  return (
    <div className="stack-body">
      <div className="section-heading">
        <div>
          <span>{t.stack.eyebrow}</span>
          <h2>{t.stack.title}</h2>
        </div>
        <span className="count">
          {packageCount} {t.stack.packages}
        </span>
      </div>
      <p className="command">
        <b>❯</b> pacman -Qe <span className="muted">--group all</span>
      </p>
      <div className="stack-groups">
        {stackUsage.map((group) => (
          <section key={group.id} className="stack-group">
            <h3>
              :: {group.label} <small>({group.items.length})</small>
            </h3>
            {group.items.map((item) => (
              <div key={item.name} className="stack-row">
                <strong>{item.name}</strong>
                <span className="stack-dots" aria-label={`${item.level}/5`} title={`${item.level}/5`}>
                  {Array.from({ length: 5 }, (_, index) => (
                    <i key={index} className={index < item.level ? "on" : ""} />
                  ))}
                </span>
                <small>{item.sources.map((source) => source.label[language]).join(" · ") || "—"}</small>
              </div>
            ))}
          </section>
        ))}
      </div>
      <small className="stack-legend">{t.stack.legend}</small>
    </div>
  );
}
