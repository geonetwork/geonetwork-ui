import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MyRecordsComponent } from './my-records.component'
import { FieldsService, SearchFacade } from '@geonetwork-ui/feature/search'
import { Component, importProvidersFrom, Input } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { RecordsListComponent } from '../records-list.component'
import { BehaviorSubject, of } from 'rxjs'
import { barbieUserFixture } from '@geonetwork-ui/common/fixtures'
import { EditorRouterService } from '../../router.service'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'

@Component({
  selector: 'md-editor-records-list',
  template: '',
  standalone: true,
})
export class MockRecordsListComponent {
  @Input() linkToDatahub: string
}
const user = barbieUserFixture()

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

const me$ = new BehaviorSubject(barbieUserFixture())
class PlatformServiceMock {
  getMe = jest.fn(() => me$)
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
          provide: PlatformServiceInterface,
          useClass: PlatformServiceMock,
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
