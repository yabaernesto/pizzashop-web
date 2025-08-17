import axios from 'axios'

import { env } from '@/env'

export const api = await axios.create({
  baseURL: env.VITE_API_URL
})
