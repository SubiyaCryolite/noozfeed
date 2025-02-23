export * from "./test";

export interface NewsApiArticle {
  source: {
    id: string | undefined;
    name: string | undefined;
  };
  author: string | undefined;
  title: string | undefined;
  description: string | undefined;
  url: string | undefined;
  urlToImage: string | undefined;
  publishedAt: string | undefined;
}
