# Portfolio Personal - Sebastián Urbina

Portfolio personal desarrollado con React, TypeScript y Vite. Una página web moderna y profesional que muestra mi perfil, logros, proyectos y blog personal.

## 🚀 Características

- **Diseño Moderno**: Interfaz limpia y profesional con soporte para modo oscuro
- **Blog Personal**: Sistema de blog integrado con soporte para Markdown
- **Responsive**: Diseño completamente adaptable a diferentes dispositivos
- **Animaciones**: Transiciones suaves con Framer Motion
- **Performance**: Optimizado con Vite para carga rápida

## 🛠️ Tecnologías

- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Estilos utilitarios
- **React Router** - Navegación
- **Framer Motion** - Animaciones
- **React Markdown** - Renderizado de contenido Markdown

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Preview de producción
npm run preview
```

## 📁 Estructura del Proyecto

```
├── public/
│   └── posts/          # Posts del blog en Markdown
├── src/
│   ├── components/     # Componentes reutilizables
│   ├── pages/          # Páginas principales
│   ├── layouts/        # Layouts de la aplicación
│   ├── router/         # Configuración de rutas
│   ├── types/          # Tipos TypeScript
│   └── assets/         # Recursos estáticos
```

## 📝 Agregar Nuevos Posts

1. Crea un archivo `.md` en `public/posts/`
2. Agrega los metadatos en `public/posts/metadata.json`:

```json
{
  "title": "Título del Post",
  "excerpt": "Descripción breve",
  "date": "YYYY-MM-DD",
  "slug": "nombre-del-post",
  "tags": ["tag1", "tag2"]
}
```

## 🚢 Despliegue

El proyecto está configurado para desplegarse en GitHub Pages:

```bash
npm run deploy
```

## 📄 Licencia

Este proyecto es personal y privado.

---

Desarrollado con ❤️ por Sebastián Urbina
