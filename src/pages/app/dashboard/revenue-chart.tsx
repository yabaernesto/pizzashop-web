import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function RevenueChart() {
  const data = [
    { date: '10/12', revenue: 1200 },
    { date: '11/12', revenue: 800 },
    { date: '12/12', revenue: 900 },
    { date: '13/12', revenue: 400 },
    { date: '14/12', revenue: 2500 },
    { date: '15/12', revenue: 800 },
    { date: '16/12', revenue: 640 },
  ]

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="font-medium text-base">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer height={240} width="100%">
          <LineChart data={data} style={{ fontSize: 12 }}>
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
              dataKey="revenue"
              stroke={colors.violet['500']}
              strokeWidth={2}
              type="linear"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
