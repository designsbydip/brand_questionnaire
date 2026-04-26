"use client";

import { createContext, useContext, useReducer, useCallback, useRef, ReactNode } from "react";

// Flat form data — all fields optional at context level
export type FormData = Record<string, unknown>;

interface FormState {
  responseId: string | null;
  data: FormData;
  visitedPages: Set<string>;
  isSaving: boolean;
  lastSaved: Date | null;
  saveError: string | null;
}

type Action =
  | { type: "UPDATE_FIELD"; key: string; value: unknown }
  | { type: "UPDATE_FIELDS"; fields: FormData }
  | { type: "SET_RESPONSE_ID"; id: string }
  | { type: "MARK_PAGE_VISITED"; route: string }
  | { type: "SET_SAVING"; saving: boolean }
  | { type: "SET_LAST_SAVED"; date: Date }
  | { type: "SET_SAVE_ERROR"; error: string | null }
  | { type: "RESET" }
  | { type: "HYDRATE"; state: Partial<FormState> };

function reducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, data: { ...state.data, [action.key]: action.value } };
    case "UPDATE_FIELDS":
      return { ...state, data: { ...state.data, ...action.fields } };
    case "SET_RESPONSE_ID":
      return { ...state, responseId: action.id };
    case "MARK_PAGE_VISITED":
      return { ...state, visitedPages: new Set([...state.visitedPages, action.route]) };
    case "SET_SAVING":
      return { ...state, isSaving: action.saving };
    case "SET_LAST_SAVED":
      return { ...state, lastSaved: action.date, saveError: null };
    case "SET_SAVE_ERROR":
      return { ...state, saveError: action.error, isSaving: false };
    case "RESET":
      return { ...initialState, visitedPages: new Set() };
    case "HYDRATE":
      return { ...state, ...action.state };
    default:
      return state;
  }
}

const initialState: FormState = {
  responseId: null,
  data: {},
  visitedPages: new Set(),
  isSaving: false,
  lastSaved: null,
  saveError: null,
};

interface FormContextValue {
  state: FormState;
  updateField: (key: string, value: unknown) => void;
  updateFields: (fields: FormData) => void;
  markPageVisited: (route: string) => void;
  getCompletion: () => number;
  dispatch: React.Dispatch<Action>;
}

const FormContext = createContext<FormContextValue | null>(null);

const REQUIRED_FIELDS = [
  "originStory", "ahaMoment", "frustrationDescription",
  "valuePropAudience", "valuePropOutcome", "valuePropMethod",
  "vibeAttributes", "storytellingDepth",
  "navItems", "ctaHeader",
  "conversionGoals", "ctaCareersButton",
  "aiTransparencyLevel", "availableAssets",
  "candidateExperienceLevel", "heroAnimationStyle",
  "ackRelationshipClarity", "successVisitorActions",
  "message1Complete", "gaudiOneWord",
];

export function FormProvider({ children, initialData }: { children: ReactNode, initialData?: Partial<FormState> }) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    ...initialData,
    visitedPages: new Set<string>(),
  });

  const updateField = useCallback((key: string, value: unknown) => {
    dispatch({ type: "UPDATE_FIELD", key, value });
  }, []);

  const updateFields = useCallback((fields: FormData) => {
    dispatch({ type: "UPDATE_FIELDS", fields });
  }, []);

  const markPageVisited = useCallback((route: string) => {
    dispatch({ type: "MARK_PAGE_VISITED", route });
  }, []);

  const getCompletion = useCallback(() => {
    const filled = REQUIRED_FIELDS.filter((f) => {
      const val = state.data[f];
      if (Array.isArray(val)) return val.length > 0;
      return val !== null && val !== undefined && val !== "";
    });
    return Math.round((filled.length / REQUIRED_FIELDS.length) * 100);
  }, [state.data]);

  return (
    <FormContext.Provider value={{
      state,
      updateField,
      updateFields,
      markPageVisited,
      getCompletion,
      dispatch,
    }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext(): FormContextValue {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error("useFormContext must be used inside FormProvider");
  return ctx;
}
