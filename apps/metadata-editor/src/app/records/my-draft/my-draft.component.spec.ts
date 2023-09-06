import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MyDraftComponent } from './my-draft.component'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { Component, importProvidersFrom } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { RecordsListComponent } from '../records-list.component'

@Component({
  // eslint-disable-next-line
  selector: 'md-editor-records-list',
  template: '',
  standalone: true,
})
export class MockRecordsListComponent {}

class SearchFacadeMock {
  resetSearch = jest.fn()
}

describe('MyDraftComponent', () => {
  let component: MyDraftComponent
  let fixture: ComponentFixture<MyDraftComponent>
  let searchFacade: SearchFacade

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        importProvidersFrom(TranslateModule.forRoot()),
        {
          provide: SearchFacade,
          useClass: SearchFacadeMock,
        },
      ],
    }).overrideComponent(MyDraftComponent, {
      remove: {
        imports: [RecordsListComponent],
      },
      add: {
        imports: [MockRecordsListComponent],
      },
    })
    searchFacade = TestBed.inject(SearchFacade)
    fixture = TestBed.createComponent(MyDraftComponent)
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
  })
})
