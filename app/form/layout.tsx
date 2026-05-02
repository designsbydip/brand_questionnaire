import { FormProvider } from "@/context/FormContext";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function FormSectionLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  let response = null;
  try {
    response = await prisma.gaudiResponse.findUnique({
      where: { userId: user.id }
    });
  } catch (error) {
    console.error("Database connection or query failed:", error);
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow border border-red-200 p-6">
          <h2 className="text-xl font-bold text-red-600 mb-2">Database Connection Error</h2>
          <p className="text-sm text-zinc-600 mb-4">
            The application failed to connect to your Supabase database, or the tables have not been created yet.
          </p>
          <div className="bg-red-50 text-red-900 p-3 rounded text-xs font-mono mb-4 max-h-48 overflow-auto">
            {error instanceof Error ? error.message : String(error)}
          </div>
          <p className="text-sm font-medium">How to fix this:</p>
          <ul className="list-disc pl-5 text-sm space-y-1 mt-2 text-zinc-700">
            <li>Ensure you added the correct <code>DATABASE_URL</code> to Vercel (and redeployed).</li>
            <li>Run <code>npx prisma db push</code> from your local terminal to create the tables in your Supabase project.</li>
          </ul>
        </div>
      </div>
    );
  }

  const SYSTEM_FIELDS = new Set([
    "id", "createdAt", "updatedAt", "userId",
    "completionPercentage", "status", "lastPageVisited",
    "isReviewed", "reviewStatus", "reviewedAt", "adminNotes",
  ]);
  const DATE_FIELDS = new Set(["gaudiStartDate"]);

  const initialData = response ? {
    responseId: response.id,
    data: Object.fromEntries(
      Object.entries(response)
        .filter(([k, v]) => v !== null && !SYSTEM_FIELDS.has(k))
        .map(([k, v]) => {
          if (DATE_FIELDS.has(k) && v instanceof Date) {
            return [k, v.toISOString().slice(0, 10)];
          }
          return [k, v];
        })
    )
  } : undefined;

  return (
    <FormProvider initialData={initialData}>
      {children}
    </FormProvider>
  );
}
