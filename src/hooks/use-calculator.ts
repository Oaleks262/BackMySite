"use client";

import { create } from "zustand";
import type { CalculatorState } from "@/types";

const initialState = {
  step: 1,
  projectType: "",
  design: "",
  features: [] as string[],
  timeline: "",
  contact: {
    name: "",
    email: "",
    phone: "",
    message: "",
  },
  result: null as CalculatorState["result"],
};

export const useCalculator = create<CalculatorState>((set) => ({
  ...initialState,

  setStep: (step) => set({ step }),

  setProjectType: (projectType) => set({ projectType }),

  setDesign: (design) => set({ design }),

  toggleFeature: (feature) =>
    set((state) => ({
      features: state.features.includes(feature)
        ? state.features.filter((f) => f !== feature)
        : [...state.features, feature],
    })),

  setTimeline: (timeline) => set({ timeline }),

  setContact: (contact) =>
    set((state) => ({
      contact: { ...state.contact, ...contact },
    })),

  setResult: (result) => set({ result }),

  reset: () => set(initialState),

  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 5) })),

  prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),
}));
