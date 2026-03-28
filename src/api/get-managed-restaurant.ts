import { api } from "@/lib/axios";

interface RetManagerRestaurantResponse {
  name: string;
  id: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  description: string | null;
  managerId: string | null;
}

export async function getManagerRestaurant() {
  const response = await api.get<RetManagerRestaurantResponse>('/managed-restaurant')

  return response.data
}
