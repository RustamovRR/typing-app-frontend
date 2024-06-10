import { ILoginRegisterParams, ILoginResponse, IRegisterResponse } from '@/types'
import { fetchApi } from './common'

export const loginApi = async (body: ILoginRegisterParams): Promise<ILoginResponse> => {
  return fetchApi('/auth/login/', 'POST', { body })
}

export const registerApi = async (body: ILoginRegisterParams): Promise<IRegisterResponse> => {
  return fetchApi('/auth/register/', 'POST', { body })
}
