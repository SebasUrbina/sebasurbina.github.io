import { useEffect, useState } from "react";

type BootScreenProps = {
  lines: string[];
  skipLabel: string;
  onDone: () => void;
};

const LINE_DELAY = 140;
const EXIT_DELAY = 650;

export function BootScreen({ lines, skipLabel, onDone }: BootScreenProps) {
  const [visible, setVisible] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (visible < lines.length) {
      const timer = window.setTimeout(() => setVisible((count) => count + 1), LINE_DELAY);
      return () => window.clearTimeout(timer);
    }
    const leave = window.setTimeout(() => setLeaving(true), 350);
    const done = window.setTimeout(onDone, EXIT_DELAY);
    return () => {
      window.clearTimeout(leave);
      window.clearTimeout(done);
    };
  }, [visible, lines.length, onDone]);

  useEffect(() => {
    const skip = () => onDone();
    window.addEventListener("keydown", skip);
    return () => window.removeEventListener("keydown", skip);
  }, [onDone]);

  return (
    <div className={`boot ${leaving ? "leaving" : ""}`} onClick={onDone} role="presentation">
      <pre className="boot-logo" aria-hidden="true">{`  ___  ___ | |__   __ _
 / __|/ _ \\| '_ \\ / _\` |
 \\__ \\  __/| |_) | (_| |
 |___/\\___||_.__/ \\__,_|`}</pre>
      <div className="boot-log" aria-live="polite">
        {lines.slice(0, visible).map((line) => {
          const ok = line.startsWith("[  OK  ]");
          return (
            <p key={line}>
              {ok ? (
                <>
                  [<b>  OK  </b>]{line.slice(8)}
                </>
              ) : (
                line
              )}
            </p>
          );
        })}
        {visible >= lines.length && <span className="cursor" />}
      </div>
      <small className="boot-skip">{skipLabel}</small>
    </div>
  );
}
