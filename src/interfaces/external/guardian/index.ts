export interface GuardianResult {
  id: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webUrl: string;
  fields: {
    headline: string;
    trailText: string;
    byline: string;
    thumbnail?: string;
  };
}

export interface GuardianResults {
  response: {
    results: GuardianResult[];
  };
}
