import { http, HttpResponse } from 'msw'

import type { 
  GetOrdersDetailsParams, 
  GetOrderDetailsResponse
} from '../get-order-details'

export const getOrdersDetailsMock = http.get<
  GetOrdersDetailsParams,
  never, 
  GetOrderDetailsResponse
>(
  `/orders/:orderId`, ({ params }) => {
    return HttpResponse.json({
      id: params.orderId,
      customer: {
        name: 'John Doe',
        email: 'joedoe@example.com',
        phone: '00121834100',
      },
      status: 'pending',
      createdAt: new Date().toISOString(),
      totalInCents: 5000,
      orderItems: [
        {
          id: 'order-item-1',
          priceInCents: 1000,
          product: { name: 'Pizza Pepperoni' },
          quantity: 1,
        },
        {
          id: 'order-item-2',
          priceInCents: 2000,
          product: { name: 'Hambuerguer' },
          quantity: 5,
        },
      ]
    })
  }
)
