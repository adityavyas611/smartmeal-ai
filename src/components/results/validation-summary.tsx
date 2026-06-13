import { ShieldCheck, ShieldX } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { MealPlan } from "@/types/meal-plan";

interface ValidationSummaryProps {
  dietaryValidation: MealPlan["dietaryValidation"];
  allergyValidation: MealPlan["allergyValidation"];
}

function ValidationBlock({
  title,
  validation,
}: {
  title: string;
  validation: MealPlan["dietaryValidation"];
}) {
  const Icon = validation.isValid ? ShieldCheck : ShieldX;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Icon
          className={`h-4 w-4 ${validation.isValid ? "text-emerald-600" : "text-destructive"}`}
          aria-hidden="true"
        />
        <span className="text-sm font-medium">{title}</span>
        <Badge variant={validation.isValid ? "success" : "danger"}>
          {validation.isValid ? "Valid" : "Review needed"}
        </Badge>
      </div>
      {validation.notes.length > 0 && (
        <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
          {validation.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ValidationSummary({
  dietaryValidation,
  allergyValidation,
}: ValidationSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Safety Checks</CardTitle>
        <CardDescription>
          Dietary and allergy validation for your plan
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ValidationBlock
          title="Dietary compliance"
          validation={dietaryValidation}
        />
        <ValidationBlock title="Allergy safety" validation={allergyValidation} />
      </CardContent>
    </Card>
  );
}
