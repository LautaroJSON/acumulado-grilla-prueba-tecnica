import getArticles from "../services";
import {
  filterArticlesBySubtype,
  getGroupsByTag,
  normalizeArticlesToFront,
} from "../utils";

const getInitialData = async () => {
  const initialData = await getArticles();
  const filterData = filterArticlesBySubtype(initialData || []);
  const normalizeData = normalizeArticlesToFront(filterData);
  console.log("voy a retornar", normalizeData);
  const tagsBreadcrumbs = getGroupsByTag(filterData);

  return { normalizeData, tagsBreadcrumbs };
};

export { getInitialData };
