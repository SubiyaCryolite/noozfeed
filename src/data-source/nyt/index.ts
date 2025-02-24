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

  const categories: string[] = [];
  Object.entries(filters.categories).forEach(([key, active]) => {
    if (active) categories.push(key);
  });
  if (categories.length) {
    //TODO NYT fq
    //url.searchParams.append("section", categories[0]);
  }

  if (url.searchParams.size === 0) {
    return undefined;
  }
  url.searchParams.append("api-key", "uozEQ9mu4bpfmGMgm87tmF57p3fGitH8");
  url.searchParams.append("sort", "newest");
  return url.toString();
};

export const getNytTransformer = (data: NytResults): Article[] => {
  const results: Article[] = [];
  data.response.docs.forEach((result) => {
    const article = getArticle();
    article.uuid = result._id;
    article.description = result.snippet;
    article.title = result.headline.main;
    article.publishedAt = result.pub_date;
    article.publication.value = "nyt";
    article.publication.label = "The New York Times";
    article.authors.push(result.byline.original);
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
