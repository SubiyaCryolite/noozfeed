import { Article, SearchArgs } from "@/interfaces";
import { canUseSource, getArticle } from "@/utils";
import { GuardianResults } from "@/interfaces/external/guardian";

const DataSourceName = "guardian.api";
const DEV_KEY = "4e297e2c-3412-4db2-9d7f-41dad7698ff6";

export const GuardianDataSource = {
  value: DataSourceName,
  label: "The Guardian",
};

export const getGuardianUrl = (filters: SearchArgs): string | undefined => {
  if (!canUseSource(filters.sources, DataSourceName)) {
    return undefined;
  }

  const url = new URL("https://content.guardianapis.com/search");
  if (filters.searcthText?.length) {
    url.searchParams.append("q", filters.searcthText);
  }
  if (filters.startDate) {
    url.searchParams.append("from-date", filters.startDate.toISOString());
  }
  if (filters.endDate) {
    url.searchParams.append("to-date", filters.endDate.toISOString());
  }
  const categories: string[] = [];
  Object.entries(filters.categories).forEach(([key, active]) => {
    if (active) categories.push(key);
  });
  if (categories.length === 1) {
    //only one category allowed
    url.searchParams.append("section", categories[0]);
  }

  if (url.searchParams.size === 0) {
    return undefined;
  }
  url.searchParams.append("api-key", DEV_KEY);
  url.searchParams.append("lang", "en");
  url.searchParams.append("page-size", "10");
  url.searchParams.append("order-by", "newest");
  url.searchParams.append("show-fields", "thumbnail,trailText,byline,headline");
  return url.toString();
};

export const getGuardianTransformer = (data: GuardianResults): Article[] => {
  const results: Article[] = [];
  data.response.results.forEach((result) => {
    const article = getArticle();
    article.uuid = result.id;
    article.description = result.fields.trailText;
    article.title = result.fields.headline;
    article.publishedAt = result.webPublicationDate;
    article.urlToImage = result.fields.thumbnail;
    article.publication.value = "guardian";
    article.publication.label = "The Guardian";
    article.authors.push(result.fields.byline);
    article.categories.push({
      value: result.sectionId,
      label: result.sectionName,
    });
    results.push(article);
  });
  return results;
};
