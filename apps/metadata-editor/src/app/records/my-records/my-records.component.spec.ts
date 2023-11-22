import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MyRecordsComponent } from './my-records.component'
import { FieldsService, SearchFacade } from '@geonetwork-ui/feature/search'
import { Component, importProvidersFrom, Input } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { RecordsListComponent } from '../records-list.component'
import { BehaviorSubject, of } from 'rxjs'
import { USER_FIXTURE } from '@geonetwork-ui/common/fixtures'
import { AuthService } from '@geonetwork-ui/api/repository/gn4'
import { EditorRouterService } from '../../router.service'

@Component({
  // eslint-disable-next-line
  selector: 'md-editor-records-list',
  template: '',
  standalone: true,
})
export class MockRecordsListComponent {
  @Input() linkToDatahub: string
}
const user = USER_FIXTURE()

class SearchFacadeMock {
  resetSearch = jest.fn()
  updateFilters = jest.fn()
}
class EditorRouterServiceMock {
  getDatahubSearchRoute = jest.fn(() => `/datahub/`)
}

class AuthServiceMock {
  user$ = new BehaviorSubject(user)
  authReady = jest.fn(() => this._authSubject$)
  _authSubject$ = new BehaviorSubject({})
}

class FieldsServiceMock {
  buildFiltersFromFieldValues = jest.fn((val) => of(val))
}

describe('MyRecordsComponent', () => {
  let component: MyRecordsComponent
  let fixture: ComponentFixture<MyRecordsComponent>
  let searchFacade: SearchFacade

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        importProvidersFrom(TranslateModule.forRoot()),
        {
          provide: FieldsService,
          useClass: FieldsServiceMock,
        },
        {
          provide: SearchFacade,
          useClass: SearchFacadeMock,
        },
        {
          provide: AuthService,
          useClass: AuthServiceMock,
        },
        {
          provide: EditorRouterService,
          useClass: EditorRouterServiceMock,
        },
      ],
    }).overrideComponent(MyRecordsComponent, {
      remove: {
        imports: [RecordsListComponent],
      },
      add: {
        imports: [MockRecordsListComponent],
      },
    })
    searchFacade = TestBed.inject(SearchFacade)
    fixture = TestBed.createComponent(MyRecordsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('filters', () => {
    it('clears filters on init', () => {
      expect(searchFacade.resetSearch).toHaveBeenCalled()
    })
    it('Update filters on init', () => {
      expect(searchFacade.updateFilters).toHaveBeenCalledWith({
        owner: user.id,
      })
    })
  })

  describe('datahub url', () => {
    it('get correct url', () => {
      expect(component.getDatahubUrl()).toEqual(
        'http://localhost/datahub/?owner=46798'
      )
    })
  })
})
