"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { MealPlan } from "@/types/meal-plan";
import { MealCard } from "@/components/results/meal-card";
import { GroceryList } from "@/components/results/grocery-list";
import { SubstitutionsList } from "@/components/results/substitutions-list";
import { BudgetStatusCard } from "@/components/results/budget-status";
import { ValidationSummary } from "@/components/results/validation-summary";

interface MealPlanResultsProps {
  mealPlan: MealPlan;
  onRegenerateOptimized?: () => void;
  isRegenerating?: boolean;
}

export function MealPlanResults({
  mealPlan,
  onRegenerateOptimized,
  isRegenerating,
}: MealPlanResultsProps) {
  return (
    <div className="space-y-6">
      <BudgetStatusCard
        analysis={mealPlan.budgetAnalysis}
        onRegenerate={onRegenerateOptimized}
        isRegenerating={isRegenerating}
      />

      <ValidationSummary
        dietaryValidation={mealPlan.dietaryValidation}
        allergyValidation={mealPlan.allergyValidation}
      />

      <Tabs defaultValue="breakfast">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
          <TabsTrigger value="lunch">Lunch</TabsTrigger>
          <TabsTrigger value="dinner">Dinner</TabsTrigger>
        </TabsList>
        <TabsContent value="breakfast">
          <MealCard mealType="Breakfast" meal={mealPlan.breakfast} />
        </TabsContent>
        <TabsContent value="lunch">
          <MealCard mealType="Lunch" meal={mealPlan.lunch} />
        </TabsContent>
        <TabsContent value="dinner">
          <MealCard mealType="Dinner" meal={mealPlan.dinner} />
        </TabsContent>
      </Tabs>

      <GroceryList items={mealPlan.groceryList} />
      <SubstitutionsList substitutions={mealPlan.substitutions} />
    </div>
  );
}
