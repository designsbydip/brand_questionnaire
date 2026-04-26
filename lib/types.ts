// ─── Part 1: Story Foundation ───────────────────────────────────────────────
export interface Part1Data {
  originStory: string;
  ahaMoment: string;
  frustrationDescription: string;
  gaudiStartDate: string; // ISO date string
  automation6MonthsAgo: number;
  currentAutomation: number;
  targetAutomation12Months: number;
}

// ─── Part 2: Value Prop & Messaging ─────────────────────────────────────────
export interface MetricRow {
  metric: string;
  before: string;
  after: string;
  improvement?: string;
}

export interface Part2Data {
  valuePropAudience: string;
  valuePropOutcome: string;
  valuePropMethod: string;
  valuePropFraming: string;
  capabilities: string[];
  aiHandles: string;
  humansHandle: string;
  outputTypes: string[];
  impactEngineers: string;
  impactCompany: string;
  impactClients: string;
  caseStudyExample: string;
  metricsData: MetricRow[];
}

// ─── Part 3: Brand Personality ───────────────────────────────────────────────
export interface Part3Data {
  vibeAttributes: string[];
  toneCasualToProfessional: number;
  tonePlayfulToSerious: number;
  toneBoldToUnderstated: number;
  toneStartupToEnterprise: number;
  companiesAdmired: string;
  analogyCar: string;
  analogyPerson: string;
  analogyBuilding: string;
}

// ─── Part 4: Narrative Direction ─────────────────────────────────────────────
export interface Part4Data {
  storytellingDepth: "subtle" | "deep" | "between";
  sectionPriority: string[];
  heroFocus: string;
}

// ─── Part 5: Information Architecture ────────────────────────────────────────
export interface HomepageSection {
  section: string;
  choice: "include" | "maybe" | "skip";
}

export interface UserJourney {
  landsOn: string;
  needsToSee: string;
  convertsAt: string;
}

export interface ContentDepthItem {
  page: string;
  depth: "light" | "medium" | "deep";
  wordCount?: string;
}

export interface Part5Data {
  pageHierarchy: string[];
  homepageSections: HomepageSection[];
  homepagePriority: string[];
  journeyJobCandidate: UserJourney;
  journeyAckSite: UserJourney;
  journeyCompetitor: UserJourney;
  navItems: string[];
  ctaHeader: string;
  ctaHero: string;
  ctaFooter: string;
  contentDepth: ContentDepthItem[];
}

// ─── Part 6: Conversion Strategy ─────────────────────────────────────────────
export interface Objection {
  objection: string;
  counter: string;
}

export interface Part6Data {
  conversionGoals: string[];
  ctaCareersButton: string;
  ctaCareersSupporting: string;
  ctaContactButton: string;
  ctaContactSupporting: string;
  objections: Objection[];
  trustSignals: string[];
  trustSignalsLocation: string;
}

// ─── Part 7: Technical Positioning ───────────────────────────────────────────
export interface Part7Data {
  aiTransparencyLevel: string;
  proprietaryVsOpen: string;
  humanAiFraming: string;
}

// ─── Part 8: Proof & Credibility ─────────────────────────────────────────────
export interface Part8Data {
  availableAssets: string[];
  projectsAutomated: number;
  hoursSavedPerProject: number;
  accuracyImprovement: number;
  currentAutomationPercent: number;
  targetAutomationPercent: number;
  teamSize: number;
}

// ─── Part 9: Target Audience ──────────────────────────────────────────────────
export interface OpenRole {
  role: string;
  level: string;
  skills: string;
}

export interface Part9Data {
  candidateExperienceLevel: string;
  candidateTechnicalSkills: string;
  candidateNiceToHave: string;
  candidateCultureFit: string;
  candidateMotivations: string[];
  candidateQuestions: string[];
  careerUniqueSelling: string[];
  careerProblemsToSolve: string;
  careerGrowth: string;
  officeLocation: string;
  remotePolicy: string;
  careerTeamSize: number;
  careerVibe: string;
  careerPerks: string;
  openRoles: OpenRole[];
  noOpeningsHandling: string[];
}

// ─── Part 10: Visual Direction ────────────────────────────────────────────────
export interface Part10Data {
  heroAnimationStyle: string;
  primaryAccentColor: string;
  colorTemperature: "cool" | "warm" | "neutral";
  visualEnergy: number;
  imageryStyles: string[];
}

// ─── Part 11: AKC Relationship ────────────────────────────────────────────────
export interface Part11Data {
  ackRelationshipClarity: string;
  ackCredibilityVsDistraction: string;
}

// ─── Part 12: Success Metrics ─────────────────────────────────────────────────
export interface Part12Data {
  successVisitorActions: string[];
  primaryConversionGoals: string[];
  benchmarkCareerVisit: number;
  benchmarkApplicationRate: number;
  benchmarkTimeOnSite: number;
  benchmarkPagesPerSession: number;
  benchmarkBounceRate: number;
  perfScrollDepth: number;
  perfHowItWorks: number;
  perfAnimationCompletion: number;
  perfCtaClickRate: number;
}

// ─── Part 13: Messaging & Copy Tone ──────────────────────────────────────────
export interface Part13Data {
  message1Complete: string;
  message2Complete: string;
  message3Complete: string;
  wordsRight: string[];
  wordsAvoid: string[];
  voiceToneAttributes: string[];
  sentenceStructure: "short" | "long" | "mixed";
  jargonLevel: "freely" | "sparingly" | "avoid";
}

// ─── Part 14: Rapid-Fire ──────────────────────────────────────────────────────
export interface Part14Data {
  gaudiOneWord: string;
  visitorFeeling: string;
  firstThought: string;
  misconception: string;
  mostExciting: string;
  superpower: string;
  fiveYearVision: string;
  techcrunchHeadline: string;
}

// ─── Part 15: Open-Ended ──────────────────────────────────────────────────────
export interface Part15Data {
  otherNotes: string;
  existingContentAssets: string[];
  contentStorageLocation: string;
  contentToCreate: string[];
  competitorsReferences: string;
}

// ─── Combined Form Data ───────────────────────────────────────────────────────
export interface FullFormData
  extends Part1Data,
    Part2Data,
    Part3Data,
    Part4Data,
    Part5Data,
    Part6Data,
    Part7Data,
    Part8Data,
    Part9Data,
    Part10Data,
    Part11Data,
    Part12Data,
    Part13Data,
    Part14Data,
    Part15Data {}

// ─── API Types ────────────────────────────────────────────────────────────────
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

// ─── Admin Types ──────────────────────────────────────────────────────────────
export interface AdminUserPublic {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

export interface ResponseListItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  completionPercentage: number;
  status: string;
  isReviewed: boolean;
  reviewStatus: string;
  lastPageVisited: number;
}

// ─── Form Navigation ──────────────────────────────────────────────────────────
export interface FormPage {
  route: string;
  part: number;
  pageWithinPart: number;
  partTitle: string;
  pageTitle: string;
  totalPageNumber: number;
}

export const FORM_PAGES: FormPage[] = [
  { route: "1-1", part: 1, pageWithinPart: 1, partTitle: "Story Foundation", pageTitle: "Origin Story", totalPageNumber: 1 },
  { route: "1-2", part: 1, pageWithinPart: 2, partTitle: "Story Foundation", pageTitle: "Timeline & Automation", totalPageNumber: 2 },
  { route: "2-1", part: 2, pageWithinPart: 1, partTitle: "Value Prop & Messaging", pageTitle: "Value Proposition", totalPageNumber: 3 },
  { route: "2-2", part: 2, pageWithinPart: 2, partTitle: "Value Prop & Messaging", pageTitle: "Capabilities & Output", totalPageNumber: 4 },
  { route: "2-3", part: 2, pageWithinPart: 3, partTitle: "Value Prop & Messaging", pageTitle: "Transformation Metrics", totalPageNumber: 5 },
  { route: "3-1", part: 3, pageWithinPart: 1, partTitle: "Brand Personality", pageTitle: "Vibe & Attributes", totalPageNumber: 6 },
  { route: "3-2", part: 3, pageWithinPart: 2, partTitle: "Brand Personality", pageTitle: "Tone Spectrum & Analogies", totalPageNumber: 7 },
  { route: "4-1", part: 4, pageWithinPart: 1, partTitle: "Narrative Direction", pageTitle: "Storytelling & Section Priority", totalPageNumber: 8 },
  { route: "5-1", part: 5, pageWithinPart: 1, partTitle: "Information Architecture", pageTitle: "Page Hierarchy", totalPageNumber: 9 },
  { route: "5-2", part: 5, pageWithinPart: 2, partTitle: "Information Architecture", pageTitle: "Homepage Sections", totalPageNumber: 10 },
  { route: "5-3", part: 5, pageWithinPart: 3, partTitle: "Information Architecture", pageTitle: "User Journeys", totalPageNumber: 11 },
  { route: "5-4", part: 5, pageWithinPart: 4, partTitle: "Information Architecture", pageTitle: "Navigation & CTAs", totalPageNumber: 12 },
  { route: "5-5", part: 5, pageWithinPart: 5, partTitle: "Information Architecture", pageTitle: "Content Depth", totalPageNumber: 13 },
  { route: "6-1", part: 6, pageWithinPart: 1, partTitle: "Conversion Strategy", pageTitle: "Conversion Goals", totalPageNumber: 14 },
  { route: "6-2", part: 6, pageWithinPart: 2, partTitle: "Conversion Strategy", pageTitle: "CTA Messaging", totalPageNumber: 15 },
  { route: "6-3", part: 6, pageWithinPart: 3, partTitle: "Conversion Strategy", pageTitle: "Objection Handling", totalPageNumber: 16 },
  { route: "6-4", part: 6, pageWithinPart: 4, partTitle: "Conversion Strategy", pageTitle: "Trust Signals", totalPageNumber: 17 },
  { route: "7-1", part: 7, pageWithinPart: 1, partTitle: "Technical Positioning", pageTitle: "AI Transparency & Framing", totalPageNumber: 18 },
  { route: "8-1", part: 8, pageWithinPart: 1, partTitle: "Proof & Credibility", pageTitle: "Assets & Metrics", totalPageNumber: 19 },
  { route: "9-1", part: 9, pageWithinPart: 1, partTitle: "Target Audience", pageTitle: "Candidate Profile", totalPageNumber: 20 },
  { route: "9-2", part: 9, pageWithinPart: 2, partTitle: "Target Audience", pageTitle: "Career Messaging", totalPageNumber: 21 },
  { route: "9-3", part: 9, pageWithinPart: 3, partTitle: "Target Audience", pageTitle: "Open Roles", totalPageNumber: 22 },
  { route: "10-1", part: 10, pageWithinPart: 1, partTitle: "Visual Direction", pageTitle: "Style & Color", totalPageNumber: 23 },
  { route: "11-1", part: 11, pageWithinPart: 1, partTitle: "AKC Relationship", pageTitle: "Brand Relationship", totalPageNumber: 24 },
  { route: "12-1", part: 12, pageWithinPart: 1, partTitle: "Success Metrics", pageTitle: "Goals & Benchmarks", totalPageNumber: 25 },
  { route: "13-1", part: 13, pageWithinPart: 1, partTitle: "Messaging & Copy", pageTitle: "Voice & Tone", totalPageNumber: 26 },
  { route: "14-1", part: 14, pageWithinPart: 1, partTitle: "Rapid-Fire", pageTitle: "Quick Impressions", totalPageNumber: 27 },
  { route: "15-1", part: 15, pageWithinPart: 1, partTitle: "Open-Ended", pageTitle: "Final Thoughts", totalPageNumber: 28 },
];

export const TOTAL_PAGES = FORM_PAGES.length;

export function getPageByRoute(route: string): FormPage | undefined {
  return FORM_PAGES.find((p) => p.route === route);
}

export function getPageByNumber(num: number): FormPage | undefined {
  return FORM_PAGES.find((p) => p.totalPageNumber === num);
}

export function getNextRoute(currentRoute: string): string | null {
  const current = getPageByRoute(currentRoute);
  if (!current) return null;
  const next = getPageByNumber(current.totalPageNumber + 1);
  return next ? next.route : null;
}

export function getPrevRoute(currentRoute: string): string | null {
  const current = getPageByRoute(currentRoute);
  if (!current) return null;
  const prev = getPageByNumber(current.totalPageNumber - 1);
  return prev ? prev.route : null;
}
