"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  mealPreferencesSchema,
  type MealPreferencesInput,
} from "@/lib/validations/meal-preferences";

interface MealPlanFormProps {
  onSubmit: (preferences: MealPreferencesInput) => void;
  isLoading: boolean;
}

function parseList(value: string): string[] {
  return value
    .split(/[,;\n]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

const defaultValues: MealPreferencesInput = {
  numberOfPeople: 2,
  dietaryPreference: "vegetarian",
  allergies: [],
  budget: 25,
  cookingSkillLevel: "beginner",
  availableCookingTime: 90,
  pantryIngredients: [],
  cuisinePreference: "Indian",
  weightGoal: "maintain-weight",
};

export function MealPlanForm({ onSubmit, isLoading }: MealPlanFormProps) {
  const [form, setForm] = useState(defaultValues);
  const [allergiesText, setAllergiesText] = useState("");
  const [pantryText, setPantryText] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFieldErrors({});

    const payload: MealPreferencesInput = {
      ...form,
      allergies: parseList(allergiesText),
      pantryIngredients: parseList(pantryText),
    };

    const result = mealPreferencesSchema.safeParse(payload);
    if (!result.success) {
      const errors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path.join(".");
        if (!errors[key]) errors[key] = issue.message;
      }
      setFieldErrors(errors);
      return;
    }

    onSubmit(result.data);
  }

  function updateField<K extends keyof MealPreferencesInput>(
    key: K,
    value: MealPreferencesInput[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Preferences</CardTitle>
        <CardDescription>
          Tell us about your day and we&apos;ll build a tailored cooking plan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="numberOfPeople">Number of people</Label>
              <Input
                id="numberOfPeople"
                type="number"
                min={1}
                max={20}
                value={form.numberOfPeople}
                onChange={(e) =>
                  updateField("numberOfPeople", Number(e.target.value))
                }
                aria-invalid={!!fieldErrors.numberOfPeople}
                aria-describedby={
                  fieldErrors.numberOfPeople ? "numberOfPeople-error" : undefined
                }
              />
              {fieldErrors.numberOfPeople && (
                <p id="numberOfPeople-error" className="text-sm text-destructive">
                  {fieldErrors.numberOfPeople}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Daily budget (USD)</Label>
              <Input
                id="budget"
                type="number"
                min={1}
                step={0.01}
                value={form.budget}
                onChange={(e) => updateField("budget", Number(e.target.value))}
                aria-invalid={!!fieldErrors.budget}
              />
              {fieldErrors.budget && (
                <p className="text-sm text-destructive">{fieldErrors.budget}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dietaryPreference">Dietary preference</Label>
            <Select
              value={form.dietaryPreference}
              onValueChange={(v) =>
                updateField(
                  "dietaryPreference",
                  v as MealPreferencesInput["dietaryPreference"]
                )
              }
            >
              <SelectTrigger id="dietaryPreference">
                <SelectValue placeholder="Select preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vegetarian">Vegetarian</SelectItem>
                <SelectItem value="vegan">Vegan</SelectItem>
                <SelectItem value="eggetarian">Eggetarian</SelectItem>
                <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="allergies">Allergies</Label>
            <Textarea
              id="allergies"
              placeholder="e.g. peanuts, shellfish, gluten (comma-separated)"
              value={allergiesText}
              onChange={(e) => setAllergiesText(e.target.value)}
              rows={2}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cookingSkillLevel">Cooking skill level</Label>
              <Select
                value={form.cookingSkillLevel}
                onValueChange={(v) =>
                  updateField(
                    "cookingSkillLevel",
                    v as MealPreferencesInput["cookingSkillLevel"]
                  )
                }
              >
                <SelectTrigger id="cookingSkillLevel">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="availableCookingTime">
                Available cooking time (minutes)
              </Label>
              <Input
                id="availableCookingTime"
                type="number"
                min={15}
                max={480}
                value={form.availableCookingTime}
                onChange={(e) =>
                  updateField("availableCookingTime", Number(e.target.value))
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pantryIngredients">Pantry ingredients</Label>
            <Textarea
              id="pantryIngredients"
              placeholder="e.g. rice, lentils, olive oil, onions (comma-separated)"
              value={pantryText}
              onChange={(e) => setPantryText(e.target.value)}
              rows={2}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cuisinePreference">Cuisine preference</Label>
              <Input
                id="cuisinePreference"
                placeholder="e.g. Indian, Mediterranean"
                value={form.cuisinePreference}
                onChange={(e) =>
                  updateField("cuisinePreference", e.target.value)
                }
                aria-invalid={!!fieldErrors.cuisinePreference}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weightGoal">Weight goal</Label>
              <Select
                value={form.weightGoal}
                onValueChange={(v) =>
                  updateField(
                    "weightGoal",
                    v as MealPreferencesInput["weightGoal"]
                  )
                }
              >
                <SelectTrigger id="weightGoal">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose-weight">Lose weight</SelectItem>
                  <SelectItem value="maintain-weight">Maintain weight</SelectItem>
                  <SelectItem value="gain-muscle">Gain muscle</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            {isLoading ? "Generating…" : "Generate Meal Plan"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
