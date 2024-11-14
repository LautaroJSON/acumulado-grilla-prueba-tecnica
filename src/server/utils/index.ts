import { IArticle, ITag } from "../models";
import fetch from "node-fetch";

function filterArticlesBySubtype(
  articles: Array<IArticle>,
  subtype: string = "7"
): IArticle[] {
  if (!articles) return [];
  return articles.filter((article) => article.subtype === subtype);
}

function getGroupsByTag(articles: Array<IArticle>, topTags: number = 10): Array<ITag> {
  if (!articles) return [];

  const tagCounts: Record<string, { tag: ITag; count: number }> = {};

  articles.forEach((a) => {
    a.taxonomy.tags.forEach((t) => {
      if (tagCounts[t.slug]) {
        tagCounts[t.slug].count += 1;
      } else {
        tagCounts[t.slug] = { tag: t, count: 1 };
      }
    });
  });
  const sortedTags = Object.values(tagCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, topTags);
  const finalTags = sortedTags.map((s) => s.tag);
  return finalTags;
}

function extractImageUrls(articles: IArticle[]): string[] {
  let imageUrls: string[] = [];

  articles.forEach((article) => {
    if (article.promo_items?.basic?.url) {
      imageUrls.push(article.promo_items.basic.url);
    }
  });

  return imageUrls;
}

async function downloadImages(imageUrls: string[]): Promise<Buffer[]> {
  try {
    const downloadPromises = imageUrls.map((url) =>
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error al descargar la imagen de ${url}`);
          }
          return response.buffer();
        })
        .then((buffer) => buffer)
    );

    const imageBuffers = await Promise.all(downloadPromises);

    return imageBuffers;
  } catch (error) {
    console.error("Error al descargar las imágenes:", error);
    return [];
  }
}

export { filterArticlesBySubtype, getGroupsByTag, downloadImages };
