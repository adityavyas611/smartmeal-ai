import { z } from "zod";

const macroNutrientsSchema = z.object({
  protein: z.number().nonnegative(),
  carbs: z.number().nonnegative(),
  fats: z.number().nonnegative(),
});

const mealSchema = z.object({
  dishName: z.string().min(1),
  preparationTimeMinutes: z.number().int().positive(),
  ingredients: z.array(z.string().min(1)).min(1),
  instructions: z.array(z.string().min(1)).min(1),
  estimatedCost: z.number().nonnegative(),
  calories: z.number().nonnegative(),
  macros: macroNutrientsSchema,
});

const groceryItemSchema = z.object({
  name: z.string().min(1),
  quantity: z.string().min(1),
  estimatedCost: z.number().nonnegative(),
});

const substitutionSchema = z.object({
  original: z.string().min(1),
  substitute: z.string().min(1),
  reason: z.string().min(1),
});

const budgetAnalysisSchema = z.object({
  totalEstimatedCost: z.number().nonnegative(),
  userBudget: z.number().positive(),
  status: z.enum(["within-budget", "slightly-over-budget", "over-budget"]),
  cheaperAlternatives: z.array(z.string()),
});

const validationResultSchema = z.object({
  isValid: z.boolean(),
  notes: z.array(z.string()),
});

export const mealPlanSchema = z.object({
  breakfast: mealSchema,
  lunch: mealSchema,
  dinner: mealSchema,
  groceryList: z.array(groceryItemSchema).min(1),
  substitutions: z.array(substitutionSchema),
  budgetAnalysis: budgetAnalysisSchema,
  dietaryValidation: validationResultSchema,
  allergyValidation: validationResultSchema,
});

export type MealPlanSchema = z.infer<typeof mealPlanSchema>;
