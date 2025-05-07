import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Utensils } from 'lucide-react';

export function DayOrdersAmountCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
        <Utensils className="text-muted-foreground h-4 w-4" />
      </CardHeader>
      <CardContent className="space-y-2">
        <span className="text-2xl font-bold tracking-tight">12</span>
        <p className="text-muted-foreground text-sm">
          <span className="text-rose-500 dark:text-rose-400">-2%</span> em
          relação a ontem
        </p>
      </CardContent>
    </Card>
  );
}
