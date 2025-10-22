import { useQuery } from '@tanstack/react-query';
import { DollarSign } from 'lucide-react';

import { getCanceledOrdersAmount } from '@/api/get-canceled-orders-amount';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function MonthCanceledOrdersAmountCard() {
  const { data: canceledOrdersAmount } = useQuery({
    queryKey: ['metrics', 'month-canceled-orders-amount'],
    queryFn: getCanceledOrdersAmount,
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelamentos (mês)
        </CardTitle>
        <DollarSign className="text-muted-foreground h-4 w-4" />
      </CardHeader>
      <CardContent className="space-y-1">
        {canceledOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {canceledOrdersAmount.amount}
            </span>
            <p className="text-muted-foreground text-xs">
              {canceledOrdersAmount.diffFromLastMonth < 0 ? (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    {canceledOrdersAmount.diffFromLastMonth}
                  </span>
                  em relação ao mes passado
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    +{canceledOrdersAmount.diffFromLastMonth}
                  </span>{' '}
                  em relação a ontem
                </>
              )}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
