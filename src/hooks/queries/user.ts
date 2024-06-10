import { GetResponseWithStatusType, IUser } from '@/types'
import { QueryProps, useGetQuery } from './common'
import { getUserProfile } from '@/api'

export const useUserProfileQuery = (props?: QueryProps<GetResponseWithStatusType<IUser>>) =>
  useGetQuery('user-profile', getUserProfile, [], props)
