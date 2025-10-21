import { api } from '@/lib/axios'

export type GetOrdersQuery = {
  pageIndex?: number | null
}

type GetOrdersResponse = {
  orders: {
    orderId: string
    createdAt: string
    status: 'pending' | 'processing' | 'delivering' | 'delivered' | 'canceled'
    total: string
    customerName: string
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function getOrders({ pageIndex }: GetOrdersQuery) {
  const response = await api.get<GetOrdersResponse>('/orders', {
    params: {
      pageIndex,
    },
  })

  return response.data
}
