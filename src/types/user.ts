export interface IUser {
  id: number
  email: string
  username: string
  fullName: string
  status: boolean
  createdAt: string
  updatedAt: string
  photo?: string
  provider: string
}
