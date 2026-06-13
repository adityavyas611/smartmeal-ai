import type { MealPreferences } from "@/types/preferences";
import type { BudgetStatus } from "@/types/meal-plan";

const DIETARY_LABELS: Record<MealPreferences["dietaryPreference"], string> = {
  vegetarian: "Vegetarian (no meat or fish, eggs and dairy allowed)",
  vegan: "Vegan (no animal products)",
  eggetarian: "Eggetarian (vegetarian plus eggs, no meat or fish)",
  "non-vegetarian": "Non-Vegetarian (all foods allowed)",
};

const SKILL_LABELS: Record<MealPreferences["cookingSkillLevel"], string> = {
  beginner: "Beginner (simple techniques, minimal steps)",
  intermediate: "Intermediate (moderate complexity)",
  advanced: "Advanced (complex techniques welcome)",
};

const WEIGHT_GOAL_LABELS: Record<MealPreferences["weightGoal"], string> = {
  "lose-weight": "Lose weight (calorie-conscious, high protein, moderate carbs)",
  "maintain-weight": "Maintain weight (balanced macros)",
  "gain-muscle": "Gain muscle (high protein, calorie surplus)",
};

export function buildMealPlanPrompt(
  preferences: MealPreferences,
  optimizeForBudget = false
): string {
  const allergiesText =
    preferences.allergies.length > 0
      ? preferences.allergies.join(", ")
      : "None specified";

  const pantryText =
    preferences.pantryIngredients.length > 0
      ? preferences.pantryIngredients.join(", ")
      : "None specified";

  const budgetNote = optimizeForBudget
    ? `\nIMPORTANT: The previous plan exceeded budget. Regenerate with cheaper ingredients, simpler dishes, and pantry-first shopping. Total cost MUST be at or below $${preferences.budget}.`
    : "";

  return `Generate a personalized full-day meal plan (breakfast, lunch, dinner) as valid JSON only — no markdown, no code fences.

USER PROFILE:
- People to serve: ${preferences.numberOfPeople}
- Dietary preference: ${DIETARY_LABELS[preferences.dietaryPreference]}
- Allergies (STRICT — never include these): ${allergiesText}
- Daily budget: $${preferences.budget} USD (total for all meals + grocery items)
- Cooking skill: ${SKILL_LABELS[preferences.cookingSkillLevel]}
- Available cooking time today: ${preferences.availableCookingTime} minutes (total across all meals)
- Pantry ingredients (prefer using these): ${pantryText}
- Cuisine preference: ${preferences.cuisinePreference}
- Weight goal: ${WEIGHT_GOAL_LABELS[preferences.weightGoal]}
${budgetNote}

REQUIREMENTS:
1. Each meal must strictly follow the dietary preference and exclude all allergens.
2. Scale portions and costs for ${preferences.numberOfPeople} people.
3. Total preparation time across all three meals must fit within ${preferences.availableCookingTime} minutes.
4. Match recipe complexity to ${preferences.cookingSkillLevel} skill level.
5. Align calories and macros with the weight goal.
6. Prefer pantry ingredients when possible.
7. Provide realistic USD cost estimates per meal and grocery item.
8. Grocery list should consolidate ingredients needed beyond pantry items.
9. Include 3–6 practical ingredient substitutions (e.g., Milk → Almond Milk).
10. Validate dietary compliance and allergy safety in the response.

BUDGET STATUS RULES (compute from totalEstimatedCost vs userBudget):
- "within-budget": total <= budget
- "slightly-over-budget": total > budget AND total <= budget * 1.15
- "over-budget": total > budget * 1.15

If over budget, include specific cheaperAlternatives and suggest swaps.

Return JSON matching this exact structure:
{
  "breakfast": {
    "dishName": "string",
    "preparationTimeMinutes": number,
    "ingredients": ["string"],
    "instructions": ["string"],
    "estimatedCost": number,
    "calories": number,
    "macros": { "protein": number, "carbs": number, "fats": number }
  },
  "lunch": { ...same structure... },
  "dinner": { ...same structure... },
  "groceryList": [
    { "name": "string", "quantity": "string", "estimatedCost": number }
  ],
  "substitutions": [
    { "original": "string", "substitute": "string", "reason": "string" }
  ],
  "budgetAnalysis": {
    "totalEstimatedCost": number,
    "userBudget": ${preferences.budget},
    "status": "within-budget" | "slightly-over-budget" | "over-budget",
    "cheaperAlternatives": ["string"]
  },
  "dietaryValidation": {
    "isValid": boolean,
    "notes": ["string"]
  },
  "allergyValidation": {
    "isValid": boolean,
    "notes": ["string"]
  }
}`;
}

export function buildOptimizedMealPlanPrompt(
  preferences: MealPreferences
): string {
  return buildMealPlanPrompt(preferences, true);
}

export function computeBudgetStatus(
  totalCost: number,
  budget: number
): BudgetStatus {
  if (totalCost <= budget) return "within-budget";
  if (totalCost <= budget * 1.15) return "slightly-over-budget";
  return "over-budget";
}

export const SYSTEM_PROMPT = `You are SmartMeal AI, a professional nutritionist and meal planner.
You always respond with valid JSON matching the requested schema.
Never include markdown, code fences, or explanatory text outside the JSON object.`;
