import { http, HttpResponse } from 'msw'

import type { GetMothOrdersAmountResponse } from '../get-month-orders-amount'

export const getMonthOrdersAmountMock = http.get<
  never,
  never,
  GetMothOrdersAmountResponse
>(
  '/metrics/month-orders-amount', 
  () => {
    return HttpResponse.json({
      amount: 200,
      diffFromLastMonth: 7,
    })
  }
)
