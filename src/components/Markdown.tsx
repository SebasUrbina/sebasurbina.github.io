const assetModules = import.meta.glob<string>("../content/posts/*.{png,jpg,jpeg,svg,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});

const assets = new Map(
  Object.entries(assetModules).map(([path, url]) => [path.split("/").pop() ?? path, url]),
);

const escapeAttribute = (value: string) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

const assetUrl = (src: string) => assets.get(src.split("/").pop() ?? src) ?? src;

const FIGURE = /^!\[([^\]]*)\]\(([^)]+)\)$/;

function inline(text: string) {
  return text
    .replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      (_m, alt: string, src: string) =>
        `<img src="${assetUrl(src)}" alt="${escapeAttribute(alt)}" loading="lazy" />`,
    )
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noreferrer">$1</a>',
    )
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

export function Markdown({ source }: { source: string }) {
  const output: string[] = [];
  let code = false;
  let list = false;
  let table = false;
  for (const raw of source.split("\n")) {
    if (raw.startsWith("```")) {
      if (list) {
        output.push("</ul>");
        list = false;
      }
      output.push(code ? "</code></pre>" : "<pre><code>");
      code = !code;
      continue;
    }
    if (code) {
      output.push(
        raw.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") +
          "\n",
      );
      continue;
    }
    if (/^\|/.test(raw)) {
      if (!table) {
        output.push('<pre class="table">');
        table = true;
      }
      output.push(raw + "\n");
      continue;
    }
    if (table) {
      output.push("</pre>");
      table = false;
    }
    const item = raw.match(/^[-*] (.+)/);
    if (item) {
      if (!list) {
        output.push("<ul>");
        list = true;
      }
      output.push(`<li>${inline(item[1])}</li>`);
      continue;
    }
    if (list) {
      output.push("</ul>");
      list = false;
    }
    const figure = raw.trim().match(FIGURE);
    const heading = raw.match(/^(#{1,3}) (.+)/);
    if (figure) {
      const [, alt, src] = figure;
      const caption = alt && !/^alt text$/i.test(alt) ? `<figcaption>${inline(alt)}</figcaption>` : "";
      output.push(
        `<figure${src.endsWith(".svg") ? ' class="diagram"' : ""}><img src="${assetUrl(src)}" alt="${escapeAttribute(alt)}" loading="lazy" />${caption}</figure>`,
      );
    } else if (heading) {
      const level = Math.min(heading[1].length + 1, 4);
      output.push(`<h${level}>${inline(heading[2])}</h${level}>`);
    } else if (raw.startsWith("> "))
      output.push(`<blockquote>${inline(raw.slice(2))}</blockquote>`);
    else if (raw === "---") output.push("<hr>");
    else if (raw.trim()) output.push(`<p>${inline(raw)}</p>`);
  }
  if (list) output.push("</ul>");
  if (table) output.push("</pre>");
  return (
    <div
      className="markdown"
      dangerouslySetInnerHTML={{ __html: output.join("") }}
    />
  );
}
