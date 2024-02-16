import { MyOrgUsersComponent } from './my-org-users.component'
import { of } from 'rxjs'
import { MyOrgService } from '@geonetwork-ui/feature/catalog'

describe('MyOrgUsersComponent', () => {
  let component: MyOrgUsersComponent
  let myOrgService: MyOrgService

  beforeEach(() => {
    const myOrgServiceMock = {
      myOrgData$: of({
        orgName: 'wizard-org',
        logoUrl: 'https://my-geonetwork.org/logo11.png',
        recordCount: 10,
        userCount: 3,
        userList: [
          {
            id: '161',
            profile: 'Administrator',
            username: 'ghost16',
            name: 'Ghost',
            surname: 'Old',
            email: 'old.ghost@wiz.fr',
            organisation: 'wizard-org',
            profileIcon:
              'https://www.gravatar.com/avatar/dbdffd183622800bcf8587328daf43a6?d=mp',
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
            surname: 'Dumbledore',
            email: 'albus.dumble@wiz.com',
            organisation: 'wizard-org',
          },
        ],
      }),
    }

    myOrgService = myOrgServiceMock as any
    component = new MyOrgUsersComponent(myOrgService)
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('Get organization users info', () => {
    let orgData

    beforeEach(() => {
      orgData = null
      component.orgData$.subscribe((data) => (orgData = data))
    })

    it('should get the org name', () => {
      expect(orgData.orgName).toEqual('wizard-org')
    })

    it('should get the org logo', () => {
      expect(orgData.logoUrl).toEqual('https://my-geonetwork.org/logo11.png')
    })

    it('should get the list of users', () => {
      expect(orgData.userList).toEqual([
        {
          id: '161',
          profile: 'Administrator',
          username: 'ghost16',
          name: 'Ghost',
          surname: 'Old',
          email: 'old.ghost@wiz.fr',
          organisation: 'wizard-org',
          profileIcon:
            'https://www.gravatar.com/avatar/dbdffd183622800bcf8587328daf43a6?d=mp',
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
          surname: 'Dumbledore',
          email: 'albus.dumble@wiz.com',
          organisation: 'wizard-org',
        },
      ])
    })
  })
})
