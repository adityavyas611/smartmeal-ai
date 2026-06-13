import { AlertTriangle, CheckCircle2, RefreshCw, Wallet } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { BudgetAnalysis, BudgetStatus } from "@/types/meal-plan";
import { formatCurrency } from "@/lib/utils";

interface BudgetStatusCardProps {
  analysis: BudgetAnalysis;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
}

const STATUS_CONFIG: Record<
  BudgetStatus,
  {
    label: string;
    variant: "success" | "warning" | "danger";
    icon: typeof CheckCircle2;
  }
> = {
  "within-budget": {
    label: "Within Budget",
    variant: "success",
    icon: CheckCircle2,
  },
  "slightly-over-budget": {
    label: "Slightly Over Budget",
    variant: "warning",
    icon: AlertTriangle,
  },
  "over-budget": {
    label: "Over Budget",
    variant: "danger",
    icon: AlertTriangle,
  },
};

export function BudgetStatusCard({
  analysis,
  onRegenerate,
  isRegenerating,
}: BudgetStatusCardProps) {
  const config = STATUS_CONFIG[analysis.status];
  const Icon = config.icon;
  const budgetUsedPercent = Math.min(
    100,
    (analysis.totalEstimatedCost / analysis.userBudget) * 100
  );
  const isOver =
    analysis.status === "over-budget" ||
    analysis.status === "slightly-over-budget";

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-primary" aria-hidden="true" />
            <div>
              <CardTitle className="text-lg">Budget Analysis</CardTitle>
              <CardDescription>
                Total estimated cost vs. your daily budget
              </CardDescription>
            </div>
          </div>
          <Badge variant={config.variant}>
            <Icon className="mr-1 h-3 w-3" aria-hidden="true" />
            {config.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm">
          <span>
            Estimated:{" "}
            <strong>{formatCurrency(analysis.totalEstimatedCost)}</strong>
          </span>
          <span>
            Budget: <strong>{formatCurrency(analysis.userBudget)}</strong>
          </span>
        </div>

        <Progress
          value={budgetUsedPercent}
          aria-label={`Budget used: ${budgetUsedPercent.toFixed(0)}%`}
        />

        {analysis.cheaperAlternatives.length > 0 && (
          <div>
            <p className="mb-2 text-sm font-medium">Cheaper alternatives</p>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              {analysis.cheaperAlternatives.map((alt) => (
                <li key={alt}>{alt}</li>
              ))}
            </ul>
          </div>
        )}

        {isOver && onRegenerate && (
          <Button
            variant="outline"
            className="w-full"
            onClick={onRegenerate}
            disabled={isRegenerating}
          >
            <RefreshCw
              className={`h-4 w-4 ${isRegenerating ? "animate-spin" : ""}`}
              aria-hidden="true"
            />
            {isRegenerating
              ? "Regenerating optimized plan…"
              : "Regenerate optimized plan"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
