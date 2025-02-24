import { Article, SearchArgs } from "@/interfaces";
import { NpmResults } from "@/interfaces/external";
import { canUseSource, getArticle } from "@/utils";

const DataSourceName = "Test";

export const TestDataSource = {
  value: DataSourceName,
  label: "Test Source",
};

//different
export const getTestUrl = (searchArguments: SearchArgs): string | undefined => {
  if (!canUseSource(searchArguments.sources, DataSourceName)) {
    return undefined;
  }

  const url = new URL("https://api.npms.io/v2/search");

  if (searchArguments.searcthText?.length) {
    url.searchParams.append("q", searchArguments.searcthText);
  }

  if (url.searchParams.size === 0) {
    return undefined;
  }
  return url.toString();
};

//different
export const getTestTransformer = (data: NpmResults): Article[] => {
  const results: Article[] = [];
  data.results?.forEach((result) => {
    const article = getArticle();
    article.uuid = `${result.package.date}-${DataSourceName}-${result.package.name}`;
    article.publication.id = "test.id.zz";
    article.publication.name = "Test";
    article.description = result.package.description;
    article.title = result.package.name;
    article.publishedAt = result.package.date;
    article.urlToImage =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/640px-Npm-logo.svg.png";
    result.package.maintainers?.forEach(({ username, email }) => {
      article.authors.push(`${username} <${email}>`);
    });
    result.package.keywords?.forEach((keyword) => {
      article.keywords.push(keyword);
    });
    results.push(article);
  });
  return results;
};
