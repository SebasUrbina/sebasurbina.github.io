import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark";
  
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDarkMode ? "light" : "dark")}
      aria-label="Toggle theme"
      className="border-helix-cyan/30 bg-transparent hover:bg-helix-cyan/10 text-text-bright hover:text-helix-cyan"
    >
      {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
    </Button>
  );
}
