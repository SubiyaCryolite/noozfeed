import { Article, SearchArgs } from "@/interfaces";
import { canUseSource, getArticle } from "@/utils";
import { NytResults } from "@/interfaces/external/nyt";
import { format } from "date-fns";

const DataSourceName = "nyt.src";

export const NytDataSource = {
  value: DataSourceName,
  label: "New York Times",
};

function nytDate(date: Date) {
  return format(date, "yyyyLLdd");
}

export const getNytUrl = (filters: SearchArgs): string | undefined => {
  if (!canUseSource(filters.sources, DataSourceName)) {
    return undefined;
  }

  const url = new URL(
    "https://api.nytimes.com/svc/search/v2/articlesearch.json",
  );
  if (filters.searcthText?.length) {
    url.searchParams.append("q", filters.searcthText);
  }
  if (filters.startDate) {
    url.searchParams.append("begin_date", nytDate(filters.startDate));
  }
  if (filters.endDate) {
    url.searchParams.append("end_date", nytDate(filters.endDate));
  }

  /**
   * Works with supported [Section Name Values]
   * https://developer.nytimes.com/docs/articlesearch-product/1/overview
   */
  const categories = Object.entries(filters.categories)
    .filter(([, active]) => active)
    .map(([key]) => key);
  if (categories.length) {
    url.searchParams.append("fq", `section_name:("${categories.join(`","`)}")`);
  }

  const publications = Object.entries(filters.publications)
    .filter(([, active]) => active)
    .map(([key]) => key);
  if (publications.length) {
    url.searchParams.append("fq", `source:("${publications.join(`","`)}")`);
  }

  if (url.searchParams.size === 0) {
    return undefined;
  }
  url.searchParams.append("api-key", import.meta.env.VITE_APP_NYT_KEY);
  url.searchParams.append("sort", "newest");
  return url.toString();
};

export const getNytTransformer = (data: NytResults): Article[] => {
  const results: Article[] = [];
  data.response.docs.forEach((result) => {
    const article = getArticle();
    article.uuid = result._id;
    article.url = result.web_url;
    article.description = result.snippet;
    article.title = result.headline.main;
    article.publishedAt = result.pub_date;
    article.publication.value = result.source.toLowerCase();
    article.publication.label = result.source;
    result.byline.person.forEach((p) => {
      const names = [];
      if (p.firstname) names.push(p.firstname);
      if (p.middlename) names.push(p.middlename);
      if (p.lastname) names.push(p.lastname);
      const name = names.join(" ");
      article.authors.push({ label: name, value: name.toLowerCase() });
    });
    result.multimedia.forEach(({ url, subType, type }) => {
      if (type === "image" && subType === "googleFourByThree") {
        article.urlToImage = `https://static01.nyt.com/${url}`;
      }
    });
    article.category.value = result.news_desk.toLocaleLowerCase();
    article.category.label = result.news_desk;
    results.push(article);
  });
  return results;
};
