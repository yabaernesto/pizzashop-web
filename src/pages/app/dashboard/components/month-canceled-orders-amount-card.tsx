import { DollarSign } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

import { 
  getMonthCanceledOrdersAmount 
} from "@/api/get-month-canceled-orders-amount";

export function MonthCanceledOrdersAmountCard() {
  const { data: mothCanceledOrdersAmount } = useQuery({
    queryKey: ["metrics", "month-canceled-orders-amount"],
    queryFn: getMonthCanceledOrdersAmount,
  })

  return (
    <Card>
      <CardHeader className='flex flex-row space-y-0 items-center justify-between pb-2'>
        <CardTitle className=''>Cancelamentos (mês)</CardTitle>
          <DollarSign className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
      <CardContent className='space-y-1'>
        {mothCanceledOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {mothCanceledOrdersAmount.amount.toLocaleString("pt-BR")}
            </span>
            <p className="text-xs text-muted-foreground">
              {mothCanceledOrdersAmount.diffFromLastMonth < 0 ? (
                <>
                  <span className="text-emerald-500 dark:text-rose-400">
                    {mothCanceledOrdersAmount.diffFromLastMonth}%
                  </span>{' '}
                  em relação ao mes
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    +{mothCanceledOrdersAmount.diffFromLastMonth}%
                  </span>{' '}
                  em relação ao mes passado
                </>
              )}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}