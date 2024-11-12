export interface IArticle {
  _id: string;
  display_date: string;
  headlines: IHeadlines;
  promo_items?: IPromoItems;
  subtype: string;
  taxonomy: ITaxonomy;
  website_url: string;
}

interface IHeadlines {
  basic: string;
}

interface IPromoItems {
  basic: IBasic;
}

interface IBasic {
  resized_urls?: Array<IResizedUrl>;
  subtitle?: string;
  type: string;
  url?: string;
}

interface IResizedUrl {
  option: IOption;
  resizedUrl: string;
}

interface IOption {
  media: string;
}

interface ITaxonomy {
  tags: ITag[];
}

export interface ITag {
  slug: string;
  text: string;
}
