import { api } from "@/lib/axios";

interface GetMothOrdersAmountResponse {
  amount: number;
  diffFromLastMonth: number;
}

export async function getMothOrdersAmount() {
  const response = await api.get<GetMothOrdersAmountResponse>(
    "/metrics/month-orders-amount"
  )

  return response.data
}
