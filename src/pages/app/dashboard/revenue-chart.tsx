import { useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useQuery } from '@tanstack/react-query';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import colors from 'tailwindcss/colors';
import { subDays } from 'date-fns';

import { getDailyRevenueInPeriod } from '@/api/get-daily-revenue-in-period';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DateOfBirthPicker } from '@/components/ui/date-of-birth-picker';
import { Label } from '@/components/ui/label';

export function RevenueChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  const { data: dailyRevenuePeriod } = useQuery({
    queryKey: ['metrics', 'revenue-in-period', dateRange],
    queryFn: () =>
      getDailyRevenueInPeriod({
        from: dateRange?.from,
        to: dateRange?.to,
      }),
  });

  const chartData = useMemo(() => {
    return dailyRevenuePeriod?.map((chartItem) => {
      return {
        date: chartItem.date,
        receipt: chartItem.receipt / 100,
      };
    });
  });

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>

        <div className="flex items-center gap-3">
          <Label>Período</Label>
          <DateOfBirthPicker date={dateRange} onDateChange={setDateRange} />
        </div>
      </CardHeader>
      <CardContent>
        {chartData && (
          <ResponsiveContainer height={240} width="100%">
            <LineChart data={chartData} style={{ fontSize: 12 }}>
              <XAxis axisLine={false} dataKey="date" dy={16} tickLine={false} />

              <YAxis
                axisLine={false}
                stroke="#888"
                tickFormatter={(value: number) =>
                  value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                }
                tickLine={false}
                width={80}
              />

              <CartesianGrid className="stroke-muted" vertical={false} />

              <Line
                dataKey="receipt"
                stroke={colors.violet['500']}
                strokeWidth={2}
                type="linear"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
