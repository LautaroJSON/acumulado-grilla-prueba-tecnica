import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../client/App";
import fs from "fs";
import path from "path";
import getArticles from "./services";
import { ArticlesProvider } from "../client/context/articlesContext";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.static(path.resolve(__dirname, "dist")));

app.get("*", async (req, res) => {
  const initialData = await getArticles();

  const appString = ReactDOMServer.renderToString(
    <ArticlesProvider initialData={initialData}>
      <App />
    </ArticlesProvider>
  );

  fs.readFile(path.resolve(__dirname, "public/index.html"), "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("error");
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${appString}</div>`)
    );
  });
});

app.listen(3000, () => {
  console.log("SSR app running on http://localhost:3000");
});
