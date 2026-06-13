import { Clock, DollarSign, Flame } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Meal } from "@/types/meal-plan";
import { formatCurrency, formatMinutes } from "@/lib/utils";

interface MealCardProps {
  mealType: "Breakfast" | "Lunch" | "Dinner";
  meal: Meal;
}

export function MealCard({ mealType, meal }: MealCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <CardDescription>{mealType}</CardDescription>
            <CardTitle className="text-xl">{meal.dishName}</CardTitle>
          </div>
          <Badge variant="secondary">{formatMinutes(meal.preparationTimeMinutes)}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <DollarSign className="h-4 w-4" aria-hidden="true" />
            {formatCurrency(meal.estimatedCost)}
          </span>
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <Flame className="h-4 w-4" aria-hidden="true" />
            {meal.calories} kcal
          </span>
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <Clock className="h-4 w-4" aria-hidden="true" />
            P {meal.macros.protein}g · C {meal.macros.carbs}g · F {meal.macros.fats}g
          </span>
        </div>

        <Separator />

        <div>
          <h4 className="mb-2 text-sm font-semibold">Ingredients</h4>
          <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
            {meal.ingredients.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-2 text-sm font-semibold">Instructions</h4>
          <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
            {meal.instructions.map((step, index) => (
              <li key={`${index}-${step.slice(0, 20)}`}>{step}</li>
            ))}
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}
