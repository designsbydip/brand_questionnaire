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
          <h2 className="text-xl font-bold text-red-600 mb-2">We couldn't reach your database</h2>
          <p className="text-sm text-zinc-600 mb-4">
            Something went wrong connecting to your Gaudi project database. This usually means the database hasn't been set up yet, or the connection details aren't configured.
          </p>
          <div className="bg-red-50 text-red-900 p-3 rounded text-xs font-mono mb-4 max-h-48 overflow-auto">
            {error instanceof Error ? error.message : String(error)}
          </div>
          <p className="text-sm font-medium">Next steps:</p>
          <ul className="list-disc pl-5 text-sm space-y-1 mt-2 text-zinc-700">
            <li>Make sure <code>DATABASE_URL</code> is added to Vercel's environment variables and the project is redeployed.</li>
            <li>If this is your first time setting up, run <code>npx prisma db push</code> from your terminal to create the tables.</li>
            <li>Contact your developer if you're not sure how to proceed.</li>
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
