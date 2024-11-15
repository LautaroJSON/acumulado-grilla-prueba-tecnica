import React, { createContext, useState } from "react";
import { INormalizeArticle } from "../models";

interface IArticlesContext {
  articlesList: Array<INormalizeArticle> | null;
  visibleArticles: number;
  loadMoreArticles: () => void;
  resetArticles: () => void;
  breadcrumbs: Array<{
    slug: string;
    text: string;
  }> | null;
}

type ArticlesProviderType = {
  children: React.ReactNode;
  initialData: {
    articles: Array<INormalizeArticle> | null;
    breadcrumbs: Array<{
      slug: string;
      text: string;
    }>;
  };
};

export const ArticlesContext = createContext<IArticlesContext>({
  articlesList: null,
  breadcrumbs: null,
  visibleArticles: 8,
  loadMoreArticles: () => undefined,
  resetArticles: () => undefined,
});

export const ArticlesProvider = ({ children, initialData }: ArticlesProviderType) => {
  const [articlesList] = useState<Array<INormalizeArticle> | null>(
    initialData.articles || null
  );
  const [breadcrumbs] = useState<
    ArticlesProviderType["initialData"]["breadcrumbs"] | null
  >(initialData.breadcrumbs || null);

  const [visibleArticles, setVisibleArticles] = useState<number>(8);

  const loadMoreArticles = () => {
    setVisibleArticles((prev) => prev + 8);
  };

  const resetArticles = () => {
    setVisibleArticles(8);
  };

  return (
    <ArticlesContext.Provider
      value={{
        articlesList,
        breadcrumbs,
        visibleArticles,
        loadMoreArticles,
        resetArticles,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};
