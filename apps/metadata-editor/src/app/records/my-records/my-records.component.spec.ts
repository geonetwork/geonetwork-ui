import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MyRecordsComponent } from './my-records.component'
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

describe('MyRecordsComponent', () => {
  let component: MyRecordsComponent
  let fixture: ComponentFixture<MyRecordsComponent>
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
  })
})
