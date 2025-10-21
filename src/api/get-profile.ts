import { api } from '@/lib/axios'

type GetProfileResponse = {
  name: string
  email: string
  phone: string | null
  id: string
  role: 'manager' | 'customer' | null
  createdAt: Date
  updatedAt: Date
}

export async function getProfile() {
  const response = await api.get<GetProfileResponse>('/me')

  return response.data
}
