import { Utensils } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

import { getMothOrdersAmount } from "@/api/get-month-orders-amount";

export function MonthOrdersAmountCard() {
  const { data: mothOrdersAmount } = useQuery({
    queryKey: ["metrics", "month-orders-amount"],
    queryFn: getMothOrdersAmount,
  })

  return (
    <Card>
      <CardHeader className='flex flex-row space-y-0 items-center justify-between pb-2'>
        <CardTitle className=''>Pedidos (mês)</CardTitle>
          <Utensils className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
      <CardContent className='space-y-1'>
        {mothOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {mothOrdersAmount.amount.toLocaleString("pt-BR")}
            </span>
            <p className="text-xs text-muted-foreground">
              {mothOrdersAmount.diffFromLastMonth >= 0 ? (
                <>
                  <span className="text-emerald-500 dark:text-rose-400">
                    +{mothOrdersAmount.diffFromLastMonth}%
                  </span>{' '}
                  em relação ao mes
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    {mothOrdersAmount.diffFromLastMonth}%
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