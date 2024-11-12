import React, { createContext, useState } from "react";
import { IArticle } from "../../models";

interface IArticlesContext {
  ArticlesList: Array<IArticle> | null;
  setArticlesListHandle: (articlesParam: Array<IArticle>) => void;
}

type ArticlesProviderType = {
  children: React.ReactNode;
  initialData: Array<IArticle> | null;
};

export const ArticlesContext = createContext<IArticlesContext>({
  ArticlesList: [],
  setArticlesListHandle: () => {},
});

export const ArticlesProvider = ({
  children,
  initialData = [],
}: ArticlesProviderType) => {
  const [ArticlesList, setArticlesList] = useState<Array<IArticle> | null>(initialData);

  const setArticlesListHandle = (articlesParam: Array<IArticle>) => {
    setArticlesList(articlesParam);
  };

  return (
    <ArticlesContext.Provider value={{ ArticlesList, setArticlesListHandle }}>
      {children}
    </ArticlesContext.Provider>
  );
};
