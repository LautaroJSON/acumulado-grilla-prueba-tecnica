import { useCallback, useContext, useState } from "react";
import { INormalizeArticle } from "../../models";
import { Article } from "../Article";
import { ArticlesContext } from "../../context/articlesContext";

interface IArticleGrid {
  articles: Array<INormalizeArticle> | null;
}

export const ArticleGrid = ({ articles }: IArticleGrid) => {
  if (!articles) return null;
  const { visibleArticles } = useContext(ArticlesContext);

  const articlesToDisplay = articles.slice(0, visibleArticles);

  return (
    <section className="row-gap-tablet-2 row-gap-deskxl-3 hlp-degrade">
      {articlesToDisplay.map((a) => (
        <Article articleParam={a} key={a.id}></Article>
      ))}
    </section>
  );
};
