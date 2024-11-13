import { IArticle, ITag } from "../models";

function filterArticlesBySubtype(
  articles: Array<IArticle>,
  subtype: string = "7"
): IArticle[] {
  if (!articles) return [];
  return articles.filter((article) => article.subtype === subtype);
}

function getGroupsByTag(articles: IArticle[], topTags: number = 10): Array<ITag> {
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

export { filterArticlesBySubtype, getGroupsByTag };
