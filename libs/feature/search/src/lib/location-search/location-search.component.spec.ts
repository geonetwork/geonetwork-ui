import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AutocompleteItem } from '@geonetwork-ui/ui/inputs'
import { TranslateModule } from '@ngx-translate/core'
import { Observable } from 'rxjs'
import { LocationSearchComponent } from './location-search.component'

@Component({
  selector: 'gn-ui-autocomplete',
  template: `<div></div>`,
})
class MockAutoCompleteComponent {
  @Input() placeholder: string
  @Input() action: (value: string) => Observable<AutocompleteItem[]>
  @Input() value?: AutocompleteItem
  @Input() clearOnSelection = false
  @Input() icon = 'search'
  @Output() itemSelected = new EventEmitter<AutocompleteItem>()
  @Output() inputSubmitted = new EventEmitter<string>()
}

describe('LocationSearchComponent', () => {
  let component: LocationSearchComponent
  let fixture: ComponentFixture<LocationSearchComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationSearchComponent, MockAutoCompleteComponent],
      imports: [TranslateModule.forRoot()],
    }).compileComponents()

    fixture = TestBed.createComponent(LocationSearchComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
