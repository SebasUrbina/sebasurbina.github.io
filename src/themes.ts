export const themes = [
  { id: "omarchy", name: "Omarchy", swatch: "#c9ef78", colors: { bg: "#090b0e", panel: "#101318", panel2: "#15191f", line: "#292e37", text: "#e7e5df", muted: "#858b94", lime: "#c9ef78", pink: "#e889bb", blue: "#73b9d5", gold: "#e5b96e", desktop: "#08090c" } },
  { id: "catppuccin", name: "Catppuccin", swatch: "#cba6f7", colors: { bg: "#11111b", panel: "#181825", panel2: "#1e1e2e", line: "#313244", text: "#cdd6f4", muted: "#7f849c", lime: "#a6e3a1", pink: "#f5c2e7", blue: "#89b4fa", gold: "#f9e2af", desktop: "#11111b" } },
  { id: "tokyo-night", name: "Tokyo Night", swatch: "#7aa2f7", colors: { bg: "#16161e", panel: "#1a1b26", panel2: "#24283b", line: "#3b4261", text: "#c0caf5", muted: "#737aa2", lime: "#9ece6a", pink: "#bb9af7", blue: "#7aa2f7", gold: "#e0af68", desktop: "#16161e" } },
  { id: "nord", name: "Nord", swatch: "#88c0d0", colors: { bg: "#242933", panel: "#2e3440", panel2: "#3b4252", line: "#4c566a", text: "#eceff4", muted: "#9098a7", lime: "#a3be8c", pink: "#b48ead", blue: "#88c0d0", gold: "#ebcb8b", desktop: "#242933" } },
  { id: "gruvbox", name: "Gruvbox", swatch: "#d79921", colors: { bg: "#1d2021", panel: "#282828", panel2: "#32302f", line: "#504945", text: "#ebdbb2", muted: "#928374", lime: "#b8bb26", pink: "#d3869b", blue: "#83a598", gold: "#fabd2f", desktop: "#1d2021" } },
  { id: "rose-pine", name: "Rosé Pine", swatch: "#ebbcba", colors: { bg: "#191724", panel: "#1f1d2e", panel2: "#26233a", line: "#403d52", text: "#e0def4", muted: "#908caa", lime: "#9ccfd8", pink: "#ebbcba", blue: "#31748f", gold: "#f6c177", desktop: "#191724" } },
  { id: "dracula", name: "Dracula", swatch: "#bd93f9", colors: { bg: "#191a21", panel: "#282a36", panel2: "#30323f", line: "#44475a", text: "#f8f8f2", muted: "#9093a8", lime: "#50fa7b", pink: "#ff79c6", blue: "#8be9fd", gold: "#f1fa8c", desktop: "#191a21" } },
  { id: "monochrome", name: "Monochrome", swatch: "#d6d6d6", colors: { bg: "#090909", panel: "#111111", panel2: "#191919", line: "#333333", text: "#ededed", muted: "#888888", lime: "#d6d6d6", pink: "#a8a8a8", blue: "#c2c2c2", gold: "#b5b5b5", desktop: "#090909" } },
] as const;

export type ThemeId = (typeof themes)[number]["id"];
