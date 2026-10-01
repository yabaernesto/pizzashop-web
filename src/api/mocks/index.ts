import { setupWorker } from 'msw/browser'

import { env } from '@/env'

import { signInMock } from './sign-in-mock'
import { getProfileMock } from './get-profile-mock'
import { updateProfileMock } from './update-profile-mock'
import { getMonthRevenueMock } from './get-month-revenue-mock'
import { registerRestaurantMock } from './register-restaurant-mock'
import { getPopularProductsMock } from './get-popular-products-mock'
import { getDayOrdersAmountMock } from './get-day-orders-amount-mock'
import { getManagedRestaurantMock } from './get-managed-restaurant-mock'
import { getMonthOrdersAmountMock } from './get-month-orders-amount-mock'
import { getDailyRevenueInPeriodMock } from './get-daily-revenue-in-period-mock'
import { getMonthCanceledOrdersAmountMock } from './get-month-canceled-orders-amount-mock'

export const worker = setupWorker(
  signInMock,
  registerRestaurantMock,
  getDayOrdersAmountMock,
  getMonthOrdersAmountMock,
  getMonthCanceledOrdersAmountMock,
  getMonthRevenueMock,
  getDailyRevenueInPeriodMock,
  getPopularProductsMock,
  getProfileMock,
  updateProfileMock,
  getManagedRestaurantMock,
)

export async function enableMSW() {
  if (env.MODE !== 'test') {
    return
  }

  await worker.start()
}
