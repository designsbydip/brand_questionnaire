"use client";

import { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFormContext } from "@/context/FormContext";
import { toast } from "sonner";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useFormPage(schema: z.ZodType<any, any, any>, pageRoute: string) {
  const { state, updateFields, markPageVisited, dispatch } = useFormContext();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const form = useForm<any>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {},
  });

  // Populate form with saved context data on mount
  useEffect(() => {
    if (Object.keys(state.data).length > 0) {
      form.reset(state.data, { keepErrors: false });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    markPageVisited(pageRoute);
  }, [pageRoute, markPageVisited]);

  const saveToDb = useCallback(async (pageData: Record<string, unknown>): Promise<boolean> => {
    dispatch({ type: "SET_SAVING", saving: true });
    try {
      // Merge accumulated state with new page data so all answers persist
      const mergedData = { ...state.data, ...pageData };

      // Parse section number from route like "1-1" → 1, "10-1" → 10
      const sectionNumber = parseInt(pageRoute.split("-")[0], 10);

      const res = await fetch("/api/auto-save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData: mergedData,
          lastPageVisited: sectionNumber,
        }),
      });
      const result = await res.json();
      if (result.success) {
        if (!state.responseId) {
          dispatch({ type: "SET_RESPONSE_ID", id: result.id });
        }
        dispatch({ type: "SET_LAST_SAVED", date: new Date() });
        return true;
      } else {
        const message = result.message ?? "Couldn't save your answers";
        dispatch({ type: "SET_SAVE_ERROR", error: message });
        toast.error("Couldn't save your answers — please check your connection and try again.");
        return false;
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to save";
      dispatch({ type: "SET_SAVE_ERROR", error: message });
      toast.error(`Couldn't save your answers — please check your connection and try again.`);
      return false;
    } finally {
      dispatch({ type: "SET_SAVING", saving: false });
    }
  }, [state.data, state.responseId, pageRoute, dispatch]);

  const onSaveFields = useCallback(async (data: Record<string, unknown>): Promise<boolean> => {
    updateFields(data);
    return await saveToDb(data);
  }, [updateFields, saveToDb]);

  return {
    form,
    onSaveFields,
    state,
    // Use the Zod resolver's isValid directly — correctly false when required fields are empty
    isValid: form.formState.isValid,
    handleSubmit: form.handleSubmit,
  };
}
