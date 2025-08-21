import { AuthProvider } from '../types/auth'

export interface Identity {
  id?: string
  user_id: string
  provider: AuthProvider
  provider_id?: string
  provider_email?: string
}
