import React, { useContext } from "react";
import { ArticlesContext } from "./context/articlesContext";

function App() {
  const { ArticlesList } = useContext(ArticlesContext);
  console.log(ArticlesList);
  return (
    <div>
      {ArticlesList ? ArticlesList.map((a) => <h1>{a.headlines.basic}</h1>) : "Lol"}
    </div>
  );
}

export default App;
