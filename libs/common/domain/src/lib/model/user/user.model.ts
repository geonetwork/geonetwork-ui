export interface MeUserModel {
  id: string
  profile: string
  username: string
  name: string
  surname: string
  email: string
  organisation: string
  profileIcon?: string
}

export interface UserModel {
  profile?: string
  surname?: string
  enabled?: boolean
  username?: string
  id?: number
  email?: string
  emailAddresses?: Set<string>
  organisation?: string
  kind?: string
  lastLoginDate?: string
  accountNonExpired?: boolean
  accountNonLocked?: boolean
  credentialsNonExpired?: boolean
  name?: string
}
