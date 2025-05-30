import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TemplatesComponent } from './templates.component'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { Component } from '@angular/core'
import { RecordsListComponent } from '../records-list.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'

@Component({
  selector: 'md-editor-records-list',
  template: '',
  standalone: true,
})
export class MockRecordsListComponent {}

class SearchFacadeMock {
  resetSearch = jest.fn()
}

describe('MyLibraryComponent', () => {
  let component: TemplatesComponent
  let fixture: ComponentFixture<TemplatesComponent>
  let searchFacade: SearchFacade

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideI18n(),
        {
          provide: SearchFacade,
          useClass: SearchFacadeMock,
        },
      ],
    }).overrideComponent(TemplatesComponent, {
      remove: {
        imports: [RecordsListComponent],
      },
      add: {
        imports: [MockRecordsListComponent],
      },
    })
    searchFacade = TestBed.inject(SearchFacade)
    fixture = TestBed.createComponent(TemplatesComponent)
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
