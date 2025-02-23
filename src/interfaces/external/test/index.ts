/**
 * Describes the interface of result listings from the publicly available NPM api
 */
export interface NpmResult {
  package: {
    name: string;
    description: string;
    keywords: string[];
    date: string;
    links: Record<string, string>;
    maintainers: [
      {
        username: string;
        email: string;
      },
    ];
  };
}

export interface NpmResults {
  results: NpmResult[];
}
