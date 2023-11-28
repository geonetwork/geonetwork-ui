export interface UserModel {
  id: string
  profile: string
  username: string
  name: string
  surname: string
  email: string
  organisation: string
  profileIcon?: string
}

export interface UserModela {
  enabled?: boolean
  emailAddresses?: Set<string>
  organisation?: string
  kind?: string
  lastLoginDate?: string
  accountNonExpired?: boolean
  accountNonLocked?: boolean
  credentialsNonExpired?: boolean
}
