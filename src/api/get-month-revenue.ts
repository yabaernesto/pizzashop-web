import { api } from '@/lib/axios';

export interface GetDailyRevenueInPeriodQuery {
  from?: Date;
  to?: Date;
}

export type GetMonthRevenueResponse = {
  receipt: number;
  diffFromLastMonth: number;
};

export async function getMonthRevenue({
  from,
  to,
}: GetDailyRevenueInPeriodQuery) {
  const response = await api.get<GetMonthRevenueResponse>(
    '/metrics/month-receipt',
    {
      params: {
        from,
        to,
      },
    },
  );

  return response.data;
}
