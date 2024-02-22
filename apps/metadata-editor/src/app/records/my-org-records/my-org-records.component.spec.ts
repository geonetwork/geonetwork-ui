import { MyOrgRecordsComponent } from './my-org-records.component'
import { of } from 'rxjs'
import { MyOrgService } from '@geonetwork-ui/feature/catalog'
import { ORGANISATIONS_FIXTURE } from '@geonetwork-ui/common/fixtures'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { EditorRouterService } from '../../router.service'

const orgDataMock = {
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
}

const myOrgServiceMock = {
  myOrgData$: of(orgDataMock),
}

const organisationsServiceMock = {
  organisations$: of(ORGANISATIONS_FIXTURE),
}

const searchFacadeMock = {
  resetSearch: jest.fn(),
}

const routeServiceMock = {
  getDatahubSearchRoute: jest.fn(),
}

describe('MyOrgRecordsComponent', () => {
  let component: MyOrgRecordsComponent
  let searchFacade: SearchFacade
  let myOrgService: MyOrgService
  let orgServiceInterface: OrganizationsServiceInterface
  let routerService: EditorRouterService

  beforeEach(() => {
    orgServiceInterface = organisationsServiceMock as any
    myOrgService = myOrgServiceMock as any
    searchFacade = searchFacadeMock as any
    routerService = routeServiceMock as any

    component = new MyOrgRecordsComponent(
      myOrgService,
      searchFacade,
      orgServiceInterface,
      routerService
    )
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
  it('should generate the correct Datahub URL', () => {
    // Mock the router method and set orgData
    component.router.getDatahubSearchRoute = () => 'http://example.com'

    const datahubUrl = component.getDatahubUrl()

    // Assert that the generated URL contains the orgName
    expect(datahubUrl).toContain('publisher=wizard-org')
  })
})
