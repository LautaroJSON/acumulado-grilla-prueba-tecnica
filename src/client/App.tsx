import { useContext } from "react";
import { ArticlesContext } from "./context/articlesContext";
import { ArticleGrid, Row, TagList, Title } from "./components";

import Layout from "./layout";
import "./globals.css";
import Button from "./components/Button";

function App() {
  const { articlesList, visibleArticles, breadcrumbs, loadMoreArticles, resetArticles } =
    useContext(ArticlesContext);

  return (
    <main>
      <Layout>
        <>
          <Row>
            <Title>Acumulado Grilla</Title>
          </Row>
          <Row>
            <TagList tags={breadcrumbs} />
          </Row>
          <ArticleGrid articles={articlesList} />
          <Row>
            {visibleArticles > articlesList!.length ? (
              <Button label="MOSTRAR MENOS" onClick={resetArticles} />
            ) : (
              <Button label="MÁS NOTAS DE ACUMULADO GRILLA" onClick={loadMoreArticles} />
            )}
          </Row>
        </>
      </Layout>
    </main>
  );
}

export default App;
