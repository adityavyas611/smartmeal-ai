"use client";

import { Header } from "@/components/layout/header";
import { MealPlanForm } from "@/components/forms/meal-plan-form";
import { MealPlanResults } from "@/components/results/meal-plan-results";
import { LoadingState } from "@/components/states/loading-state";
import { EmptyState } from "@/components/states/empty-state";
import { ErrorState } from "@/components/states/error-state";
import { useMealPlan } from "@/hooks/use-meal-plan";

export default function HomePage() {
  const {
    mealPlan,
    isLoading,
    isRegenerating,
    error,
    generate,
    regenerateOptimized,
  } = useMealPlan();

  return (
    <>
      <Header />
      <main
        id="main-content"
        className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6"
      >
        <section className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Plan your day&apos;s meals with AI
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            SmartMeal AI creates personalized breakfast, lunch, and dinner plans
            with grocery lists, nutrition info, and budget-aware suggestions.
          </p>
        </section>

        <div className="grid gap-8 lg:grid-cols-2">
          <section aria-label="Meal preferences form">
            <MealPlanForm onSubmit={generate} isLoading={isLoading} />
          </section>

          <section aria-label="Generated meal plan">
            {isLoading && !mealPlan && <LoadingState />}
            {!isLoading && error && !mealPlan && <ErrorState message={error} />}
            {error && mealPlan && (
              <p className="mb-4 text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
            {!mealPlan && !isLoading && !error && <EmptyState />}
            {mealPlan && (
              <MealPlanResults
                mealPlan={mealPlan}
                onRegenerateOptimized={regenerateOptimized}
                isRegenerating={isRegenerating}
              />
            )}
          </section>
        </div>
      </main>
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        SmartMeal AI — powered by OpenAI
      </footer>
    </>
  );
}
