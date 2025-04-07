import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar: React.FC = () => {
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
            <div className="space-x-6 mr-4">
              <Link
                to="/"
                className="theme-transition"
                style={{ color: "var(--color-text-primary)" }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.color = "var(--color-accent)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.color = "var(--color-text-primary)")
                }
              >
                Inicio
              </Link>
              <Link
                to="/blog"
                className="theme-transition"
                style={{ color: "var(--color-text-primary)" }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.color = "var(--color-accent)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.color = "var(--color-text-primary)")
                }
              >
                Blog
              </Link>
              <Link
                to="/achievements"
                className="theme-transition"
                style={{ color: "var(--color-text-primary)" }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.color = "var(--color-accent)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.color = "var(--color-text-primary)")
                }
              >
                Logros
              </Link>
              <Link
                to="/about"
                className="theme-transition"
                style={{ color: "var(--color-text-primary)" }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.color = "var(--color-accent)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.color = "var(--color-text-primary)")
                }
              >
                Sobre mí
              </Link>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
