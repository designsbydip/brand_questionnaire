import { z } from "zod";

// ─── Part 1 ────────────────────────────────────────────────────────────────────
export const Part1Schema = z.object({
  originStory: z.string().min(10, "Tell us the story of how Gaudi came to be — at least a sentence or two.").max(500),
  ahaMoment: z.string().min(10, "What was the 'aha' moment that sparked the idea? A little more detail helps.").max(300),
  frustrationDescription: z.string().min(10, "Describe the pain point that Gaudi solves — even a sentence is enough.").max(300),
  gaudiStartDate: z.string().min(1, "Pick a date — even an approximate month works."),
  automation6MonthsAgo: z.coerce.number().min(0).max(100),
  currentAutomation: z.coerce.number().min(0).max(100),
  targetAutomation12Months: z.coerce.number().min(0).max(100),
});
export type Part1FormData = z.infer<typeof Part1Schema>;

// ─── Part 2 ────────────────────────────────────────────────────────────────────
export const MetricRowSchema = z.object({
  metric: z.string().min(1, "What metric?"),
  before: z.string().min(1, "What was the before value?"),
  after: z.string().min(1, "What was the after value?"),
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
  impactEngineers: z.string().min(5, "How does Gaudi impact your engineers?"),
  impactCompany: z.string().min(5, "How does Gaudi impact your company?"),
  impactClients: z.string().min(5, "How does Gaudi impact your clients?"),
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
  analogyCar: z.string().min(1, "What car feels right to you?"),
  analogyPerson: z.string().min(1, "Who captures the Gaudi vibe?"),
  analogyBuilding: z.string().min(1, "What building or landmark fits?"),
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
  section: z.string().min(1, "What section?"),
  choice: z.enum(["include", "maybe", "skip"]),
});

export const UserJourneySchema = z.object({
  landsOn: z.string().min(1, "Where does this visitor land?"),
  needsToSee: z.string().min(1, "What does this visitor need to see?"),
  convertsAt: z.string().min(1, "Where do they convert?"),
});

export const ContentDepthItemSchema = z.object({
  page: z.string().min(1, "Which page?"),
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
  navItems: z.array(z.string().min(1, "Nav item can't be empty.")).min(4, "Add at least 4 nav items — think of the pages you always want visible."),
  ctaHeader: z.string().min(1, "What should the header CTA say?"),
  ctaHero: z.string().min(1, "What should the hero CTA say?"),
  ctaFooter: z.string().min(1, "What should the footer CTA say?"),
  contentDepth: z.array(ContentDepthItemSchema),
});
export type Part5FormData = z.infer<typeof Part5Schema>;

// ─── Part 6 ────────────────────────────────────────────────────────────────────
export const ObjectionSchema = z.object({
  objection: z.string().min(1, "What objection might visitors have?"),
  counter: z.string().min(1, "How do you counter this objection?"),
});

export const Part6Schema = z.object({
  conversionGoals: z.array(z.string()).min(1, "Choose at least one — what's the #1 thing you want visitors to do?"),
  ctaCareersButton: z.string().min(1, "What should the careers CTA button say?"),
  ctaCareersSupporting: z.string().min(1, "What's the supporting text for the careers CTA?"),
  ctaContactButton: z.string().min(1, "What should the contact CTA button say?"),
  ctaContactSupporting: z.string().min(1, "What's the supporting text for the contact CTA?"),
  objections: z.array(ObjectionSchema).min(1),
  trustSignals: z.array(z.string()).min(1, "Pick what you actually have — even one is a start."),
  trustSignalsLocation: z.string().min(1, "Where should trust signals appear?"),
});
export type Part6FormData = z.infer<typeof Part6Schema>;

// ─── Part 7 ────────────────────────────────────────────────────────────────────
export const Part7Schema = z.object({
  aiTransparencyLevel: z.string().min(1, "How transparent should you be about AI?"),
  proprietaryVsOpen: z.string().min(1, "Should you emphasize proprietary or open-source?"),
  humanAiFraming: z.string().min(1, "How should you frame human-AI collaboration?"),
});
export type Part7FormData = z.infer<typeof Part7Schema>;

// ─── Part 8 ────────────────────────────────────────────────────────────────────
export const Part8Schema = z.object({
  availableAssets: z.array(z.string()).min(1, "Tick what you have — anything helps us hit the ground running."),
  projectsAutomated: z.coerce.number().min(0, "How many projects has Gaudi automated? (0 or greater)"),
  hoursSavedPerProject: z.coerce.number().min(0, "How many hours are saved per project? (0 or greater)"),
  accuracyImprovement: z.coerce.number().min(0).max(100, "What's the accuracy improvement? (0-100%)"),
  currentAutomationPercent: z.coerce.number().min(0).max(100, "What's the current automation level? (0-100%)"),
  targetAutomationPercent: z.coerce.number().min(0).max(100, "What's your target automation level? (0-100%)"),
  teamSize: z.coerce.number().min(1, "What's your team size? (at least 1)"),
});
export type Part8FormData = z.infer<typeof Part8Schema>;

// ─── Part 9 ────────────────────────────────────────────────────────────────────
export const OpenRoleSchema = z.object({
  role: z.string().min(1, "What's the role title?"),
  level: z.string().min(1, "What level is this role?"),
  skills: z.string().min(1, "What key skills are needed?"),
});

export const Part9Schema = z.object({
  candidateExperienceLevel: z.string().min(1, "What experience level are you looking for?"),
  candidateTechnicalSkills: z.string().min(1, "What technical skills matter most?"),
  candidateNiceToHave: z.string().min(1, "What would be nice to have?"),
  candidateCultureFit: z.string().min(1, "What makes someone a good culture fit?"),
  candidateMotivations: z.array(z.string()).min(1, "Add at least one thing that motivates candidates."),
  candidateQuestions: z.array(z.string().min(1, "Questions can't be empty.")).length(3, "Add exactly 3 interview questions."),
  careerUniqueSelling: z.array(z.string().min(1, "Selling points can't be empty.")).length(3, "Add exactly 3 unique selling points."),
  careerProblemsToSolve: z.string().min(1, "What problems does the team solve?"),
  careerGrowth: z.string().min(1, "How can people grow in this role?"),
  officeLocation: z.string().min(1, "Where is your office located?"),
  remotePolicy: z.enum(["Full Remote", "Hybrid", "On-site"]),
  careerTeamSize: z.coerce.number().min(1, "How big is your team? (at least 1)"),
  careerVibe: z.string().min(1, "Describe your team vibe."),
  careerPerks: z.string().min(1, "What perks and benefits do you offer?"),
  openRoles: z.array(OpenRoleSchema),
  noOpeningsHandling: z.array(z.string()).min(1, "Select at least one option."),
});
export type Part9FormData = z.infer<typeof Part9Schema>;

// ─── Part 10 ───────────────────────────────────────────────────────────────────
export const Part10Schema = z.object({
  heroAnimationStyle: z.string().min(1, "What animation style appeals to you?"),
  primaryAccentColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Pick your primary accent color (use a 6-digit hex code like #1A2B3C)."),
  colorTemperature: z.enum(["cool", "warm", "neutral"]),
  visualEnergy: z.coerce.number().min(1).max(7, "Rate the visual energy level (1-7)."),
  imageryStyles: z.array(z.string()).min(1, "Pick at least one imagery style."),
});
export type Part10FormData = z.infer<typeof Part10Schema>;

// ─── Part 11 ───────────────────────────────────────────────────────────────────
export const Part11Schema = z.object({
  ackRelationshipClarity: z.string().min(1, "How should you clarify the relationship?"),
  ackCredibilityVsDistraction: z.string().min(1, "Credibility or distraction — what matters more?"),
});
export type Part11FormData = z.infer<typeof Part11Schema>;

// ─── Part 12 ───────────────────────────────────────────────────────────────────
export const Part12Schema = z.object({
  successVisitorActions: z.array(z.string()).min(1, "What does visitor success look like?"),
  primaryConversionGoals: z.array(z.string().min(1, "Goals can't be empty.")).length(3, "Add exactly 3 primary conversion goals."),
  benchmarkCareerVisit: z.coerce.number().min(0).max(100, "Benchmark: career page visits (0-100%)"),
  benchmarkApplicationRate: z.coerce.number().min(0).max(100, "Benchmark: application rate (0-100%)"),
  benchmarkTimeOnSite: z.coerce.number().min(0, "Benchmark: average time on site (0 or greater)"),
  benchmarkPagesPerSession: z.coerce.number().min(0, "Benchmark: pages per session (0 or greater)"),
  benchmarkBounceRate: z.coerce.number().min(0).max(100, "Benchmark: bounce rate (0-100%)"),
  perfScrollDepth: z.coerce.number().min(0).max(100, "Performance target: scroll depth (0-100%)"),
  perfHowItWorks: z.coerce.number().min(0).max(100, "Performance target: how it works completion (0-100%)"),
  perfAnimationCompletion: z.coerce.number().min(0).max(100, "Performance target: animation completion (0-100%)"),
  perfCtaClickRate: z.coerce.number().min(0).max(100, "Performance target: CTA click rate (0-100%)"),
});
export type Part12FormData = z.infer<typeof Part12Schema>;

// ─── Part 13 ───────────────────────────────────────────────────────────────────
export const Part13Schema = z.object({
  message1Complete: z.string().min(1, "Complete the first message."),
  message2Complete: z.string().min(1, "Complete the second message."),
  message3Complete: z.string().min(1, "Complete the third message."),
  wordsRight: z.array(z.string().min(1, "Words can't be empty.")).length(5, "Add exactly 5 words that feel right."),
  wordsAvoid: z.array(z.string().min(1, "Words can't be empty.")).length(5, "Add exactly 5 words to avoid."),
  voiceToneAttributes: z.array(z.string()).min(1, "Pick at least one voice/tone attribute."),
  sentenceStructure: z.enum(["short", "long", "mixed"]),
  jargonLevel: z.enum(["freely", "sparingly", "avoid"]),
});
export type Part13FormData = z.infer<typeof Part13Schema>;

// ─── Part 14 ───────────────────────────────────────────────────────────────────
export const Part14Schema = z.object({
  gaudiOneWord: z.string().min(1).max(30, "Describe Gaudi in one word (30 characters or less)."),
  visitorFeeling: z.string().min(1, "How should visitors feel?"),
  firstThought: z.string().min(1, "What's the first thought visitors should have?"),
  misconception: z.string().min(1, "What misconception should be corrected?"),
  mostExciting: z.string().min(1, "What's most exciting about Gaudi?"),
  superpower: z.string().min(1, "What's Gaudi's superpower?"),
  fiveYearVision: z.string().min(1, "What's the 5-year vision for Gaudi?"),
  techcrunchHeadline: z.string().min(1, "What would the TechCrunch headline be?"),
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
