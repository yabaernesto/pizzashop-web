import { api } from "@/lib/axios";

interface GetMothCanceledOrdersAmountResponse {
  amount: number;
  diffFromLastMonth: number;
}

export async function getMonthCanceledOrdersAmount() {
  const response = await api.get<GetMothCanceledOrdersAmountResponse>(
    "/metrics/month-canceled-orders-amount"
  )

  return response.data
}
