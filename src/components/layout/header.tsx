import { ChefHat } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground"
            aria-hidden="true"
          >
            <ChefHat className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-bold tracking-tight">SmartMeal AI</p>
            <p className="text-xs text-muted-foreground">
              Personalized daily cooking plans
            </p>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
