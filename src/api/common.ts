import { BASE_API_URL } from '@/constants'
import { queryStringUrl } from '@/utils'

export const fetchApi = async <T, R = T>(
  path: string,
  method: 'GET' | 'POST' | 'DELETE' | 'PUT' = 'GET',
  args?: {
    body?: T
    params?: { [key: string]: string | number | boolean }
    withAuth?: boolean
  },
): Promise<R> => {
  const { body, params } = args || {}

  const url = params && method === 'GET' ? queryStringUrl(`${BASE_API_URL}${path}`, params) : `${BASE_API_URL}${path}`

  const headers: HeadersInit = { 'Content-Type': 'application/json' }

  const response = await fetch(url, {
    method,
    headers,
    credentials: 'include',
    body: body && method !== 'GET' ? JSON.stringify(body) : null,
  })

  // if (!response.ok) {
  //   const errorData = await response.json()
  //   throw new ApiError(errorData, response.status)
  // }

  return response.json()
}
