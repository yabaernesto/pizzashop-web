import axios from 'axios'

import { env } from '@/env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  // faz com que os cookies do front-end sejam automaticamente enviado pro backend
  withCredentials: true,
})

if (env.VITE_ENABLE_API_DELAY) {
  // antes de todas as requests do axios, chame essa function
  api.interceptors.request.use(async (config) => {
    await new Promise(resolve => setTimeout(resolve, 2000))

    // config: são os dados da requisição, os headers, o body, etc...
    // Também pode ser usado para customizar os dados da requisição
    return config
  })
}
