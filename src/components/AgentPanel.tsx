import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";

import { knowledgeBase, runAgent } from "../agent";
import type { AgentResult, DocKind } from "../agent";
import type { Language, Translation } from "../i18n";

type Phase = "idle" | "router" | "retrieve" | "generate";

type Message =
  | { id: number; role: "user"; text: string }
  | { id: number; role: "agent"; result: AgentResult };

type AgentPanelProps = {
  language: Language;
  t: Translation;
};

const STEPS = ["router", "retrieve", "generate"] as const;
const CHARS_PER_TICK = 7;

export function AgentPanel({ language, t }: AgentPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [scheduledPhase, setPhase] = useState<Phase>("idle");
  const [typed, setTyped] = useState(Infinity);
  const [input, setInput] = useState("");
  const timers = useRef<number[]>([]);
  const logRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);

  useEffect(() => () => timers.current.forEach((timer) => window.clearTimeout(timer)), []);

  const sourceLabel = (kind: DocKind, title: string) => {
    const kindLabel = t.agent.kindLabel[kind];
    return kindLabel.toLowerCase() === title.toLowerCase() ? kindLabel : `${kindLabel} · ${title}`;
  };
  const demo = useMemo(() => runAgent(t.agent.demoQuestion, language), [t, language]);
  const last = messages.at(-1);
  const streamingLength = last?.role === "agent" ? last.result.answer.length : 0;
  const phase: Phase = scheduledPhase === "generate" && typed >= streamingLength ? "idle" : scheduledPhase;

  useEffect(() => {
    if (phase !== "generate") return;
    const timer = window.setTimeout(() => setTyped((count) => count + CHARS_PER_TICK), 12);
    return () => window.clearTimeout(timer);
  }, [phase, typed]);

  useEffect(() => {
    const log = logRef.current;
    if (log && messages.length) log.scrollTop = log.scrollHeight;
  }, [messages, typed]);

  const ask = (question: string) => {
    const query = question.trim();
    if (!query || phase !== "idle") return;
    setInput("");
    const result = runAgent(query, language);
    const userMessage: Message = { id: nextId.current++, role: "user", text: query };
    const agentMessage: Message = { id: nextId.current++, role: "agent", result };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMessages((current) => [...current, userMessage, agentMessage]);
      setTyped(Infinity);
      return;
    }
    setMessages((current) => [...current, userMessage]);
    setPhase("router");
    timers.current.push(
      window.setTimeout(() => setPhase("retrieve"), 380),
      window.setTimeout(() => {
        setMessages((current) => [...current, agentMessage]);
        setTyped(0);
        setPhase("generate");
      }, 900),
    );
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    ask(input);
  };

  const stepState = (step: (typeof STEPS)[number]) => {
    if (phase === "idle") return "done";
    const current = STEPS.indexOf(phase);
    const index = STEPS.indexOf(step);
    return index < current ? "done" : index === current ? "active" : "";
  };

  return (
    <div className="agent-body">
      <div className="section-heading">
        <div>
          <span>{t.agent.eyebrow}</span>
          <h2>{t.agent.title}</h2>
        </div>
        <span className="count">
          {knowledgeBase.length} {t.agent.docs}
        </span>
      </div>
      <ol className="agent-graph" aria-label="agent graph">
        <li className="done">query</li>
        {STEPS.map((step) => (
          <li key={step} className={stepState(step)}>
            {t.agent.steps[step]}
          </li>
        ))}
        <li className={phase === "idle" ? "done" : ""}>answer</li>
      </ol>
      <div className="agent-log" ref={logRef} aria-live="polite">
        {messages.length === 0 && (
          <>
            <p className="agent-msg user">
              <b>❯</b> {t.agent.demoQuestion}
            </p>
            <div className="agent-msg agent">
              <p>{demo.answer}</p>
              <div className="agent-sources">
                <small>route={demo.route} · {t.agent.sources}:</small>
                {demo.hits.map((hit) => (
                  <span key={hit.doc.id}>
                    {sourceLabel(hit.doc.kind, hit.doc.title[language])}
                    <i>{hit.score.toFixed(1)}</i>
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
        {messages.map((message, index) =>
          message.role === "user" ? (
            <p key={message.id} className="agent-msg user">
              <b>❯</b> {message.text}
            </p>
          ) : (
            <div key={message.id} className="agent-msg agent">
              <p>
                {index === messages.length - 1
                  ? message.result.answer.slice(0, typed)
                  : message.result.answer}
              </p>
              {message.result.hits.length > 0 && (index < messages.length - 1 || phase === "idle") && (
                <div className="agent-sources">
                  <small>
                    route={message.result.route} · {t.agent.sources}:
                  </small>
                  {message.result.hits.map((hit) => (
                    <span key={hit.doc.id}>
                      {sourceLabel(hit.doc.kind, hit.doc.title[language])}
                      <i>{hit.score.toFixed(1)}</i>
                    </span>
                  ))}
                </div>
              )}
            </div>
          ),
        )}
        {(phase === "router" || phase === "retrieve") && (
          <p className="agent-msg thinking">
            {phase === "router" ? "routing…" : `retrieving top-3 from ${knowledgeBase.length} docs…`}
          </p>
        )}
      </div>
      <div className="agent-suggestions">
        {t.agent.suggestions.map((suggestion) => (
          <button key={suggestion} type="button" onClick={() => ask(suggestion)} disabled={phase !== "idle"}>
            {suggestion}
          </button>
        ))}
      </div>
      <form className="agent-input" onSubmit={onSubmit}>
        <b>❯</b>
        <input
          id="agent-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={t.agent.placeholder}
          aria-label={t.agent.placeholder}
          autoComplete="off"
        />
        <button type="submit" disabled={phase !== "idle" || !input.trim()}>
          {t.agent.send} ↵
        </button>
      </form>
      <small className="agent-note">{t.agent.note}</small>
    </div>
  );
}
