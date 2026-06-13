import type { MealPreferences } from "./preferences";

export interface MacroNutrients {
  protein: number;
  carbs: number;
  fats: number;
}

export interface Meal {
  dishName: string;
  preparationTimeMinutes: number;
  ingredients: string[];
  instructions: string[];
  estimatedCost: number;
  calories: number;
  macros: MacroNutrients;
}

export type BudgetStatus = "within-budget" | "slightly-over-budget" | "over-budget";

export interface IngredientSubstitution {
  original: string;
  substitute: string;
  reason: string;
}

export interface GroceryItem {
  name: string;
  quantity: string;
  estimatedCost: number;
}

export interface BudgetAnalysis {
  totalEstimatedCost: number;
  userBudget: number;
  status: BudgetStatus;
  cheaperAlternatives: string[];
}

export interface MealPlan {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  groceryList: GroceryItem[];
  substitutions: IngredientSubstitution[];
  budgetAnalysis: BudgetAnalysis;
  dietaryValidation: {
    isValid: boolean;
    notes: string[];
  };
  allergyValidation: {
    isValid: boolean;
    notes: string[];
  };
}

export interface MealPlanRequest {
  preferences: MealPreferences;
  optimizeForBudget?: boolean;
}

export interface MealPlanResponse {
  success: boolean;
  data?: MealPlan;
  error?: string;
}
