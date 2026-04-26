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
    // We could return a specific error UI here, but for now we'll just log it
    // and let the user see the exact issue.
    throw new Error("Database error: Ensure the database has been migrated and DATABASE_URL is correct.");
  }

  const initialData = response ? {
    responseId: response.id,
    data: Object.fromEntries(
      Object.entries(response).filter(([_, v]) => v !== null)
    )
  } : undefined;

  return (
    <FormProvider initialData={initialData}>
      {children}
    </FormProvider>
  );
}
