import type { MealPreferences } from "@/types/preferences";
import type { MealPlan } from "@/types/meal-plan";
import { computeBudgetStatus } from "./prompts";

export function recalculateBudgetAnalysis(
  plan: MealPlan,
  userBudget: number
): MealPlan {
  const mealCost =
    plan.breakfast.estimatedCost +
    plan.lunch.estimatedCost +
    plan.dinner.estimatedCost;
  const groceryCost = plan.groceryList.reduce(
    (sum, item) => sum + item.estimatedCost,
    0
  );
  const totalEstimatedCost = Math.round((mealCost + groceryCost) * 100) / 100;

  return {
    ...plan,
    budgetAnalysis: {
      ...plan.budgetAnalysis,
      totalEstimatedCost,
      userBudget,
      status: computeBudgetStatus(totalEstimatedCost, userBudget),
    },
  };
}

export function validateDietaryAndAllergies(
  plan: MealPlan,
  preferences: MealPreferences
): MealPlan {
  const allIngredients = [
    ...plan.breakfast.ingredients,
    ...plan.lunch.ingredients,
    ...plan.dinner.ingredients,
    ...plan.groceryList.map((g) => g.name),
  ]
    .join(" ")
    .toLowerCase();

  const allergyNotes: string[] = [];
  let allergyValid = true;

  for (const allergy of preferences.allergies) {
    const normalized = allergy.toLowerCase().trim();
    if (normalized && allIngredients.includes(normalized)) {
      allergyValid = false;
      allergyNotes.push(`Potential allergen "${allergy}" found in ingredients.`);
    }
  }

  const dietaryNotes: string[] = [];
  let dietaryValid = plan.dietaryValidation.isValid;

  const meatTerms = [
    "chicken",
    "beef",
    "pork",
    "lamb",
    "fish",
    "salmon",
    "tuna",
    "shrimp",
    "bacon",
    "sausage",
  ];
  const dairyTerms = ["milk", "cheese", "butter", "cream", "yogurt", "paneer"];
  const eggTerms = ["egg", "eggs", "omelette", "omelet"];

  if (
    preferences.dietaryPreference === "vegetarian" ||
    preferences.dietaryPreference === "vegan" ||
    preferences.dietaryPreference === "eggetarian"
  ) {
    for (const term of meatTerms) {
      if (allIngredients.includes(term)) {
        dietaryValid = false;
        dietaryNotes.push(`Non-vegetarian ingredient "${term}" detected.`);
      }
    }
  }

  if (preferences.dietaryPreference === "vegan") {
    for (const term of [...dairyTerms, ...eggTerms]) {
      if (allIngredients.includes(term)) {
        dietaryValid = false;
        dietaryNotes.push(`Non-vegan ingredient "${term}" detected.`);
      }
    }
  }

  return {
    ...plan,
    dietaryValidation: {
      isValid: dietaryValid,
      notes:
        dietaryNotes.length > 0
          ? dietaryNotes
          : plan.dietaryValidation.notes,
    },
    allergyValidation: {
      isValid: allergyValid,
      notes:
        allergyNotes.length > 0
          ? allergyNotes
          : plan.allergyValidation.notes,
    },
  };
}

export function extractJson(text: string): string {
  const trimmed = text.trim();
  const fenceMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) return fenceMatch[1].trim();

  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start !== -1 && end !== -1 && end > start) {
    return trimmed.slice(start, end + 1);
  }

  return trimmed;
}
