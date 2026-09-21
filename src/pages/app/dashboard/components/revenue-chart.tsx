import { subDays } from 'date-fns';
import { Loader2 } from 'lucide-react';
import colors from 'tailwindcss/colors';
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { DateRange } from 'react-day-picker';

import { 
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Line,
  CartesianGrid
} from 'recharts'

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { DateRangePicker } from '@/components/ui/date-range-picker';

import { getDailyRevenueInPeriod } from '@/api/get-daily-revenue-in-period';

export function RevenueChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })

  const { data: dailyRevenueInPeriod } = useQuery({
    queryKey: ["daily-revenue-in-period", dateRange],
    queryFn: () => getDailyRevenueInPeriod({
      from: dateRange?.from,
      to: dateRange?.to,
    }),
  })

  const chartDate = useMemo(() => {
    return dailyRevenueInPeriod?.map((chartItem) => {
      return {
        date: chartItem.date,
        receipt: chartItem.receipt / 100,
      }
    })
  }, [dailyRevenueInPeriod])

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>
            Receita diária no período
          </CardDescription>
        </div>

        <div className="flex items-center gap-3">
          <Label>Período</Label>
          <DateRangePicker date={dateRange} onDateChange={setDateRange}/>
        </div>
      </CardHeader>
      <CardContent>
        {chartDate ? (
          <ResponsiveContainer
            width="100%"
            height={240}
          >
            <LineChart data={chartDate} style={{ fontSize: 12 }}>
              <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />

              <YAxis 
                stroke="#888"
                axisLine={false}
                tickLine={false}
                width={80}
                tickFormatter={(value: number) => value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              />

              <CartesianGrid vertical={false} className='stroke-muted' />

              <Line 
                type="linear"
                strokeWidth={2}
                dataKey="receipt"
                stroke={colors['violet'][500]}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[240px] w-full flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}