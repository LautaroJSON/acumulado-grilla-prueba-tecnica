import getArticles from "../services";
import {
  filterArticlesBySubtype,
  getGroupsByTag,
  normalizeArticlesToFront,
} from "../utils";

const getInitialData = async () => {
  const initialData = await getArticles(); // Llamada al servicio
  const filterData = filterArticlesBySubtype(initialData || []);
  const normalizeData = normalizeArticlesToFront(filterData);

  const tagsBreadcrumbs = getGroupsByTag(filterData);

  return { normalizeData, tagsBreadcrumbs };
};

export { getInitialData };
