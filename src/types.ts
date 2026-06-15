export interface SEOReport {
  id: string;
  url: string;
  timestamp: string;
  overallScore: number;
  onPage: OnPageData;
  technical: TechnicalData;
  performance: PerformanceData;
  mobile: MobileData;
  security: SecurityData;
  adSenseReadiness: AdSenseReadinessResult;
  recommendations: SEORecommendation[];
}

export interface OnPageData {
  score: number;
  title: string;
  titleStatus: "passed" | "warning" | "failed";
  titleFeedback: string;
  description: string;
  descriptionStatus: "passed" | "warning" | "failed";
  descriptionFeedback: string;
  h1: string[];
  h1Status: "passed" | "warning" | "failed";
  h1Feedback: string;
  h2: string[];
  h2Status: "passed" | "warning" | "failed";
  h2Feedback: string;
  imageAltCount: number;
  imageAltMissing: number;
  imageAltStatus: "passed" | "warning" | "failed";
  imageAltFeedback: string;
  canonical: string;
  canonicalStatus: "passed" | "warning" | "failed";
  canonicalFeedback: string;
  robotsMeta: string;
  robotsMetaStatus: "passed" | "warning" | "failed";
  robotsMetaFeedback: string;
}

export interface TechnicalData {
  score: number;
  robotsUrl: string;
  robotsStatus: "passed" | "warning" | "failed";
  robotsFeedback: string;
  sitemapUrl: string;
  sitemapStatus: "passed" | "warning" | "failed";
  sitemapFeedback: string;
  sslStatus: "passed" | "warning" | "failed";
  sslUrl: string;
  sslFeedback: string;
  httpsStatus: "passed" | "warning" | "failed";
  httpsFeedback: string;
  structuredDataDetected: boolean;
  structuredDataStatus: "passed" | "warning" | "failed";
  structuredDataFeedback: string;
}

export interface PerformanceData {
  score: number;
  loadTimeSeconds: number;
  loadTimeStatus: "passed" | "warning" | "failed";
  loadTimeFeedback: string;
  pageSizeMb: number;
  pageSizeStatus: "passed" | "warning" | "failed";
  pageSizeFeedback: string;
  lcpSeconds: number;
  lcpStatus: "passed" | "warning" | "failed";
  lcpFeedback: string;
  clsScore: number;
  clsStatus: "passed" | "warning" | "failed";
  clsFeedback: string;
  isCompressed: boolean;
  compressionStatus: "passed" | "warning" | "failed";
  compressionFeedback: string;
  coreWebVitalsFeedback: string;
  coreWebVitalsStatus: "passed" | "warning" | "failed";
}

export interface MobileData {
  score: number;
  mobileFriendlyStatus: "passed" | "warning" | "failed";
  mobileFriendlyFeedback: string;
  viewportStatus: "passed" | "warning" | "failed";
  viewportFeedback: string;
  touchFriendlyStatus: "passed" | "warning" | "failed";
  touchFriendlyFeedback: string;
}

export interface SecurityData {
  score: number;
  sslStatus: "passed" | "warning" | "failed";
  sslFeedback: string;
  httpsStatus: "passed" | "warning" | "failed";
  httpsFeedback: string;
  securityHeadersStatus: "passed" | "warning" | "failed";
  securityHeadersFeedback: string;
}

export interface AdSenseReadinessResult {
  score: number;
  status: "ready" | "needs_improvement" | "not_ready";
  overallFeedback: string;
  checklist: AdSenseChecklistItem[];
}

export interface AdSenseChecklistItem {
  name: string;
  status: "passed" | "warning" | "failed";
  problem?: string;
  impact?: string;
  priority?: "high" | "medium" | "low";
  fixSuggestion?: string;
  adSenseImpact?: string;
}

export interface SEORecommendation {
  id: string;
  title: string;
  priority: "high" | "medium" | "low";
  category: string;
  problem: string;
  impact: string;
  fixSuggestion: string;
  adSenseImpact?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  date: string;
  readTime: string;
  image: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  replied: boolean;
}
