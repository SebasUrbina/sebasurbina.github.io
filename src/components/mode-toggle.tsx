import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark";
  return (
    <div>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(isDarkMode ? "light" : "dark")}
        aria-label="Toggle theme"
      >
        {isDarkMode ? <Moon /> : <Sun />}
      </Button>
    </div>
  );
}
