import { TestBed } from '@angular/core/testing'
import { GroupsApiService } from '@geonetwork-ui/data-access/gn4'
import { of } from 'rxjs'

import { GroupService } from './group.service'

const groupsApiMock = [
  {
    name: 'agence',
    label: { eng: 'AGENCE-DE-TEST' },
    description: 'une agence',
    logo: 'logo-ag.png',
  },
  {
    name: 'association',
    label: { eng: 'Association National du testing' },
    description: 'une association',
    logo: 'logo-asso.png',
  },
]

const groupsApiServiceMock = {
  getGroups: jest.fn(() => of(groupsApiMock)),
}

describe('GroupsService', () => {
  let service: GroupService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: GroupsApiService,
          useValue: groupsApiServiceMock,
        },
      ],
    })
    service = TestBed.inject(GroupService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
