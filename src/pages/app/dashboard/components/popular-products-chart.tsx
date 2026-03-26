import colors from 'tailwindcss/colors'
import { BarChart } from 'lucide-react';
import { 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

import { 
  Card, 
  CardContent,
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

const data = [
  { product: 'Pizza peperoni', amount: 20 },
  { product: 'Hamburguer', amount: 10 },
  { product: 'Cachorro quente', amount: 15 },
  { product: 'Faita', amount: 22 },
  { product: 'Bolo', amount: 33 },
]

const COLORS = [
  colors.sky[500],
  colors.amber[500],
  colors.violet[500],
  colors.emerald[500],
  colors.rose[500]
]

export function PopularProductsChart() {
  return (
    <Card className="col-span-3">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Produtos populares
          </CardTitle>
          <BarChart className='w-4 h-4 text-muted-foreground' />
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer
          width="100%"
          height={240}
        >
          <PieChart data={data} style={{ fontSize: 12 }}>
            <Pie 
              data={data} 
              dataKey="amount" 
              nameKey="product"
              cx="50%"
              cy="50%"
              outerRadius={86}
              innerRadius={64}
              strokeWidth={8}
              labelLine={false}
              label={({
                cx = 0,
                cy = 0,
                midAngle = 0,
                innerRadius = 0,
                outerRadius = 0,
                value,
                index
              }) => {
                const RADIAN = Math.PI / 180
                const radius = 12 + innerRadius + (outerRadius - innerRadius)
                const x = cx + radius * Math.cos(-midAngle * RADIAN)
                const y = cy + radius * Math.sin(-midAngle * RADIAN)

                // Lógica para encurtar o nome do produto
                const productName = data[index].product.length > 12 
                  ? data[index].product.substring(0, 12).concat('...') 
                  : data[index].product;

                return (
                  <text
                    x={x}
                    y={y}
                    className='fill-muted-foreground text-xs'
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline='central'
                  >
                    {`${productName} (${value})`}
                  </text>
                )
              }}
            >
              {data.map((_, index) => {
                return (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index]} 
                    className='stroke-background hover:opacity-80'
                  />
                )
              })}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}