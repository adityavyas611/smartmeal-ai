import { Loader2, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function LoadingState() {
  return (
    <Card className="border-dashed" role="status" aria-live="polite">
      <CardContent className="flex flex-col items-center justify-center gap-4 py-16">
        <div className="relative">
          <Sparkles className="h-10 w-10 text-primary" aria-hidden="true" />
          <Loader2
            className="absolute -right-2 -top-2 h-5 w-5 animate-spin text-muted-foreground"
            aria-hidden="true"
          />
        </div>
        <div className="text-center">
          <p className="text-lg font-medium">Crafting your meal plan…</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Analyzing preferences, budget, and dietary needs
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
