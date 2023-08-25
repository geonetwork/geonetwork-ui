import { ComponentFixture, TestBed } from '@angular/core/testing'
import { OrganisationsSortComponent } from './organisations-sort.component'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-dropdown-selector',
  template: '',
})
class DropdownSelectorMockComponent {
  @Input() showTitle: unknown
  @Input() choices: {
    value: unknown
    label: string
  }[]
  @Input() selected: unknown
  @Output() selectValue = new EventEmitter<unknown>()
}

describe('OrganisationsOrderComponent', () => {
  let component: OrganisationsSortComponent
  let fixture: ComponentFixture<OrganisationsSortComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganisationsSortComponent, DropdownSelectorMockComponent],
      imports: [TranslateModule.forRoot()],
    }).compileComponents()

    fixture = TestBed.createComponent(OrganisationsSortComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
