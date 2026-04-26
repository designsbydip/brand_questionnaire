import { z } from "zod";

// ─── Part 1 ────────────────────────────────────────────────────────────────────
export const Part1Schema = z.object({
  originStory: z.string().min(10, "Give us a bit more — at least a sentence or two.").max(500),
  ahaMoment: z.string().min(10, "A little more detail helps us tell this story well.").max(300),
  frustrationDescription: z.string().min(10, "Describe the pain point — even a sentence is enough.").max(300),
  gaudiStartDate: z.string().min(1, "Pick a date — even an approximate month works."),
  automation6MonthsAgo: z.coerce.number().min(0).max(100),
  currentAutomation: z.coerce.number().min(0).max(100),
  targetAutomation12Months: z.coerce.number().min(0).max(100),
});
export type Part1FormData = z.infer<typeof Part1Schema>;

// ─── Part 2 ────────────────────────────────────────────────────────────────────
export const MetricRowSchema = z.object({
  metric: z.string(),
  before: z.string(),
  after: z.string(),
  improvement: z.string().optional(),
});

export const Part2Schema = z.object({
  valuePropAudience: z.string().min(5, "Who are you building this for? Name your audience."),
  valuePropOutcome: z.string().min(5, "What outcome do they walk away with?"),
  valuePropMethod: z.string().min(5, "How does Gaudi make that happen?"),
  valuePropFraming: z.string().min(1, "Pick the framing that feels most natural."),
  capabilities: z.array(z.string().min(1)).min(1, "Add at least one capability Gaudi is known for."),
  aiHandles: z.string().min(10, "Tell us what the AI takes care of — even a rough list works."),
  humansHandle: z.string().min(10, "What do your engineers still own? Judgment, review, client relationships?"),
  outputTypes: z.array(z.string()).min(1, "Select at least one type of output Gaudi produces."),
  impactEngineers: z.string().min(5),
  impactCompany: z.string().min(5),
  impactClients: z.string().min(5),
  caseStudyExample: z.string().min(10, "Share one real example — even a rough one is fine."),
  metricsData: z.array(MetricRowSchema),
});
export type Part2FormData = z.infer<typeof Part2Schema>;

// ─── Part 3 ────────────────────────────────────────────────────────────────────
export const Part3Schema = z.object({
  vibeAttributes: z.array(z.string()).min(3, "Pick at least 3 — trust your gut here."),
  toneCasualToProfessional: z.coerce.number().min(1).max(7),
  tonePlayfulToSerious: z.coerce.number().min(1).max(7),
  toneBoldToUnderstated: z.coerce.number().min(1).max(7),
  toneStartupToEnterprise: z.coerce.number().min(1).max(7),
  companiesAdmired: z.string().min(1, "Name at least one brand whose voice you admire."),
  analogyCar: z.string().min(1, "Any car — just something that feels right."),
  analogyPerson: z.string().min(1, "Real or fictional, anyone who captures the vibe."),
  analogyBuilding: z.string().min(1, "Landmark, style, or building — your call."),
});
export type Part3FormData = z.infer<typeof Part3Schema>;

// ─── Part 4 ────────────────────────────────────────────────────────────────────
export const Part4Schema = z.object({
  storytellingDepth: z.enum(["subtle", "deep", "between"]),
  sectionPriority: z.array(z.string()).min(1, "Drag the sections into the order that makes sense to you."),
  heroFocus: z.string().min(1, "Pick what you'd want a first-time visitor to see first."),
});
export type Part4FormData = z.infer<typeof Part4Schema>;

// ─── Part 5 ────────────────────────────────────────────────────────────────────
export const HomepageSectionSchema = z.object({
  section: z.string(),
  choice: z.enum(["include", "maybe", "skip"]),
});

export const UserJourneySchema = z.object({
  landsOn: z.string().min(1),
  needsToSee: z.string().min(1),
  convertsAt: z.string().min(1),
});

export const ContentDepthItemSchema = z.object({
  page: z.string(),
  depth: z.enum(["light", "medium", "deep"]),
  wordCount: z.string().optional(),
});

export const Part5Schema = z.object({
  pageHierarchy: z.array(z.string()).min(1, "Drag the pages into your preferred order."),
  homepageSections: z.array(HomepageSectionSchema),
  homepagePriority: z.array(z.string()),
  journeyJobCandidate: UserJourneySchema,
  journeyAckSite: UserJourneySchema,
  journeyCompetitor: UserJourneySchema,
  navItems: z.array(z.string().min(1)).min(4, "Add at least 4 nav items — think of the pages you always want visible."),
  ctaHeader: z.string().min(1),
  ctaHero: z.string().min(1),
  ctaFooter: z.string().min(1),
  contentDepth: z.array(ContentDepthItemSchema),
});
export type Part5FormData = z.infer<typeof Part5Schema>;

// ─── Part 6 ────────────────────────────────────────────────────────────────────
export const ObjectionSchema = z.object({
  objection: z.string().min(1),
  counter: z.string().min(1),
});

export const Part6Schema = z.object({
  conversionGoals: z.array(z.string()).min(1, "Choose at least one — what's the #1 thing you want visitors to do?"),
  ctaCareersButton: z.string().min(1),
  ctaCareersSupporting: z.string().min(1),
  ctaContactButton: z.string().min(1),
  ctaContactSupporting: z.string().min(1),
  objections: z.array(ObjectionSchema).min(1),
  trustSignals: z.array(z.string()).min(1, "Pick what you actually have — even one is a start."),
  trustSignalsLocation: z.string().min(1),
});
export type Part6FormData = z.infer<typeof Part6Schema>;

// ─── Part 7 ────────────────────────────────────────────────────────────────────
export const Part7Schema = z.object({
  aiTransparencyLevel: z.string().min(1),
  proprietaryVsOpen: z.string().min(1),
  humanAiFraming: z.string().min(1),
});
export type Part7FormData = z.infer<typeof Part7Schema>;

// ─── Part 8 ────────────────────────────────────────────────────────────────────
export const Part8Schema = z.object({
  availableAssets: z.array(z.string()).min(1, "Tick what you have — anything helps us hit the ground running."),
  projectsAutomated: z.coerce.number().min(0),
  hoursSavedPerProject: z.coerce.number().min(0),
  accuracyImprovement: z.coerce.number().min(0).max(100),
  currentAutomationPercent: z.coerce.number().min(0).max(100),
  targetAutomationPercent: z.coerce.number().min(0).max(100),
  teamSize: z.coerce.number().min(1),
});
export type Part8FormData = z.infer<typeof Part8Schema>;

// ─── Part 9 ────────────────────────────────────────────────────────────────────
export const OpenRoleSchema = z.object({
  role: z.string().min(1),
  level: z.string().min(1),
  skills: z.string().min(1),
});

export const Part9Schema = z.object({
  candidateExperienceLevel: z.string().min(1),
  candidateTechnicalSkills: z.string().min(1),
  candidateNiceToHave: z.string().min(1),
  candidateCultureFit: z.string().min(1),
  candidateMotivations: z.array(z.string()).min(1),
  candidateQuestions: z.array(z.string().min(1)).length(3),
  careerUniqueSelling: z.array(z.string().min(1)).length(3),
  careerProblemsToSolve: z.string().min(1),
  careerGrowth: z.string().min(1),
  officeLocation: z.string().min(1),
  remotePolicy: z.enum(["Full Remote", "Hybrid", "On-site"]),
  careerTeamSize: z.coerce.number().min(1),
  careerVibe: z.string().min(1),
  careerPerks: z.string().min(1),
  openRoles: z.array(OpenRoleSchema),
  noOpeningsHandling: z.array(z.string()).min(1),
});
export type Part9FormData = z.infer<typeof Part9Schema>;

// ─── Part 10 ───────────────────────────────────────────────────────────────────
export const Part10Schema = z.object({
  heroAnimationStyle: z.string().min(1),
  primaryAccentColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Use a 6-digit hex code, like #1A2B3C."),
  colorTemperature: z.enum(["cool", "warm", "neutral"]),
  visualEnergy: z.coerce.number().min(1).max(7),
  imageryStyles: z.array(z.string()).min(1),
});
export type Part10FormData = z.infer<typeof Part10Schema>;

// ─── Part 11 ───────────────────────────────────────────────────────────────────
export const Part11Schema = z.object({
  ackRelationshipClarity: z.string().min(1),
  ackCredibilityVsDistraction: z.string().min(1),
});
export type Part11FormData = z.infer<typeof Part11Schema>;

// ─── Part 12 ───────────────────────────────────────────────────────────────────
export const Part12Schema = z.object({
  successVisitorActions: z.array(z.string()).min(1),
  primaryConversionGoals: z.array(z.string().min(1)).length(3),
  benchmarkCareerVisit: z.coerce.number().min(0).max(100),
  benchmarkApplicationRate: z.coerce.number().min(0).max(100),
  benchmarkTimeOnSite: z.coerce.number().min(0),
  benchmarkPagesPerSession: z.coerce.number().min(0),
  benchmarkBounceRate: z.coerce.number().min(0).max(100),
  perfScrollDepth: z.coerce.number().min(0).max(100),
  perfHowItWorks: z.coerce.number().min(0).max(100),
  perfAnimationCompletion: z.coerce.number().min(0).max(100),
  perfCtaClickRate: z.coerce.number().min(0).max(100),
});
export type Part12FormData = z.infer<typeof Part12Schema>;

// ─── Part 13 ───────────────────────────────────────────────────────────────────
export const Part13Schema = z.object({
  message1Complete: z.string().min(1),
  message2Complete: z.string().min(1),
  message3Complete: z.string().min(1),
  wordsRight: z.array(z.string().min(1)).length(5),
  wordsAvoid: z.array(z.string().min(1)).length(5),
  voiceToneAttributes: z.array(z.string()).min(1),
  sentenceStructure: z.enum(["short", "long", "mixed"]),
  jargonLevel: z.enum(["freely", "sparingly", "avoid"]),
});
export type Part13FormData = z.infer<typeof Part13Schema>;

// ─── Part 14 ───────────────────────────────────────────────────────────────────
export const Part14Schema = z.object({
  gaudiOneWord: z.string().min(1).max(30),
  visitorFeeling: z.string().min(1),
  firstThought: z.string().min(1),
  misconception: z.string().min(1),
  mostExciting: z.string().min(1),
  superpower: z.string().min(1),
  fiveYearVision: z.string().min(1),
  techcrunchHeadline: z.string().min(1),
});
export type Part14FormData = z.infer<typeof Part14Schema>;

// ─── Part 15 ───────────────────────────────────────────────────────────────────
export const Part15Schema = z.object({
  otherNotes: z.string().optional(),
  existingContentAssets: z.array(z.string()),
  contentStorageLocation: z.string().optional(),
  contentToCreate: z.array(z.string()),
  competitorsReferences: z.string().optional(),
});
export type Part15FormData = z.infer<typeof Part15Schema>;
