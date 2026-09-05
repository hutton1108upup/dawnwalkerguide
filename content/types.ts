export type VerificationStatus = 'verified-retail' | 'official-confirmed' | 'multi-source-confirmed' | 'community-report' | 'unverified';
export type SpoilerLevel = 'none' | 'light' | 'full';
export interface Source { title: string; url: string; note?: string }
export interface Quest {
  slug: string; name: string; type: 'main' | 'side' | 'activity'; location: string;
  timeCost: number | null; timeOfDay: 'day' | 'night' | 'either' | 'unknown';
  howToStart: string; prerequisites: string[]; deadline: string | null;
  missable: boolean | null; lockouts: string[]; rewards: string[]; routeTags: string[];
  character: string; faction: string; spoilerSafeSummary: string; fullSpoilerSummary?: string;
  verificationStatus: VerificationStatus; gameVersion: string; lastVerified: string; sources: Source[];
}
export interface Choice {
  slug: string; title: string; questSlug: string; question: string; recommendation: string;
  options: {label: string; bestFor: string; timeCost: number | null; reward: string; lockout: string}[];
  lightConsequence: string; fullConsequence: string; reversible: string;
  verificationStatus: VerificationStatus; sources: Source[];
}
export interface Missable {
  id: string; name: string; group: string; type: 'Quest' | 'Item' | 'NPC' | 'Romance' | 'Achievement';
  condition: string; lightCondition: string; fullCondition: string; href: string; verificationStatus: VerificationStatus;
}
export interface ArticleSection {id: string; title: string; paragraphs: string[]; bullets?: string[]; table?: {headers: string[]; rows: string[][]}; spoiler?: SpoilerLevel}
export interface Article {
  slug: string; category: 'guides' | 'fixes' | 'news'; title: string; description: string;
  kicker: string; quickAnswer: string; verificationStatus: VerificationStatus; gameVersion: string;
  updated: string; indexable: boolean; sections: ArticleSection[]; sources: Source[];
  related: string[]; keywords: string[];
}
