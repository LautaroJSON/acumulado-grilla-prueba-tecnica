import { IArticle } from "../models";
import fetch from "node-fetch";

const apiUrl = process.env.API_URL;

const getArticles = async (): Promise<Array<IArticle> | null> => {
  if (!apiUrl) return null;

  const response = await fetch(apiUrl);
  try {
    const data = await response.json();
    return data.articles as Array<IArticle>;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export default getArticles;
