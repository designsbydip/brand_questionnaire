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

  const response = await prisma.gaudiResponse.findUnique({
    where: { userId: user.id }
  });

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
