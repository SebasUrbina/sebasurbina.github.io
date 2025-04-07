import matter from "gray-matter";

export interface BlogPost {
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  content: string;
  slug: string;
}

// Lista de posts disponibles (esto sería más dinámico en un entorno real)
const postSlugs = ["hello-world"];

export const loadBlogPosts = async (): Promise<BlogPost[]> => {
  const posts = await Promise.all(
    postSlugs.map(async (slug) => {
      try {
        return await getBlogPost(slug);
      } catch (error) {
        console.error(`Error loading post ${slug}:`, error);
        return null;
      }
    })
  );

  // Filtrar posts nulos y ordenar por fecha
  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getBlogPost = async (slug: string): Promise<BlogPost> => {
  try {
    // En un entorno real, esto cargaría dinámicamente los archivos,
    // pero por simplicidad, hardcodeamos el ejemplo
    if (slug === "hello-world") {
      const content = `---
title: "Hello World"
date: "2024-04-06"
tags: ["react", "typescript", "blog"]
excerpt: "Mi primer post en el blog, donde exploro las posibilidades de React y TypeScript."
---

# Hello World

Este es mi primer post en el blog. Estoy emocionado de compartir mis conocimientos y experiencias con la comunidad.

## ¿Por qué este blog?

He creado este blog para compartir mis aprendizajes sobre desarrollo web, especialmente en el ecosistema de React y TypeScript.

## Tecnologías utilizadas

- React
- TypeScript
- Tailwind CSS
- GitHub Pages

## Próximos pasos

En los próximos posts, planeo cubrir temas como:

1. Configuración de un proyecto React con TypeScript
2. Implementación de un sistema de blog
3. Optimización de rendimiento
4. Mejores prácticas de desarrollo

¡Espero que disfrutes del contenido!`;

      const { data, content: markdownContent } = matter(content);

      return {
        ...data,
        content: markdownContent,
        slug,
      } as BlogPost;
    }

    throw new Error(`Post not found: ${slug}`);
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    throw error;
  }
};
