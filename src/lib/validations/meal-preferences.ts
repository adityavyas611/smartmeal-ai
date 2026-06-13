import { z } from "zod";
import {
  COOKING_SKILL_LEVELS,
  DIETARY_PREFERENCES,
  WEIGHT_GOALS,
} from "@/types/preferences";

export const mealPreferencesSchema = z.object({
  numberOfPeople: z
    .number()
    .int("Must be a whole number")
    .min(1, "At least 1 person")
    .max(20, "Maximum 20 people"),
  dietaryPreference: z.enum(DIETARY_PREFERENCES),
  allergies: z.array(z.string().trim().min(1)).default([]),
  budget: z
    .number()
    .positive("Budget must be greater than 0")
    .max(10000, "Budget seems too high"),
  cookingSkillLevel: z.enum(COOKING_SKILL_LEVELS),
  availableCookingTime: z
    .number()
    .int()
    .min(15, "Minimum 15 minutes")
    .max(480, "Maximum 8 hours"),
  pantryIngredients: z.array(z.string().trim().min(1)).default([]),
  cuisinePreference: z
    .string()
    .trim()
    .min(1, "Please specify a cuisine preference")
    .max(100),
  weightGoal: z.enum(WEIGHT_GOALS),
});

export type MealPreferencesInput = z.infer<typeof mealPreferencesSchema>;

export const mealPlanRequestSchema = z.object({
  preferences: mealPreferencesSchema,
  optimizeForBudget: z.boolean().optional().default(false),
});

export type MealPlanRequestInput = z.infer<typeof mealPlanRequestSchema>;
