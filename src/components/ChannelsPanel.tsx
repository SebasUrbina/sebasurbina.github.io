import { channels } from "../data";
import type { Language, Translation } from "../i18n";

type ChannelsPanelProps = { language: Language; t: Translation };

export function ChannelsPanel({ language, t }: ChannelsPanelProps) {
  return (
    <div className="channels-body">
      <div className="section-heading">
        <div>
          <span>{t.channels.eyebrow}</span>
          <h2>{t.channels.title}</h2>
        </div>
        <span className="count">
          {channels.length} {t.channels.count}
        </span>
      </div>
      <p className="command">
        <b>❯</b> newsboat <span className="muted">--feeds youtube</span>
      </p>
      <ul className="channel-list">
        {channels.map((channel) => (
          <li key={channel.handle}>
            <a
              href={`https://www.youtube.com/@${channel.handle}`}
              target="_blank"
              rel="noreferrer"
              title={`${t.channels.watch}: ${channel.name}`}
            >
              <i className={channel.color} aria-hidden="true">
                {channel.initials}
              </i>
              <span>
                <strong>
                  {channel.name} <small>@{channel.handle}</small>
                </strong>
                <em>{channel.description[language]}</em>
                <small className={`channel-topic ${channel.color}`}>{channel.topic[language]}</small>
              </span>
              <b aria-hidden="true">↗</b>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
