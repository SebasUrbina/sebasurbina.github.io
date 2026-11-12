import { useCallback, useRef, useState } from "react";

export const windowIds = ["about", "channels", "agent", "projects", "stack", "career", "changelog", "blog"] as const;
export type WindowId = (typeof windowIds)[number];

export type WindowState = {
  open: boolean;
  minimized: boolean;
  maximized: boolean;
  z: number;
};

type Windows = Record<WindowId, WindowState>;

const initialWindows = () =>
  Object.fromEntries(
    windowIds.map((id, index) => [id, { open: true, minimized: false, maximized: false, z: index + 1 }]),
  ) as Windows;

export function useWindowManager() {
  const [windows, setWindows] = useState<Windows>(initialWindows);
  const [active, setActive] = useState<WindowId>("about");
  const topRef = useRef(windowIds.length);

  const update = useCallback((id: WindowId, patch: Partial<WindowState>) => {
    setWindows((current) => ({ ...current, [id]: { ...current[id], ...patch } }));
  }, []);

  const raise = useCallback((id: WindowId) => {
    setActive(id);
    setWindows((current) => {
      const win = current[id];
      const visible = win.open && !win.minimized;
      if (visible && win.z === topRef.current) return current;
      topRef.current += 1;
      return { ...current, [id]: { ...win, open: true, minimized: false, z: topRef.current } };
    });
  }, []);

  const minimize = useCallback((id: WindowId) => update(id, { minimized: true }), [update]);

  const close = useCallback(
    (id: WindowId) => update(id, { open: false, minimized: false, maximized: false }),
    [update],
  );

  const toggleMaximize = useCallback(
    (id: WindowId) => {
      raise(id);
      setWindows((current) => ({ ...current, [id]: { ...current[id], maximized: !current[id].maximized } }));
    },
    [raise],
  );

  return { windows, active, raise, minimize, close, toggleMaximize };
}
