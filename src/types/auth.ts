export interface ILoginRegisterParams {
  email: string
  password: string
}

export interface ILoginResponse {
  error?: string
  message: string
  status: boolean
  statusCode?: number
}

export interface IRegisterResponse {
  id: number
  email: string
  username: string
  fullName: string | null
  status: boolean
  createdAt: string
  updatedAt: string
  message?: string
}
