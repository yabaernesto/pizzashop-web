import { api } from '@/lib/axios'

type RegisterRestaurantBody = {
  restaurantName: string
  name: string
  email: string
  phone: string
}

export async function registerRestaurant({
  restaurantName,
  name,
  email,
  phone,
}: RegisterRestaurantBody) {
  await api.post('/restaurants', {
    restaurantName,
    name,
    email,
    phone,
  })
}
