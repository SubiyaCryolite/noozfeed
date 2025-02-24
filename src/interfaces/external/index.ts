export interface BaseArticle {
  title: string | undefined;
  description: string | undefined;
  url: string | undefined;
  urlToImage: string | undefined;
  publishedAt: string | undefined;
}

export interface NewsApiArticle extends BaseArticle {
  source: {
    id: string | undefined;
    name: string | undefined;
  };
  author: string | undefined;
}
