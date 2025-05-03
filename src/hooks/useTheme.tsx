import React, { createContext, useContext, useState, useEffect } from "react";
import { Theme, defaultTheme, darkTheme } from "../styles/theme";

type ThemeContextType = {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  const theme = isDarkMode ? darkTheme : defaultTheme;

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));

    // Actualizar CSS variables en :root
    const root = document.documentElement;

    // Colores principales
    root.style.setProperty("--color-primary", theme.colors.primary);
    root.style.setProperty("--color-secondary", theme.colors.secondary);
    root.style.setProperty("--color-accent", theme.colors.accent);
    root.style.setProperty("--color-background", theme.colors.background);

    // Colores de texto
    root.style.setProperty("--color-text-primary", theme.colors.text.primary);
    root.style.setProperty(
      "--color-text-secondary",
      theme.colors.text.secondary
    );
    root.style.setProperty("--color-text-muted", theme.colors.text.muted);

    // Fondos de tarjetas
    root.style.setProperty("--color-card-bg", theme.colors.card.background);
    root.style.setProperty("--color-card-shadow", theme.colors.card.shadow);
    root.style.setProperty(
      "--color-card-shadow-hover",
      theme.colors.card.shadowHover
    );

    // Tipografía
    root.style.setProperty("--font-family", theme.typography.fontFamily);

    // Aplicar clase al body
    document.body.className = isDarkMode ? "dark-theme" : "light-theme";
  }, [isDarkMode, theme]);

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default useTheme;
