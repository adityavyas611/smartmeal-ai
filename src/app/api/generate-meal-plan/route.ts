import { NextResponse } from "next/server";
import { mealPlanRequestSchema } from "@/lib/validations/meal-preferences";
import { generateMealPlan } from "@/services/openai/meal-plan-service";
import type { MealPlanResponse } from "@/types/meal-plan";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const parsed = mealPlanRequestSchema.safeParse(body);

    if (!parsed.success) {
      const response: MealPlanResponse = {
        success: false,
        error: parsed.error.errors.map((e) => e.message).join("; "),
      };
      return NextResponse.json(response, { status: 400 });
    }

    const { preferences, optimizeForBudget } = parsed.data;
    const data = await generateMealPlan(preferences, optimizeForBudget);

    const response: MealPlanResponse = { success: true, data };
    return NextResponse.json(response);
  } catch (error) {
    console.error("[generate-meal-plan]", error);

    const message =
      error instanceof Error
        ? error.message
        : "Failed to generate meal plan. Please try again.";

    const response: MealPlanResponse = { success: false, error: message };
    return NextResponse.json(response, { status: 500 });
  }
}
