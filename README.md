# Portfolio — Sebastián Urbina

Sitio web personal de Sebastián Urbina, Machine Learning Engineer enfocado en inteligencia artificial generativa, ciencia de datos y desarrollo de software.

El portfolio utiliza una interfaz inspirada en un escritorio Linux y una terminal. Reúne mi perfil profesional, experiencia, educación, logros, artículos y enlaces de contacto en una aplicación web rápida y responsive.

**Sitio:** [sebasurbina.github.io](https://sebasurbina.github.io/)

## Características

- Interfaz tipo escritorio y terminal, construida con CSS propio.
- Perfil profesional presentado mediante una vista inspirada en `fastfetch`.
- Trayectoria laboral, educación y logros en una ventana interactiva.
- Blog integrado con artículos escritos en Markdown.
- Command palette para navegar y ejecutar acciones rápidamente.
- Descarga del CV con una animación de comando `curl` en el terminal.
- Detección automática del idioma del navegador en español e inglés.
- Selector manual de idioma con preferencia persistida en `localStorage`.
- Enlaces directos a GitHub, LinkedIn y correo electrónico.
- Diseño adaptable para escritorio y dispositivos móviles.
- Despliegue automático en GitHub Pages mediante GitHub Actions.

## Command palette

El lanzador se abre haciendo clic en la marca superior o mediante:

```text
Ctrl + K       Windows / Linux
Command + K    macOS
```

Permite buscar artículos, experiencia, tecnologías y empresas, además de abrir redes sociales o descargar el CV. Se puede navegar con las flechas, ejecutar una acción con `Enter` y cerrar con `Esc`.

## Stack

- **React 19** para construir la interfaz y gestionar las interacciones.
- **TypeScript 6** para tipado estático y validación durante el build.
- **Vite 8** como servidor de desarrollo y herramienta de compilación.
- **CSS nativo** para el sistema visual, animaciones y diseño responsive.
- **pnpm 10** para instalación y administración reproducible de dependencias.
- **Oxlint** para análisis estático del código.
- **GitHub Actions** para integración y despliegue continuo.
- **GitHub Pages** para alojar el sitio estático.

El proyecto evita frameworks de estilos y librerías de componentes. La interfaz, el renderizado básico de Markdown, la internacionalización y el command palette están implementados directamente en la aplicación.

## Requisitos

- [Node.js](https://nodejs.org/) 22 o superior.
- [pnpm](https://pnpm.io/) 10.

## Desarrollo local

```bash
git clone https://github.com/SebasUrbina/sebasurbina.github.io.git
cd sebasurbina.github.io
pnpm install
pnpm dev
```

Vite servirá la aplicación en `http://127.0.0.1:5173`.

## Comandos disponibles

```bash
pnpm dev       # Inicia el servidor de desarrollo
pnpm build     # Comprueba TypeScript y genera dist/
pnpm preview   # Sirve localmente el build de producción
pnpm lint      # Ejecuta Oxlint
```

## Estructura del proyecto

```text
.
├── .github/workflows/
│   └── deploy-pages.yml     # Build y despliegue en GitHub Pages
├── public/
│   ├── fonts/               # Fuentes Geist y Geist Mono
│   └── favicon.svg
├── src/
│   ├── content/posts/       # Artículos Markdown y sus recursos
│   ├── assets/              # Imágenes locales
│   ├── data.ts              # Perfil, posts, trayectoria y enlaces
│   ├── globals.css          # Diseño completo y estilos responsive
│   ├── i18n.tsx             # Textos en español e inglés
│   ├── main.tsx             # Interfaz y comportamiento principal
│   └── types.ts             # Tipos compartidos
├── index.html
├── package.json
├── pnpm-lock.yaml
└── vite.config.ts
```

## Agregar un artículo

1. Crea el archivo Markdown dentro de `src/content/posts/`.
2. Impórtalo con `?raw` en `src/data.ts`:

```ts
import newPost from "./content/posts/my-new-post.md?raw";
```

3. Agrega sus metadatos al arreglo `posts`:

```ts
{
  date: "01 ENE 2027",
  title: "Título del artículo",
  tag: "typescript",
  excerpt: "Descripción breve del artículo.",
  content: newPost,
}
```

4. Si el título y el resumen deben aparecer traducidos, agrega ambas versiones en `src/i18n.tsx`. El contenido completo puede mantenerse en su idioma original.

## Internacionalización

La aplicación detecta `navigator.language` durante la primera visita:

- Los idiomas `es-*` utilizan español.
- Los demás idiomas utilizan inglés.
- El visitante puede cambiar manualmente entre `ES` y `EN`.
- La selección se conserva en `localStorage`.

Los textos de interfaz se administran desde `src/i18n.tsx`, mientras que la información profesional se mantiene separada en `src/data.ts`.

## Despliegue

El workflow `.github/workflows/deploy-pages.yml` se ejecuta con cada push a `main` y también puede iniciarse manualmente desde la pestaña **Actions**.

El proceso:

1. Prepara pnpm 10 y Node.js 22.
2. Instala dependencias con `pnpm install --frozen-lockfile`.
3. Ejecuta `pnpm run build`.
4. Publica el directorio `dist/` en GitHub Pages.

Para habilitarlo, configura una sola vez **Settings → Pages → Build and deployment → Source → GitHub Actions** en el repositorio.

## Licencia

Este es un proyecto de portfolio personal. Su contenido, artículos e información personal pertenecen a Sebastián Urbina.

---

Construido por [Sebastián Urbina](https://github.com/SebasUrbina).
