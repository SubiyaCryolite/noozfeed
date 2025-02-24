//TODO Define API types

interface Person {
  firstname?: string;
  middlename?: string;
  lastname?: string;
}

interface Headline {
  main?: string; //headline
}

interface Keyword {
  name?: string;
  value?: string;
}

interface Media {
  url: string;
  type: string;
  subType: string;
}

interface Article {
  _id: string;
  web_url: string;
  pub_date: string;
  snippet: string; //description
  source: string; //failing new york times
  news_desk: string;
  headline: Headline;
  keywords: Keyword[];
  multimedia: Media[];
  section_name: string;
  byline: { original: string; person: Person[] };
}

export interface NytResults {
  response: {
    docs: Article[];
  };
}
