import Link from "next/link";
import type {
  BlogArticleContentBlock,
  BlogArticleText,
} from "../blog/content";
import { ResponsiveImage } from "./responsive-image";
import { QuoteModalTrigger } from "./quote-modal-trigger";

function ArticleText({ content }: { content: readonly BlogArticleText[] }) {
  return content.map((item, index) => {
    let rendered: React.ReactNode = item.text;

    if (item.emphasis === "strong") rendered = <strong>{rendered}</strong>;
    if (item.emphasis === "emphasis") rendered = <em>{rendered}</em>;
    if (item.action === "quote") {
      rendered = <QuoteModalTrigger>{rendered}</QuoteModalTrigger>;
    } else if (item.href) {
      rendered = item.href.startsWith("/") || item.href.startsWith("#") ? (
        <Link href={item.href}>{rendered}</Link>
      ) : (
        <a href={item.href} rel="noreferrer">{rendered}</a>
      );
    }

    return <span key={`${item.text}-${index}`}>{rendered}</span>;
  });
}

export function BlogArticleBody({
  content,
}: {
  content: readonly BlogArticleContentBlock[];
}) {
  return (
    <div className="blog-article-body">
      {content.map((block, index) => {
        if (block.type === "heading") {
          return block.level === 2 ? (
            <h2 id={block.id} key={block.id}>{block.text}</h2>
          ) : (
            <h3 id={block.id} key={block.id}>{block.text}</h3>
          );
        }

        if (block.type === "paragraph") {
          return <p key={`paragraph-${index}`}><ArticleText content={block.content} /></p>;
        }

        if (block.type === "list") {
          const List = block.style === "ordered" ? "ol" : "ul";
          return (
            <List key={`list-${index}`}>
              {block.items.map((item, itemIndex) => (
                <li key={`item-${itemIndex}`}><ArticleText content={item} /></li>
              ))}
            </List>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote key={`quote-${index}`}>
              <p>{block.quote}</p>
              {block.attribution ? <cite>{block.attribution}</cite> : null}
            </blockquote>
          );
        }

        if (block.type === "image") {
          return (
            <figure key={`image-${block.image.id}-${index}`}>
              <ResponsiveImage asset={{ ...block.image, alt: block.alt }} />
              {block.caption ? <figcaption>{block.caption}</figcaption> : null}
            </figure>
          );
        }

        if (block.type === "table") {
          return (
            <div className="blog-article-table" key={`table-${index}`}>
              <table>
                {block.caption ? <caption>{block.caption}</caption> : null}
                <thead>
                  <tr>
                    {block.headers.map((header) => <th scope="col" key={header}>{header}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, rowIndex) => (
                    <tr key={`row-${rowIndex}`}>
                      {row.map((cell, cellIndex) => <td key={`cell-${cellIndex}`}>{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        if (block.type === "quick-answer") {
          return (
            <aside className="blog-article-callout blog-article-quick-answer" key={`quick-answer-${index}`}>
              <strong>{block.title || "Quick answer"}</strong>
              <p><ArticleText content={block.content} /></p>
            </aside>
          );
        }

        if (block.type === "key-takeaways") {
          return (
            <aside className="blog-article-callout blog-article-key-takeaways" key={`key-takeaways-${index}`}>
              <strong>{block.title || "Key takeaways"}</strong>
              <ul>
                {block.items.map((item, itemIndex) => (
                  <li key={`takeaway-${itemIndex}`}><ArticleText content={item} /></li>
                ))}
              </ul>
            </aside>
          );
        }

        return (
          <aside className="blog-article-callout" key={`callout-${index}`}>
            {block.title ? <strong>{block.title}</strong> : null}
            <p><ArticleText content={block.content} /></p>
          </aside>
        );
      })}
    </div>
  );
}
