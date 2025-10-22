import { api } from '@/lib/axios';

export type GetOrdersQuery = {
  pageIndex?: number | null;
  orderId?: string | null;
  customerName?: string | null;
  status?: string | null;
};

export type GetOrdersResponse = {
  orders: {
    orderId: string;
    createdAt: string;
    status: 'pending' | 'processing' | 'delivering' | 'delivered' | 'canceled';
    total: string;
    customerName: string;
  }[];
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
};

export async function getOrders({
  pageIndex,
  orderId,
  customerName,
  status,
}: GetOrdersQuery) {
  const response = await api.get<GetOrdersResponse>('/orders', {
    params: {
      pageIndex,
      orderId,
      customerName,
      status,
    },
  });

  return response.data;
}
