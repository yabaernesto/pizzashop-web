import axios from 'axios'

import { env } from '@/env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  // faz com que os cookies do front-end sejam automaticamente enviado pro backend
  withCredentials: true,
})
