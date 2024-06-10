import { loginApi, registerApi } from '@/api'
import { ILoginRegisterParams, ILoginResponse, IRegisterResponse } from '@/types'
import { useCustomMutation } from './common'

export const useLoginMutation = () => useCustomMutation<ILoginRegisterParams, ILoginResponse>(loginApi)

export const useUserRegisterMutation = () => useCustomMutation<ILoginRegisterParams, IRegisterResponse>(registerApi)
