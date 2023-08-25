import { TestBed } from '@angular/core/testing'
import { UsersApiService } from '@geonetwork-ui/data-access/gn4'
import { USERS_FIXTURE } from '@geonetwork-ui/util-shared/fixtures'
import { of } from 'rxjs'

import { UsersService } from './users.service'

class UsersApiServiceMock {
  getUsers = jest.fn(() => of(USERS_FIXTURE()))
}

describe('UsersService', () => {
  let service: UsersService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UsersApiService,
          useClass: UsersApiServiceMock,
        },
      ],
    })
    TestBed.inject(UsersApiService)
    service = TestBed.inject(UsersService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
