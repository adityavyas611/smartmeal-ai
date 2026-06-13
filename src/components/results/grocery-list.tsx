import { ShoppingCart } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { GroceryItem } from "@/types/meal-plan";
import { formatCurrency } from "@/lib/utils";

interface GroceryListProps {
  items: GroceryItem[];
}

export function GroceryList({ items }: GroceryListProps) {
  const total = items.reduce((sum, item) => sum + item.estimatedCost, 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-primary" aria-hidden="true" />
          <div>
            <CardTitle className="text-lg">Grocery List</CardTitle>
            <CardDescription>
              Consolidated shopping list for the day
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="divide-y" role="list">
          {items.map((item) => (
            <li
              key={`${item.name}-${item.quantity}`}
              className="flex items-center justify-between py-3 text-sm"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-muted-foreground">{item.quantity}</p>
              </div>
              <span className="tabular-nums text-muted-foreground">
                {formatCurrency(item.estimatedCost)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between border-t pt-4 text-sm font-semibold">
          <span>Estimated total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
