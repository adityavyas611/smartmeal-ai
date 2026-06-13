import OpenAI from "openai";
import type { MealPreferences } from "@/types/preferences";
import type { MealPlan } from "@/types/meal-plan";
import { mealPlanSchema } from "@/lib/validations/meal-plan-response";
import {
  buildMealPlanPrompt,
  buildOptimizedMealPlanPrompt,
  SYSTEM_PROMPT,
} from "@/services/ai/prompts";
import {
  extractJson,
  recalculateBudgetAnalysis,
  validateDietaryAndAllergies,
} from "@/services/ai/plan-utils";

const DEFAULT_MODEL = "gpt-4o-mini";

function getOpenAIClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY is not configured. Add it to your .env.local file."
    );
  }
  return new OpenAI({ apiKey });
}

function getModel(): string {
  return process.env.OPENAI_MODEL ?? DEFAULT_MODEL;
}

async function callOpenAI(prompt: string): Promise<MealPlan> {
  const openai = getOpenAIClient();

  const response = await openai.chat.completions.create({
    model: getModel(),
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: prompt },
    ],
    response_format: { type: "json_object" },
    temperature: 0.7,
  });

  const text = response.choices[0]?.message?.content;

  if (!text) {
    throw new Error("OpenAI returned an empty response.");
  }

  const parsed = JSON.parse(extractJson(text));
  return mealPlanSchema.parse(parsed);
}

export async function generateMealPlan(
  preferences: MealPreferences,
  optimizeForBudget = false
): Promise<MealPlan> {
  const prompt = optimizeForBudget
    ? buildOptimizedMealPlanPrompt(preferences)
    : buildMealPlanPrompt(preferences);

  let plan = await callOpenAI(prompt);
  plan = recalculateBudgetAnalysis(plan, preferences.budget);
  plan = validateDietaryAndAllergies(plan, preferences);

  const needsOptimization =
    plan.budgetAnalysis.status === "over-budget" ||
    plan.budgetAnalysis.status === "slightly-over-budget";

  if (needsOptimization && !optimizeForBudget) {
    return generateMealPlan(preferences, true);
  }

  return plan;
}
