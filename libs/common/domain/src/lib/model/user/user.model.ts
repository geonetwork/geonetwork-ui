export interface UserModel {
  id: string
  profile:
    | 'Administrator'
    | 'UserAdmin'
    | 'Reviewer'
    | 'Editor'
    | 'RegisteredUser'
    | 'Guest'
    | 'Monitor'
  username: string
  name: string
  surname: string
  email: string
  organisation?: string
  profileIcon?: string
}
