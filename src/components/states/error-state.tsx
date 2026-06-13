import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ErrorStateProps {
  message: string;
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <Card
      className="border-destructive/50 bg-destructive/5"
      role="alert"
      aria-live="assertive"
    >
      <CardContent className="flex items-start gap-3 py-6">
        <AlertCircle
          className="mt-0.5 h-5 w-5 shrink-0 text-destructive"
          aria-hidden="true"
        />
        <div>
          <p className="font-medium text-destructive">
            Unable to generate meal plan
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{message}</p>
        </div>
      </CardContent>
    </Card>
  );
}
