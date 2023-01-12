import { UserModel } from '../models'

export const USER_FIXTURE = (): UserModel => ({
  id: '46798',
  profile: 'Administrator',
  username: 'Gravin',
  name: 'Arnaud',
  surname: 'De Maison',
  email: 'a.demaison@geo2france.fr',
  organisation: 'Région Hauts-de-France',
  admin: true,
})

export const USERS_FIXTURE = (): UserModel[] => [
  USER_FIXTURE(),
  {
    id: '1',
    profile: 'Editor',
    username: 'neo',
    name: 'Tomas',
    surname: 'Anderson',
    email: 't.anderson@matrix.com',
    organisation: 'The matrix',
    admin: true,
  },
  {
    id: '2',
    profile: 'Editor',
    username: 'trinity',
    name: 'Tyfany',
    surname: 'Trinity',
    email: 't.trinity@matrix.com',
    organisation: 'The matrix',
    admin: true,
  },
]
