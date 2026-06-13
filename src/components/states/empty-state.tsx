import { UtensilsCrossed } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function EmptyState() {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <UtensilsCrossed
          className="h-12 w-12 text-muted-foreground"
          aria-hidden="true"
        />
        <div>
          <p className="text-lg font-medium">Your meal plan will appear here</p>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            Fill in your preferences on the left and generate a personalized
            breakfast, lunch, and dinner plan with grocery list and budget
            analysis.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
