import { Request, Response } from "express";
import path from "path";
import fs from "fs";

import ReactDOMServer from "react-dom/server";
import App from "../../client/App";
import { ArticlesProvider } from "../../client/context/articlesContext";
import { getInitialData } from "./dataController";

const reactToHTML = async () => {
  const initialData = await getInitialData();

  const reactApp = ReactDOMServer.renderToString(
    <ArticlesProvider
      initialData={{
        articles: initialData.normalizeData,
        breadcrumbs: initialData.tagsBreadcrumbs,
      }}
    >
      <App />
    </ArticlesProvider>
  );

  return { reactApp, initialData };
};

export const renderSSR = async (_: Request, res: Response) => {
  console.log("entre al render");
  const { reactApp, initialData } = await reactToHTML();
  const html = await fs.promises.readFile(path.resolve(__dirname, "index.html"), "utf-8");

  const finalHtml = html
    .replace('<div id="root"></div>', `<div id="root">${reactApp}</div>`)
    .replace(
      "</body>",
      `<script>window.__INITIAL_DATA__ = ${JSON.stringify({
        articles: initialData.normalizeData,
        breadcrumbs: initialData.tagsBreadcrumbs,
      })};</script></body>`
    );

  console.log("voy a retornar");

  res.status(200).send(finalHtml);
};
