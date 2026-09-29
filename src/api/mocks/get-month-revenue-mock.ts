import { http, HttpResponse } from 'msw'

import type { GetMothRevenueResponse } from '../get-month-revenue'

export const getMonthRevenueMock = http.get<
  never,
  never,
  GetMothRevenueResponse
>(
  '/metrics/month-receipt', 
  () => {
    return HttpResponse.json({
      receipt: 20000,
      diffFromLastMonth: 10,
    })
  }
)
