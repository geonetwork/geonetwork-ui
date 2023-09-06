import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { SearchRecordsComponent } from './search-records-list.component'
import { Component, importProvidersFrom, Input } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject } from 'rxjs'
import { RecordsListComponent } from '../records-list.component'

@Component({
  // eslint-disable-next-line
  selector: 'md-editor-records-list',
  template: '',
  standalone: true,
})
export class MockRecordsListComponent {
  @Input() title: string
}

class SearchFacadeMock {
  searchFilters$ = new BehaviorSubject({
    any: 'hello world',
  })
}

describe('SearchRecordsComponent', () => {
  let component: SearchRecordsComponent
  let fixture: ComponentFixture<SearchRecordsComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        importProvidersFrom(TranslateModule.forRoot()),
        {
          provide: SearchFacade,
          useClass: SearchFacadeMock,
        },
      ],
    }).overrideComponent(SearchRecordsComponent, {
      remove: {
        imports: [RecordsListComponent],
      },
      add: {
        imports: [MockRecordsListComponent],
      },
    })
    fixture = TestBed.createComponent(SearchRecordsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
