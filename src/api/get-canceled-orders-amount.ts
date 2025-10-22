import { api } from '@/lib/axios';

export type GetCanceledOrdersAmountResponse = {
  amount: number;
  diffFromLastMonth: number;
};

export async function getCanceledOrdersAmount() {
  const response = await api.get<GetCanceledOrdersAmountResponse>(
    '/metrics/month-canceled-orders-amount',
  );

  return response.data;
}
