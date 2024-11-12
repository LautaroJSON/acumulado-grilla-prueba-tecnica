import { IArticle } from "../../../models";
import { formatDate } from "../../utils";

interface IArticleComponent {
  articleParam: IArticle;
}

export const Article = ({ articleParam }: IArticleComponent) => {
  const { promo_items } = articleParam;
  const defaultUrl = articleParam.promo_items?.basic.url;

  return (
    <article className="mod-caja-nota lugares w-100-mobile">
      <section className="cont-figure">
        <a href="" className="figure">
          <picture className="content-pic picture">
            {/* {promo_items?.basic?.resized_urls?.map((item, index) => (
              <source key={index} srcSet={item.resizedUrl} media={item.option.media} />
            ))} */}
            <img
              src={defaultUrl}
              alt={promo_items?.basic.subtitle || "Imagen del artículo"}
              className="content-img"
            />
          </picture>
        </a>
      </section>
      <div className="mod-caja-nota__descrip">
        <h2 className="com-title-acu">
          <a href={articleParam.website_url}>
            <b>{articleParam.headlines.basic}</b>&nbsp;
            {articleParam.promo_items?.basic.subtitle}
          </a>
        </h2>
        <h4 className="com-date">{formatDate(articleParam.display_date)}</h4>
      </div>
    </article>
  );
};
