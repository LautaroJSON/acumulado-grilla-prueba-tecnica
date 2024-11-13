import { useContext } from "react";
import { ArticlesContext } from "./context/articlesContext";
import { ArticleGrid, Row, TagList, Title } from "./components";

import Layout from "./layout";
import "./globals.css";
import Button from "./components/Button";

const TEXT = {
  title: "Acumulado Grilla",
  button: {
    moreInfoLabel: "MÁS NOTAS DE ACUMULADO GRILLA",
    lessInfoLabel: "MOSTRAR MENOS",
  },
};

function App() {
  const { articlesList, visibleArticles, breadcrumbs, loadMoreArticles, resetArticles } =
    useContext(ArticlesContext);

  return (
    <main>
      <Layout>
        <>
          <Row>
            <Title>{TEXT.title}</Title>
          </Row>
          <Row>
            <TagList tags={breadcrumbs} />
          </Row>
          <ArticleGrid articles={articlesList} />
          <Row>
            {visibleArticles > articlesList!.length ? (
              <Button label={TEXT.button.lessInfoLabel} onClick={resetArticles} />
            ) : (
              <Button label={TEXT.button.moreInfoLabel} onClick={loadMoreArticles} />
            )}
          </Row>
        </>
      </Layout>
    </main>
  );
}

export default App;
