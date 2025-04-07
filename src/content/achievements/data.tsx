import React from "react";
import { Link } from "react-router-dom";
import { Achievement } from "../../types/Achievement";

/**
 * Datos estáticos de logros para el portafolio
 * Separados para facilitar el mantenimiento y la modificación
 * Usar React.ReactNode permite incluir componentes directamente en el contenido
 */
export const achievementsData: Achievement[] = [
  {
    id: "1",
    year: 2025,
    icon: "code",
    content: (
      <span>
        Learnt{" "}
        <Link
          to="https://www.typescriptlang.org/"
          style={{ color: "var(--color-accent)" }}
        >
          Typescript
        </Link>
      </span>
    ),
  },
  {
    id: "2",
    year: 2024,
    icon: "code",
    content: (
      <span>
        Learnt{" "}
        <Link
          to="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
          style={{ color: "var(--color-accent)" }}
        >
          JavaScript
        </Link>
      </span>
    ),
  },
  {
    id: "3",
    year: 2021,
    icon: "blog",
    content: <span>Published 3 posts on my portfolio website</span>,
    link: {
      text: "Blog",
      url: "/blog",
    },
  },
  {
    id: "4",
    year: 2021,
    icon: "github",
    content: (
      <span>Published or contributed to 20+ open-source repositories</span>
    ),
    link: {
      text: "20+ open-source repositories",
      url: "https://github.com/sebasurbina",
    },
  },
  {
    id: "5",
    year: 2016,
    icon: "stats",
    content: <span>Started learning Python</span>,
  },
  {
    id: "6",
    year: 2025,
    icon: "portfolio",
    content: (
      <span>
        Rebuilt my portfolio website with React, Typescript and Tailwind using
        Github Pages.
      </span>
    ),
    link: {
      text: "source on Github",
      url: "https://github.com/SebasUrbina/sebasurbina.github.io",
    },
  },
  // Ejemplo de logro para otro año
  {
    id: "7",
    year: 2023,
    icon: "code",
    content: <span>Learnt new technologies like Docker.</span>,
  },
  {
    id: "8",
    year: 2024,
    icon: "code",
    content: <span>Starting my journey as a developer.</span>,
  },
  {
    id: "8",
    year: 2024,
    icon: "education",
    content: (
      <span>
        Got my Master's Degree in Data Science from Universidad de Chile.
      </span>
    ),
  },
  {
    id: "9",
    year: 2024,
    icon: "education",
    content: (
      <span>
        Got my Bachelor's Degree in Industrial Engineering from Universidad de
        Chile.
      </span>
    ),
  },
];
