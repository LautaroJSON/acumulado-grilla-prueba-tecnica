import express from "express";
import path from "path";
import fs from "fs";
import ReactDOMServer from "react-dom/server";

import App from "../client/App";
import getArticles from "./services";
import { filterArticlesBySubtype, getGroupsByTag } from "./utils";
import { ArticlesProvider } from "../client/context/articlesContext";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

const getInitialData = async () => {
  const initialData = await getArticles();
  const filterData = filterArticlesBySubtype(initialData || []);
  const tagsBreadcrumbs = getGroupsByTag(filterData);

  return { filterData, tagsBreadcrumbs };
};

const reactToHTML = async () => {
  const initialData = await getInitialData();

  const reactApp = ReactDOMServer.renderToString(
    <ArticlesProvider
      initialData={{
        articles: initialData.filterData,
        breadcrumbs: initialData.tagsBreadcrumbs,
      }}
    >
      <App />
    </ArticlesProvider>
  );

  const html = await fs.promises.readFile(path.resolve(__dirname, "index.html"), "utf-8");
  const cssString = await fs.promises.readFile(
    path.resolve(__dirname, "server.css"),
    "utf8"
  );

  const reactHtml = html
    .replace('<div id="root"></div>', `<div id="root">${reactApp}</div>`)
    .replace("</title>", `</title> <style>${cssString}</style>`)
    .replace(
      "</body>",
      `<script>window.__INITIAL_DATA__ = ${JSON.stringify({
        articles: initialData.filterData,
        breadcrumbs: initialData.tagsBreadcrumbs,
      })};</script></body>`
    );

  return reactHtml;
};

const app = express();

app.use("/static", express.static(path.join(__dirname)));
app.use("/favicon.ico", express.static(path.join(__dirname, "../public", "favicon.ico")));

app.get("*", async (_, res) => {
  const indexHtml = await reactToHTML();
  res.status(200).send(indexHtml);
});

app.listen(PORT, () => {
  console.log(`SSR app running on http://localhost:${PORT}`);
});
