import { IArticle, INormalizeArticle, ITag } from "../models";
import sharp from "sharp";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";

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

function formatDate(dateParam: string): string {
  const date = new Date(dateParam);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  return `${day} de ${month} de ${year}`;
}

function normalizeArticle(article: IArticle): INormalizeArticle {
  const defaultArticle: INormalizeArticle = {
    id: "",
    imageUrl: "",
    title: "Sin titulo",
    subtitle: "Sin subtitulo",
    date: "Sin fecha",
    websiteUrl: "",
  };

  return {
    id: article._id ?? defaultArticle.id,
    imageUrl: article.promo_items?.basic.url ?? defaultArticle.imageUrl,
    title: article.headlines.basic ?? defaultArticle.title,
    subtitle: article.promo_items?.basic.subtitle ?? defaultArticle.subtitle,
    date: formatDate(article.display_date) ?? defaultArticle.date,
    websiteUrl: article.website_url ?? defaultArticle.websiteUrl,
  };
}

function normalizeArticlesToFront(articles: IArticle[]) {
  return articles.map(normalizeArticle);
}

const downloadConvertAndSaveImage = async (imageUrl: string, filename: string) => {
  const webpFilePath = path.resolve(__dirname, "../public/images", `${filename}.webp`);
  const newImageUrl = `/images/${filename}.webp`;

  if (fs.existsSync(webpFilePath)) {
    return newImageUrl;
  }

  const response = await fetch(imageUrl);
  if (!response.ok) throw new Error("Failed to fetch image");

  const stream = sharp().webp({ quality: 80 });
  const writeStream = fs.createWriteStream(webpFilePath);
  response.body.pipe(stream).pipe(writeStream);

  await new Promise((resolve, reject) => {
    writeStream.on("finish", resolve);
    writeStream.on("error", reject);
  });

  return newImageUrl;
};

const processArticlesAndDownloadImages = async (
  articles: IArticle[]
): Promise<IArticle[]> => {
  const arrayImagesPromises = articles.map(async (article) => {
    if (article.promo_items?.basic?.url) {
      try {
        const localPath = await downloadConvertAndSaveImage(
          article.promo_items.basic.url,
          article._id
        );
        return {
          ...article,
          promo_items: {
            basic: {
              ...article.promo_items.basic,
              url: localPath,
            },
          },
        };
      } catch (error) {
        console.error(`Error downloading image for article ${article._id}:`, error);
      }
    }
    return article;
  });

  const updatedArticles = await Promise.all(arrayImagesPromises);

  return updatedArticles;
};

export {
  filterArticlesBySubtype,
  getGroupsByTag,
  formatDate,
  normalizeArticlesToFront,
  processArticlesAndDownloadImages,
};
