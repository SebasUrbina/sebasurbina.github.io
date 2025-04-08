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
    icon: "aws",
    content: (
      <span>
        Implemented a serverless telegram bot using AWS Lambda and DynamoDB to
        record personal expenses.
      </span>
    ),
    link: {
      text: "source on Github",
      url: "https://github.com/SebasUrbina/expense-tracker-telegram-bot",
    },
  },
  {
    id: "2",
    year: 2024,
    icon: "code",
    content: (
      <span>
        Started leaning{" "}
        <Link
          to="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
          style={{ color: "var(--color-accent)" }}
        >
          JavaScript
        </Link>{" "}
        &{" "}
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
    id: "5",
    year: 2016,
    icon: "stats",
    content: <span>Started learning Python.</span>,
  },
  {
    id: "6",
    year: 2025,
    icon: "portfolio",
    content: (
      <span>
        Built my portfolio website with React, Typescript and Tailwind using
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
    id: "9",
    year: 2024,
    icon: "education",
    content: (
      <span>
        Got my Master's Degree in Data Science from Universidad de Chile.
      </span>
    ),
  },
  {
    id: "10",
    year: 2024,
    icon: "education",
    content: (
      <span>
        Got my Bachelor's Degree in Industrial Engineering from Universidad de
        Chile.
      </span>
    ),
  },
  {
    id: "11",
    year: 2024,
    icon: "coursera",
    content: (
      <span>
        Completed Meta's "Programming with JavaScript" course.{" "}
        <Link
          to="https://www.coursera.org/account/accomplishments/certificate/PLNJ1N2CBOC4"
          style={{ color: "var(--color-accent)" }}
        >
          (View Certificate)
        </Link>
      </span>
    ),
  },
  {
    id: "12",
    year: 2024,
    icon: "coursera",
    content: (
      <span>
        Completed Meta's "Introduction to Front-End Development" course.{" "}
        <Link
          to="https://www.coursera.org/account/accomplishments/certificate/HKXNGYUECTKW"
          style={{ color: "var(--color-accent)" }}
        >
          (View Certificate)
        </Link>
      </span>
    ),
  },
];
