import React, { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/blog", label: "Blog" },
    { to: "/achievements", label: "Achievements" },
    { to: "/about", label: "About Me" },
  ];

  return (
    <nav
      className="fixed w-full top-0 z-50 theme-transition"
      style={{
        backgroundColor: "var(--color-card-bg)",
        boxShadow: "var(--color-card-shadow)",
      }}
    >
      <div className="container py-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-xl font-bold theme-transition"
            style={{ color: "var(--color-text-primary)" }}
          >
            SebasUrbina
          </Link>
          
          <div className="flex items-center">
            {/* Navegación para escritorio */}
            <div className="hidden md:flex space-x-6 mr-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="theme-transition"
                  style={{ color: "var(--color-text-primary)" }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.color = "var(--color-accent)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.color = "var(--color-text-primary)")
                  }
                >
                  {link.label}
                </Link>
              ))}
            </div>
            
            <ThemeToggle />
            
            {/* Botón de menú móvil */}
            <button
              className="ml-4 md:hidden p-2"
              onClick={toggleMenu}
              aria-label="Menú de navegación"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Menú móvil desplegable */}
        {isMenuOpen && (
          <div className="md:hidden py-4 theme-transition" style={{ backgroundColor: "var(--color-card-bg)" }}>
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="theme-transition px-4 py-2"
                  style={{ color: "var(--color-text-primary)" }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
