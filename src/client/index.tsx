import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import App from "../client/App";
import { ArticlesProvider } from "../client/context/articlesContext";

const initialData = window.__INITIAL_DATA__ || {
  articles: [],
  breadcrumbs: [],
};

hydrateRoot(
  document.getElementById("root")!,
  <StrictMode>
    <ArticlesProvider initialData={initialData}>
      <App />
    </ArticlesProvider>
  </StrictMode>
);
