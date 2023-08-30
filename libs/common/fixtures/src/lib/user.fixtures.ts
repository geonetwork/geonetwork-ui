import { UserModel } from '@geonetwork-ui/common/domain/user.model'

export const USER_FIXTURE = (): UserModel => ({
  id: '46798',
  profile: 'Administrator',
  username: 'Gravin',
  name: 'Arnaud',
  surname: 'De Maison',
  email: 'a.demaison@geo2france.fr',
  organisation: 'Région Hauts-de-France',
  profileIcon:
    'https://www.gravatar.com/avatar/dbdffd183622800bcf8587328daf43a6?d=mp',
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
  },
  {
    id: '2',
    profile: 'Editor',
    username: 'trinity',
    name: 'Tyfany',
    surname: 'Trinity',
    email: 't.trinity@matrix.com',
    organisation: 'The matrix',
  },
]
