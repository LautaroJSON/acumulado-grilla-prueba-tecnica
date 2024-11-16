import getArticles from "../services";
import {
  filterArticlesBySubtype,
  getGroupsByTag,
  normalizeArticlesToFront,
  processArticlesAndDownloadImages,
} from "../utils";

const getInitialData = async () => {
  const initialData = await getArticles();
  const filterData = filterArticlesBySubtype(initialData || []);
  const imageData = await processArticlesAndDownloadImages(filterData);
  const normalizeData = normalizeArticlesToFront(imageData);

  const tagsBreadcrumbs = getGroupsByTag(filterData);

  return { normalizeData, tagsBreadcrumbs };
};

export { getInitialData };
