import { ArrowRightLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { IngredientSubstitution } from "@/types/meal-plan";

interface SubstitutionsListProps {
  substitutions: IngredientSubstitution[];
}

export function SubstitutionsList({ substitutions }: SubstitutionsListProps) {
  if (substitutions.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <ArrowRightLeft className="h-5 w-5 text-primary" aria-hidden="true" />
          <div>
            <CardTitle className="text-lg">Ingredient Substitutions</CardTitle>
            <CardDescription>
              Smart swaps for dietary needs or pantry gaps
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4" role="list">
          {substitutions.map((sub) => (
            <li
              key={`${sub.original}-${sub.substitute}`}
              className="rounded-lg border p-3"
            >
              <p className="text-sm font-medium">
                {sub.original}{" "}
                <span className="text-muted-foreground">→</span>{" "}
                {sub.substitute}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{sub.reason}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
