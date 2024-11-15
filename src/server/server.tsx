import express from "express";
import path from "path";
import { renderSSR } from "./controller";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use("/static", express.static(path.join(__dirname)));
app.use("/favicon.ico", express.static(path.join(__dirname, "../public", "favicon.ico")));

app.get("*", (req, res) => {
  console.log("AAA MIRA", __dirname);
  console.log("hola server");
  renderSSR(req, res);
});

app.listen(PORT, () => {
  console.log(`SSR app running on http://localhost:${PORT}`);
});
