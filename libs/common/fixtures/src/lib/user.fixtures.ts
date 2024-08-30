import { UserModel } from '@geonetwork-ui/common/domain/model/user/user.model'

export const createUserFixture = (
  overrides: Partial<UserModel> = {}
): UserModel => ({
  id: '46798',
  profile: 'Administrator',
  username: 'Gravin',
  name: 'Arnaud',
  surname: 'De Maison',
  email: 'a.demaison@geo2france.fr',
  organisation: 'Région Hauts-de-France',
  profileIcon:
    'https://www.gravatar.com/avatar/dbdffd183622800bcf8587328daf43a6?d=mp',
  ...overrides,
})

export const barbieUserFixture = (): UserModel =>
  createUserFixture({
    id: '46798',
    profile: 'Administrator',
    username: 'barbie',
    name: 'Barbara',
    surname: 'Roberts',
    email: 'barbie@email.org',
    organisation: 'Barbie Inc.',
    profileIcon:
      'https://www.gravatar.com/avatar/dbdffd183622800bcf8587328daf43a6?d=mp',
  })

export const ghostUserFixture = (): UserModel =>
  createUserFixture({
    id: '161',
    profile: 'Administrator',
    username: 'ghost',
    name: 'Ghost',
    surname: 'Old',
    email: 'old.ghost@wiz.fr',
    organisation: 'wizard-org',
    profileIcon:
      'https://www.gravatar.com/avatar/dbdffd183622800bcf8587328daf43a6?d=mp',
  })

export const someUsersFixture = (): UserModel[] => [
  barbieUserFixture(),
  ghostUserFixture(),
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
  {
    id: '3',
    profile: 'Editor',
    username: 'voldy63',
    name: 'Lord',
    surname: 'Voldemort',
    email: 'lord.voldy@wiz.com',
    organisation: 'wizard-org',
  },
  {
    id: '4',
    profile: 'Editor',
    username: 'al.dumble98',
    name: 'Albus',
    surname: 'Dumblerdore',
    email: 'albus.dumble@wiz.com',
    organisation: 'wizard-org',
  },
]
