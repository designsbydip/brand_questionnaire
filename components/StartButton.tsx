"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StartButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export function StartQuestionnaireButton({ children, className }: StartButtonProps) {
  const router = useRouter();

  return (
    <Button 
      className={cn("h-12 px-8 text-sm font-medium w-full sm:w-auto", className)}
      onClick={() => router.push("/login")}
    >
      {children || "Start Questionnaire"}
    </Button>
  );
}
