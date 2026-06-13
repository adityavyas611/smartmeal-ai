export const DIETARY_PREFERENCES = [
  "vegetarian",
  "vegan",
  "eggetarian",
  "non-vegetarian",
] as const;

export const COOKING_SKILL_LEVELS = [
  "beginner",
  "intermediate",
  "advanced",
] as const;

export const WEIGHT_GOALS = [
  "lose-weight",
  "maintain-weight",
  "gain-muscle",
] as const;

export type DietaryPreference = (typeof DIETARY_PREFERENCES)[number];
export type CookingSkillLevel = (typeof COOKING_SKILL_LEVELS)[number];
export type WeightGoal = (typeof WEIGHT_GOALS)[number];

export interface MealPreferences {
  numberOfPeople: number;
  dietaryPreference: DietaryPreference;
  allergies: string[];
  budget: number;
  cookingSkillLevel: CookingSkillLevel;
  availableCookingTime: number;
  pantryIngredients: string[];
  cuisinePreference: string;
  weightGoal: WeightGoal;
}
