import { INormalizeArticle } from "../../models";

interface IArticleComponent {
  articleParam: INormalizeArticle;
}

export const Article = ({ articleParam }: IArticleComponent) => {
  return (
    <article className="mod-caja-nota lugares w-100-mobile">
      <section className="cont-figure">
        <a href={articleParam.websiteUrl} className="figure">
          <picture className="content-pic picture">
            {/* 
            Las resized_urls tiene las url rotas, en caso de que funcionen: 
            {promo_items?.basic?.resized_urls?.map((item, index) => (
              <source key={index} srcSet={item.resizedUrl} media={item.option.media} />
            ))} */}
            <img
              src={articleParam.imageUrl}
              alt={articleParam.subtitle || "Imagen del artículo"}
              className="content-img"
            />
          </picture>
        </a>
      </section>
      <div className="mod-caja-nota__descrip">
        <h2 className="com-title-acu">
          <a href={articleParam.websiteUrl}>
            <b>{articleParam.title}</b>&nbsp;
            {articleParam.subtitle}
          </a>
        </h2>
        <h4 className="com-date">{articleParam.date}</h4>
      </div>
    </article>
  );
};
