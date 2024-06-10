import { userUpdateApi } from '@/api'
import { ILoginResponse, IUser } from '@/types'
import { useCustomMutation } from './common'

export const useUserUpdateProfile = () =>
  useCustomMutation<Pick<IUser, 'fullName' | 'username' | 'email' | 'photo'>, ILoginResponse>(userUpdateApi)
