import { useRef } from "react";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";

import type { WindowId, WindowState } from "../hooks/useWindowManager";

type WindowLabels = { minimize: string; maximize: string; restore: string; close: string };

type WindowProps = {
  id: WindowId;
  title: string;
  className: string;
  state: WindowState;
  focused: boolean;
  labels: WindowLabels;
  onFocus: (id: WindowId) => void;
  onMinimize: (id: WindowId) => void;
  onMaximize: (id: WindowId) => void;
  onClose: (id: WindowId) => void;
  children: ReactNode;
};

const BAR_HEIGHT = 38;
const MIN_VISIBLE = 96;

export function Window(props: WindowProps) {
  return props.state.open ? <WindowFrame {...props} /> : null;
}

function WindowFrame({
  id,
  title,
  className,
  state,
  focused,
  labels,
  onFocus,
  onMinimize,
  onMaximize,
  onClose,
  children,
}: WindowProps) {
  const ref = useRef<HTMLElement>(null);
  const offset = useRef({ x: 0, y: 0 });
  const drag = useRef<{ startX: number; startY: number; originX: number; originY: number; rect: DOMRect } | null>(null);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || state.maximized || event.button !== 0) return;
    if ((event.target as HTMLElement).closest("button")) return;
    if (!window.matchMedia("(min-width: 901px)").matches) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = {
      startX: event.clientX,
      startY: event.clientY,
      originX: offset.current.x,
      originY: offset.current.y,
      rect: el.getBoundingClientRect(),
    };
    el.classList.add("dragging");
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = drag.current;
    const el = ref.current;
    if (!start || !el) return;
    const dx = event.clientX - start.startX;
    const dy = event.clientY - start.startY;
    const minDx = MIN_VISIBLE - start.rect.right;
    const maxDx = window.innerWidth - MIN_VISIBLE - start.rect.left;
    const minDy = BAR_HEIGHT + 4 - start.rect.top;
    const maxDy = window.innerHeight - 60 - start.rect.top;
    const x = start.originX + Math.min(Math.max(dx, minDx), maxDx);
    const y = start.originY + Math.min(Math.max(dy, minDy), maxDy);
    offset.current = { x, y };
    el.style.translate = `${x}px ${y}px`;
  };

  const endDrag = () => {
    drag.current = null;
    ref.current?.classList.remove("dragging");
  };

  const classes = [
    "window",
    className,
    focused ? "focused" : "",
    state.minimized ? "minimized" : "",
    state.maximized ? "maximized" : "",
  ].join(" ");

  return (
    <article
      ref={ref}
      id={id}
      className={classes}
      style={{ zIndex: state.z }}
      onPointerDownCapture={() => onFocus(id)}
      aria-label={title}
    >
      <div
        className="titlebar"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={(event) => {
          if (!(event.target as HTMLElement).closest("button")) onMaximize(id);
        }}
      >
        <div className="dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <span>{title}</span>
        <span className="window-actions">
          <button type="button" onClick={() => onMinimize(id)} aria-label={labels.minimize} title={labels.minimize}>
            −
          </button>
          <button
            type="button"
            onClick={() => onMaximize(id)}
            aria-label={state.maximized ? labels.restore : labels.maximize}
            title={state.maximized ? labels.restore : labels.maximize}
          >
            {state.maximized ? "❐" : "□"}
          </button>
          <button type="button" onClick={() => onClose(id)} aria-label={labels.close} title={labels.close}>
            ×
          </button>
        </span>
      </div>
      {children}
    </article>
  );
}
