import React from "react";
import { useTheme } from "../hooks/useTheme";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md"
      style={{
        backgroundColor: "var(--color-card-bg)",
        color: "var(--color-text-primary)",
        boxShadow: "var(--color-card-shadow)",
      }}
      aria-label={isDarkMode ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
    >
      {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
    </button>
  );
};

export default ThemeToggle;
