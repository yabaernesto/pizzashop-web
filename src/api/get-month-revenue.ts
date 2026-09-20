import { api } from "@/lib/axios";

interface GetMothRevenueResponse {
  receipt: number;
  diffFromLastMonth: number;
}

export async function getMonthRevenue() {
  const response = await api.get<GetMothRevenueResponse>(
    "/metrics/month-receipt"
  )

  return response.data
}
