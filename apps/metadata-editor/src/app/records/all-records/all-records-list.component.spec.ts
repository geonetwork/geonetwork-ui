import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { AllRecordsComponent } from './all-records-list.component'
import { Component, importProvidersFrom } from '@angular/core'
import { RecordsListComponent } from '../records-list.component'
import { TranslateModule } from '@ngx-translate/core'

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

describe('AllRecordsComponent', () => {
  let component: AllRecordsComponent
  let fixture: ComponentFixture<AllRecordsComponent>
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
    }).overrideComponent(AllRecordsComponent, {
      remove: {
        imports: [RecordsListComponent],
      },
      add: {
        imports: [MockRecordsListComponent],
      },
    })
    searchFacade = TestBed.inject(SearchFacade)
    fixture = TestBed.createComponent(AllRecordsComponent)
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
