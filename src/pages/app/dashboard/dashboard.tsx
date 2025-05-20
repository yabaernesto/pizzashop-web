import { Helmet } from 'react-helmet-async';
import { MothRevenueCard } from './moth-revenue-card';
import { MothOrdersAmountCard } from './moth-orders-amount-card';
import { DayOrdersAmountCard } from './day-orders-amount-card';
import { MothCanceledOrdersAmountCard } from './moth-canceled-orders-amount-card';
import { RevenueChart } from './revenue-chart';
import { PopularProductsChart } from './popular-products-chart';

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          <MothRevenueCard />
          <MothOrdersAmountCard />
          <DayOrdersAmountCard />
          <MothCanceledOrdersAmountCard />
        </div>

        <div className="grid grid-cols-9 gap-4">
          <RevenueChart />
          <PopularProductsChart />
        </div>
      </div>
    </>
  );
}
