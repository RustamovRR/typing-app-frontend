import { ILoginResponse, IUser } from '@/types'
import { fetchApi } from './common'

export const getUserProfile = async (params?: Record<string, never>) => {
  return fetchApi<never>('/user/profile/', 'GET', { params })
}

export const userUpdateApi = async (
  body: Pick<IUser, 'fullName' | 'username' | 'email' | 'photo'>,
): Promise<ILoginResponse> => {
  return fetchApi('/auth/login/', 'POST', { body })
}
