"use client";

import { useCallback, useState } from "react";
import type { MealPlan } from "@/types/meal-plan";
import type { MealPreferencesInput } from "@/lib/validations/meal-preferences";

interface UseMealPlanReturn {
  mealPlan: MealPlan | null;
  isLoading: boolean;
  isRegenerating: boolean;
  error: string | null;
  generate: (preferences: MealPreferencesInput) => Promise<void>;
  regenerateOptimized: () => Promise<void>;
  reset: () => void;
}

export function useMealPlan(): UseMealPlanReturn {
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastPreferences, setLastPreferences] =
    useState<MealPreferencesInput | null>(null);

  const fetchMealPlan = useCallback(
    async (
      preferences: MealPreferencesInput,
      optimizeForBudget = false
    ) => {
      if (optimizeForBudget) {
        setIsRegenerating(true);
      } else {
        setIsLoading(true);
      }
      setError(null);

      try {
        const response = await fetch("/api/generate-meal-plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ preferences, optimizeForBudget }),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error ?? "Something went wrong.");
        }

        setMealPlan(data.data);
        setLastPreferences(preferences);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to generate meal plan.";
        setError(message);
        if (!optimizeForBudget) {
          setMealPlan(null);
        }
      } finally {
        setIsLoading(false);
        setIsRegenerating(false);
      }
    },
    []
  );

  const generate = useCallback(
    async (preferences: MealPreferencesInput) => {
      await fetchMealPlan(preferences, false);
    },
    [fetchMealPlan]
  );

  const regenerateOptimized = useCallback(async () => {
    if (!lastPreferences) return;
    await fetchMealPlan(lastPreferences, true);
  }, [fetchMealPlan, lastPreferences]);

  const reset = useCallback(() => {
    setMealPlan(null);
    setError(null);
    setLastPreferences(null);
  }, []);

  return {
    mealPlan,
    isLoading,
    isRegenerating,
    error,
    generate,
    regenerateOptimized,
    reset,
  };
}
