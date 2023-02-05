import axios, { AxiosInstance, AxiosResponse } from 'axios'
import * as AxiosLogger from 'axios-logger'
import { getSessionToken } from '@/utils/auth-session'
import { getToken, JWT } from 'next-auth/jwt'
import { NextApiRequest } from 'next'

const secret = process.env.NEXT_AUTH_SECRET

const StrapiInstanceToken = async (token: JWT | null) => {
  const instance = axios.create({
    baseURL: process.env.API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  //@ts-ignore
  instance.interceptors.request.use(AxiosLogger.requestLogger, AxiosLogger.errorLogger)
  instance.interceptors.response.use(AxiosLogger.responseLogger, AxiosLogger.errorLogger)

  return instance
}
const StrapiInstance = async (req: NextApiRequest | undefined) => {
  if (!req) {
    const token = await getSessionToken()
    return StrapiInstanceToken(token)
  }

  const token = await getToken({ req, secret })
  return StrapiInstanceToken(token?.jwt as any)
}

export default async function RequestHandler<T>(apiFn: (instance: AxiosInstance) => Promise<AxiosResponse<any, T>>, req: NextApiRequest | undefined = undefined): Promise<AxiosResponse<T> | null> {
  const instance = await StrapiInstance(req)
  try {
    const response = await apiFn(instance)
    return response.data
  } catch (e: any) {
    console.log(e.response.data.error)
    return null
  }
}
