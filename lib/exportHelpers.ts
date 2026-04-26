// CSV/JSON export helpers for admin panel

type ResponseRecord = Record<string, unknown>;

// Flatten a nested object into dot-notation keys for CSV
function flattenObject(obj: ResponseRecord, prefix = ""): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value === null || value === undefined) {
      result[fullKey] = "";
    } else if (Array.isArray(value)) {
      result[fullKey] = value.join("; ");
    } else if (typeof value === "object") {
      Object.assign(result, flattenObject(value as ResponseRecord, fullKey));
    } else {
      result[fullKey] = String(value);
    }
  }
  return result;
}

export function generateCSV(responses: ResponseRecord[]): string {
  if (responses.length === 0) return "";
  const flattened = responses.map((r) => flattenObject(r));
  const headers = Array.from(new Set(flattened.flatMap((r) => Object.keys(r))));
  const csvRows = [
    headers.join(","),
    ...flattened.map((row) =>
      headers
        .map((h) => {
          const val = row[h] ?? "";
          return `"${val.replace(/"/g, '""')}"`;
        })
        .join(",")
    ),
  ];
  return csvRows.join("\n");
}

export function generateJSON(responses: ResponseRecord[]): string {
  return JSON.stringify(responses, null, 2);
}

export function calculateCompletionPercentage(formData: ResponseRecord): number {
  const requiredFields = [
    "originStory", "ahaMoment", "frustrationDescription",
    "valuePropAudience", "valuePropOutcome", "valuePropMethod",
    "vibeAttributes", "storytellingDepth",
    "navItems", "ctaHeader",
    "conversionGoals", "ctaCareersButton",
    "aiTransparencyLevel",
    "availableAssets",
    "candidateExperienceLevel",
    "heroAnimationStyle",
    "ackRelationshipClarity",
    "successVisitorActions",
    "message1Complete",
    "gaudiOneWord",
  ];
  const filled = requiredFields.filter((f) => {
    const val = formData[f];
    if (Array.isArray(val)) return val.length > 0;
    return val !== null && val !== undefined && val !== "";
  });
  return Math.round((filled.length / requiredFields.length) * 100);
}
