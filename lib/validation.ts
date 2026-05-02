import { z } from "zod";

// ─── Part 1 ────────────────────────────────────────────────────────────────────
export const Part1Schema = z.object({
  originStory: z.string({
    required_error: "Tell us the story of how Gaudi came to be.",
    invalid_type_error: "This should be text.",
  }).min(10, "Give us a bit more — at least a sentence or two.").max(500),
  ahaMoment: z.string({
    required_error: "What was the 'aha' moment that sparked the idea?",
    invalid_type_error: "This should be text.",
  }).min(10, "A little more detail helps us tell this story well.").max(300),
  frustrationDescription: z.string({
    required_error: "Describe the pain point that Gaudi solves.",
    invalid_type_error: "This should be text.",
  }).min(10, "Describe the pain point — even a sentence is enough.").max(300),
  gaudiStartDate: z.string({
    required_error: "Pick a date — even an approximate month works.",
  }).min(1, "Pick a date — even an approximate month works."),
  automation6MonthsAgo: z.coerce.number().min(0).max(100),
  currentAutomation: z.coerce.number().min(0).max(100),
  targetAutomation12Months: z.coerce.number().min(0).max(100),
});
export type Part1FormData = z.infer<typeof Part1Schema>;

// ─── Part 2 ────────────────────────────────────────────────────────────────────
export const MetricRowSchema = z.object({
  metric: z.string({
    required_error: "What metric?",
    invalid_type_error: "This should be text.",
  }),
  before: z.string({
    required_error: "What was the before value?",
    invalid_type_error: "This should be text.",
  }),
  after: z.string({
    required_error: "What was the after value?",
    invalid_type_error: "This should be text.",
  }),
  improvement: z.string({
    invalid_type_error: "This should be text.",
  }).optional(),
});

export const Part2Schema = z.object({
  valuePropAudience: z.string({
    required_error: "Who are you building this for? Name your audience.",
    invalid_type_error: "This should be text.",
  }).min(5, "Who are you building this for? Name your audience."),
  valuePropOutcome: z.string({
    required_error: "What outcome do they walk away with?",
    invalid_type_error: "This should be text.",
  }).min(5, "What outcome do they walk away with?"),
  valuePropMethod: z.string({
    required_error: "How does Gaudi make that happen?",
    invalid_type_error: "This should be text.",
  }).min(5, "How does Gaudi make that happen?"),
  valuePropFraming: z.string({
    required_error: "Pick the framing that feels most natural.",
    invalid_type_error: "This should be text.",
  }).min(1, "Pick the framing that feels most natural."),
  capabilities: z.array(z.string().min(1)).min(1, "Add at least one capability Gaudi is known for."),
  aiHandles: z.string({
    required_error: "Tell us what the AI takes care of — even a rough list works.",
    invalid_type_error: "This should be text.",
  }).min(10, "Tell us what the AI takes care of — even a rough list works."),
  humansHandle: z.string({
    required_error: "What do your engineers still own? Judgment, review, client relationships?",
    invalid_type_error: "This should be text.",
  }).min(10, "What do your engineers still own? Judgment, review, client relationships?"),
  outputTypes: z.array(z.string()).min(1, "Select at least one type of output Gaudi produces."),
  impactEngineers: z.string({
    required_error: "How does Gaudi impact your engineers?",
    invalid_type_error: "This should be text.",
  }).min(5, "Tell us how Gaudi impacts your engineers."),
  impactCompany: z.string({
    required_error: "How does Gaudi impact your company?",
    invalid_type_error: "This should be text.",
  }).min(5, "Tell us how Gaudi impacts your company."),
  impactClients: z.string({
    required_error: "How does Gaudi impact your clients?",
    invalid_type_error: "This should be text.",
  }).min(5, "Tell us how Gaudi impacts your clients."),
  caseStudyExample: z.string({
    required_error: "Share one real example — even a rough one is fine.",
    invalid_type_error: "This should be text.",
  }).min(10, "Share one real example — even a rough one is fine."),
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
  companiesAdmired: z.string({
    required_error: "Name at least one brand whose voice you admire.",
    invalid_type_error: "This should be text.",
  }).min(1, "Name at least one brand whose voice you admire."),
  analogyCar: z.string({
    required_error: "What car feels right to you? Any car works.",
    invalid_type_error: "This should be text.",
  }).min(1, "What car feels right to you?"),
  analogyPerson: z.string({
    required_error: "Anyone who captures the vibe — real or fictional.",
    invalid_type_error: "This should be text.",
  }).min(1, "Who captures the Gaudi vibe?"),
  analogyBuilding: z.string({
    required_error: "Landmark, style, or building — what feels right?",
    invalid_type_error: "This should be text.",
  }).min(1, "What building or landmark fits?"),
});
export type Part3FormData = z.infer<typeof Part3Schema>;

// ─── Part 4 ────────────────────────────────────────────────────────────────────
export const Part4Schema = z.object({
  storytellingDepth: z.enum(["subtle", "deep", "between"], {
    required_error: "Pick how deep Gaudi's story should go.",
    invalid_type_error: "Select one option.",
  }),
  sectionPriority: z.array(z.string()).min(1, "Drag the sections into the order that makes sense to you."),
  heroFocus: z.string({
    required_error: "Pick what you'd want a first-time visitor to see first.",
    invalid_type_error: "This should be text.",
  }).min(1, "Pick what you'd want a first-time visitor to see first."),
});
export type Part4FormData = z.infer<typeof Part4Schema>;

// ─── Part 5 ────────────────────────────────────────────────────────────────────
export const HomepageSectionSchema = z.object({
  section: z.string({
    required_error: "What section?",
    invalid_type_error: "This should be text.",
  }),
  choice: z.enum(["include", "maybe", "skip"], {
    required_error: "Include, maybe, or skip?",
    invalid_type_error: "Select one option.",
  }),
});

export const UserJourneySchema = z.object({
  landsOn: z.string({
    required_error: "Where does this visitor land?",
    invalid_type_error: "This should be text.",
  }).min(1, "Where does this visitor land?"),
  needsToSee: z.string({
    required_error: "What does this visitor need to see?",
    invalid_type_error: "This should be text.",
  }).min(1, "What does this visitor need to see?"),
  convertsAt: z.string({
    required_error: "Where do they convert?",
    invalid_type_error: "This should be text.",
  }).min(1, "Where do they convert?"),
});

export const ContentDepthItemSchema = z.object({
  page: z.string({
    required_error: "Which page?",
    invalid_type_error: "This should be text.",
  }),
  depth: z.enum(["light", "medium", "deep"], {
    required_error: "How deep should this page go?",
    invalid_type_error: "Select one option.",
  }),
  wordCount: z.string().optional(),
});

export const Part5Schema = z.object({
  pageHierarchy: z.array(z.string()).min(1, "Drag the pages into your preferred order."),
  homepageSections: z.array(HomepageSectionSchema),
  homepagePriority: z.array(z.string()),
  journeyJobCandidate: UserJourneySchema,
  journeyAckSite: UserJourneySchema,
  journeyCompetitor: UserJourneySchema,
  navItems: z.array(z.string({
    required_error: "Add a nav item.",
    invalid_type_error: "This should be text.",
  }).min(1, "Nav item can't be empty.")).min(4, "Add at least 4 nav items — think of the pages you always want visible."),
  ctaHeader: z.string({
    required_error: "What should the header CTA say?",
    invalid_type_error: "This should be text.",
  }).min(1, "What should the header CTA say?"),
  ctaHero: z.string({
    required_error: "What should the hero CTA say?",
    invalid_type_error: "This should be text.",
  }).min(1, "What should the hero CTA say?"),
  ctaFooter: z.string({
    required_error: "What should the footer CTA say?",
    invalid_type_error: "This should be text.",
  }).min(1, "What should the footer CTA say?"),
  contentDepth: z.array(ContentDepthItemSchema),
});
export type Part5FormData = z.infer<typeof Part5Schema>;

// ─── Part 6 ────────────────────────────────────────────────────────────────────
export const ObjectionSchema = z.object({
  objection: z.string({
    required_error: "What objection might visitors have?",
    invalid_type_error: "This should be text.",
  }).min(1, "What objection might visitors have?"),
  counter: z.string({
    required_error: "How do you counter this objection?",
    invalid_type_error: "This should be text.",
  }).min(1, "How do you counter this objection?"),
});

export const Part6Schema = z.object({
  conversionGoals: z.array(z.string()).min(1, "Choose at least one — what's the #1 thing you want visitors to do?"),
  ctaCareersButton: z.string({
    required_error: "What should the careers CTA button say?",
    invalid_type_error: "This should be text.",
  }).min(1, "What should the careers CTA button say?"),
  ctaCareersSupporting: z.string({
    required_error: "What's the supporting text for the careers CTA?",
    invalid_type_error: "This should be text.",
  }).min(1, "What's the supporting text for the careers CTA?"),
  ctaContactButton: z.string({
    required_error: "What should the contact CTA button say?",
    invalid_type_error: "This should be text.",
  }).min(1, "What should the contact CTA button say?"),
  ctaContactSupporting: z.string({
    required_error: "What's the supporting text for the contact CTA?",
    invalid_type_error: "This should be text.",
  }).min(1, "What's the supporting text for the contact CTA?"),
  objections: z.array(ObjectionSchema).min(1),
  trustSignals: z.array(z.string()).min(1, "Pick what you actually have — even one is a start."),
  trustSignalsLocation: z.string({
    required_error: "Where should trust signals appear on the page?",
    invalid_type_error: "This should be text.",
  }).min(1, "Where should trust signals appear?"),
});
export type Part6FormData = z.infer<typeof Part6Schema>;

// ─── Part 7 ────────────────────────────────────────────────────────────────────
export const Part7Schema = z.object({
  aiTransparencyLevel: z.string({
    required_error: "How transparent should you be about AI?",
    invalid_type_error: "This should be text.",
  }).min(1, "How transparent should you be about AI?"),
  proprietaryVsOpen: z.string({
    required_error: "Proprietary or open-source approach?",
    invalid_type_error: "This should be text.",
  }).min(1, "Should you emphasize proprietary or open-source?"),
  humanAiFraming: z.string({
    required_error: "How should you frame human-AI collaboration?",
    invalid_type_error: "This should be text.",
  }).min(1, "How should you frame human-AI collaboration?"),
});
export type Part7FormData = z.infer<typeof Part7Schema>;

// ─── Part 8 ────────────────────────────────────────────────────────────────────
export const Part8Schema = z.object({
  availableAssets: z.array(z.string()).min(1, "Tick what you have — anything helps us hit the ground running."),
  projectsAutomated: z.coerce.number({
    required_error: "How many projects has Gaudi automated?",
    invalid_type_error: "This should be a number.",
  }).min(0, "Enter a number 0 or greater."),
  hoursSavedPerProject: z.coerce.number({
    required_error: "How many hours are saved per project?",
    invalid_type_error: "This should be a number.",
  }).min(0, "Enter a number 0 or greater."),
  accuracyImprovement: z.coerce.number({
    required_error: "What's the accuracy improvement?",
    invalid_type_error: "This should be a number.",
  }).min(0).max(100, "Enter a percentage between 0 and 100."),
  currentAutomationPercent: z.coerce.number({
    required_error: "What's the current automation level?",
    invalid_type_error: "This should be a number.",
  }).min(0).max(100, "Enter a percentage between 0 and 100."),
  targetAutomationPercent: z.coerce.number({
    required_error: "What's your target automation level?",
    invalid_type_error: "This should be a number.",
  }).min(0).max(100, "Enter a percentage between 0 and 100."),
  teamSize: z.coerce.number({
    required_error: "What's your team size?",
    invalid_type_error: "This should be a number.",
  }).min(1, "Enter at least 1."),
});
export type Part8FormData = z.infer<typeof Part8Schema>;

// ─── Part 9 ────────────────────────────────────────────────────────────────────
export const OpenRoleSchema = z.object({
  role: z.string({
    required_error: "What's the role title?",
    invalid_type_error: "This should be text.",
  }).min(1, "What's the role title?"),
  level: z.string({
    required_error: "What level is this role?",
    invalid_type_error: "This should be text.",
  }).min(1, "What level is this role?"),
  skills: z.string({
    required_error: "What key skills are needed?",
    invalid_type_error: "This should be text.",
  }).min(1, "What key skills are needed?"),
});

export const Part9Schema = z.object({
  candidateExperienceLevel: z.string({
    required_error: "What experience level are you looking for?",
    invalid_type_error: "This should be text.",
  }).min(1, "What experience level are you looking for?"),
  candidateTechnicalSkills: z.string({
    required_error: "What technical skills matter most?",
    invalid_type_error: "This should be text.",
  }).min(1, "What technical skills matter most?"),
  candidateNiceToHave: z.string({
    required_error: "What would be nice to have?",
    invalid_type_error: "This should be text.",
  }).min(1, "What would be nice to have?"),
  candidateCultureFit: z.string({
    required_error: "What makes someone a good culture fit?",
    invalid_type_error: "This should be text.",
  }).min(1, "What makes someone a good culture fit?"),
  candidateMotivations: z.array(z.string()).min(1, "Add at least one thing that motivates candidates."),
  candidateQuestions: z.array(z.string({
    required_error: "What question would you ask?",
    invalid_type_error: "This should be text.",
  }).min(1, "Questions can't be empty.")).length(3, "Add exactly 3 interview questions."),
  careerUniqueSelling: z.array(z.string({
    required_error: "What's unique about working here?",
    invalid_type_error: "This should be text.",
  }).min(1, "Selling points can't be empty.")).length(3, "Add exactly 3 unique selling points."),
  careerProblemsToSolve: z.string({
    required_error: "What problems does the team solve?",
    invalid_type_error: "This should be text.",
  }).min(1, "What problems does the team solve?"),
  careerGrowth: z.string({
    required_error: "How can people grow in this role?",
    invalid_type_error: "This should be text.",
  }).min(1, "How can people grow in this role?"),
  officeLocation: z.string({
    required_error: "Where is your office located?",
    invalid_type_error: "This should be text.",
  }).min(1, "Where is your office located?"),
  remotePolicy: z.enum(["Full Remote", "Hybrid", "On-site"], {
    required_error: "What's your remote policy?",
    invalid_type_error: "Select one option.",
  }),
  careerTeamSize: z.coerce.number({
    required_error: "How big is your team?",
    invalid_type_error: "This should be a number.",
  }).min(1, "Enter at least 1."),
  careerVibe: z.string({
    required_error: "Describe your team vibe in one sentence.",
    invalid_type_error: "This should be text.",
  }).min(1, "Describe your team vibe."),
  careerPerks: z.string({
    required_error: "What perks and benefits do you offer?",
    invalid_type_error: "This should be text.",
  }).min(1, "What perks and benefits do you offer?"),
  openRoles: z.array(OpenRoleSchema),
  noOpeningsHandling: z.array(z.string()).min(1, "Select at least one option."),
});
export type Part9FormData = z.infer<typeof Part9Schema>;

// ─── Part 10 ───────────────────────────────────────────────────────────────────
export const Part10Schema = z.object({
  heroAnimationStyle: z.string({
    required_error: "What animation style appeals to you?",
    invalid_type_error: "This should be text.",
  }).min(1, "What animation style appeals to you?"),
  primaryAccentColor: z.string({
    required_error: "Pick your primary accent color.",
    invalid_type_error: "This should be text.",
  }).regex(/^#[0-9A-Fa-f]{6}$/, "Use a 6-digit hex code, like #1A2B3C."),
  colorTemperature: z.enum(["cool", "warm", "neutral"], {
    required_error: "Is your color palette cool, warm, or neutral?",
    invalid_type_error: "Select one option.",
  }),
  visualEnergy: z.coerce.number({
    required_error: "Rate the visual energy level.",
    invalid_type_error: "This should be a number.",
  }).min(1).max(7),
  imageryStyles: z.array(z.string()).min(1, "Pick at least one imagery style."),
});
export type Part10FormData = z.infer<typeof Part10Schema>;

// ─── Part 11 ───────────────────────────────────────────────────────────────────
export const Part11Schema = z.object({
  ackRelationshipClarity: z.string({
    required_error: "How should you clarify the relationship?",
    invalid_type_error: "This should be text.",
  }).min(1, "How should you clarify the relationship?"),
  ackCredibilityVsDistraction: z.string({
    required_error: "Credibility or distraction — what matters more?",
    invalid_type_error: "This should be text.",
  }).min(1, "Credibility or distraction?"),
});
export type Part11FormData = z.infer<typeof Part11Schema>;

// ─── Part 12 ───────────────────────────────────────────────────────────────────
export const Part12Schema = z.object({
  successVisitorActions: z.array(z.string()).min(1, "What does visitor success look like?"),
  primaryConversionGoals: z.array(z.string({
    required_error: "What's a conversion goal?",
    invalid_type_error: "This should be text.",
  }).min(1, "Goals can't be empty.")).length(3, "Add exactly 3 primary conversion goals."),
  benchmarkCareerVisit: z.coerce.number({
    required_error: "Benchmark: career page visits",
    invalid_type_error: "This should be a number.",
  }).min(0).max(100),
  benchmarkApplicationRate: z.coerce.number({
    required_error: "Benchmark: application rate",
    invalid_type_error: "This should be a number.",
  }).min(0).max(100),
  benchmarkTimeOnSite: z.coerce.number({
    required_error: "Benchmark: average time on site",
    invalid_type_error: "This should be a number.",
  }).min(0),
  benchmarkPagesPerSession: z.coerce.number({
    required_error: "Benchmark: pages per session",
    invalid_type_error: "This should be a number.",
  }).min(0),
  benchmarkBounceRate: z.coerce.number({
    required_error: "Benchmark: bounce rate",
    invalid_type_error: "This should be a number.",
  }).min(0).max(100),
  perfScrollDepth: z.coerce.number({
    required_error: "Performance target: scroll depth",
    invalid_type_error: "This should be a number.",
  }).min(0).max(100),
  perfHowItWorks: z.coerce.number({
    required_error: "Performance target: how it works completion",
    invalid_type_error: "This should be a number.",
  }).min(0).max(100),
  perfAnimationCompletion: z.coerce.number({
    required_error: "Performance target: animation completion",
    invalid_type_error: "This should be a number.",
  }).min(0).max(100),
  perfCtaClickRate: z.coerce.number({
    required_error: "Performance target: CTA click rate",
    invalid_type_error: "This should be a number.",
  }).min(0).max(100),
});
export type Part12FormData = z.infer<typeof Part12Schema>;

// ─── Part 13 ───────────────────────────────────────────────────────────────────
export const Part13Schema = z.object({
  message1Complete: z.string({
    required_error: "Complete the first message.",
    invalid_type_error: "This should be text.",
  }).min(1, "Complete the first message."),
  message2Complete: z.string({
    required_error: "Complete the second message.",
    invalid_type_error: "This should be text.",
  }).min(1, "Complete the second message."),
  message3Complete: z.string({
    required_error: "Complete the third message.",
    invalid_type_error: "This should be text.",
  }).min(1, "Complete the third message."),
  wordsRight: z.array(z.string({
    required_error: "Add a word.",
    invalid_type_error: "This should be text.",
  }).min(1, "Words can't be empty.")).length(5, "Add exactly 5 words that feel right."),
  wordsAvoid: z.array(z.string({
    required_error: "Add a word to avoid.",
    invalid_type_error: "This should be text.",
  }).min(1, "Words can't be empty.")).length(5, "Add exactly 5 words to avoid."),
  voiceToneAttributes: z.array(z.string()).min(1, "Pick at least one voice/tone attribute."),
  sentenceStructure: z.enum(["short", "long", "mixed"], {
    required_error: "Short, long, or mixed sentence structure?",
    invalid_type_error: "Select one option.",
  }),
  jargonLevel: z.enum(["freely", "sparingly", "avoid"], {
    required_error: "How much jargon is right?",
    invalid_type_error: "Select one option.",
  }),
});
export type Part13FormData = z.infer<typeof Part13Schema>;

// ─── Part 14 ───────────────────────────────────────────────────────────────────
export const Part14Schema = z.object({
  gaudiOneWord: z.string({
    required_error: "Describe Gaudi in one word.",
    invalid_type_error: "This should be text.",
  }).min(1).max(30, "Keep it to 30 characters or less."),
  visitorFeeling: z.string({
    required_error: "How should visitors feel?",
    invalid_type_error: "This should be text.",
  }).min(1, "How should visitors feel?"),
  firstThought: z.string({
    required_error: "What's the first thought visitors should have?",
    invalid_type_error: "This should be text.",
  }).min(1, "What's the first thought?"),
  misconception: z.string({
    required_error: "What misconception should be corrected?",
    invalid_type_error: "This should be text.",
  }).min(1, "What misconception should be corrected?"),
  mostExciting: z.string({
    required_error: "What's most exciting about Gaudi?",
    invalid_type_error: "This should be text.",
  }).min(1, "What's most exciting?"),
  superpower: z.string({
    required_error: "What's Gaudi's superpower?",
    invalid_type_error: "This should be text.",
  }).min(1, "What's Gaudi's superpower?"),
  fiveYearVision: z.string({
    required_error: "What's the 5-year vision for Gaudi?",
    invalid_type_error: "This should be text.",
  }).min(1, "What's the 5-year vision?"),
  techcrunchHeadline: z.string({
    required_error: "What would the TechCrunch headline be?",
    invalid_type_error: "This should be text.",
  }).min(1, "What would the TechCrunch headline be?"),
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
