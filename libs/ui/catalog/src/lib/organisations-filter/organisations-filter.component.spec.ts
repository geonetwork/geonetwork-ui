import { ComponentFixture, TestBed } from '@angular/core/testing'
import { OrganisationsFilterComponent } from './organisations-filter.component'
import { TranslateModule } from '@ngx-translate/core'
import { MockBuilder } from 'ng-mocks'

describe('OrganisationsOrderComponent', () => {
  let component: OrganisationsFilterComponent
  let fixture: ComponentFixture<OrganisationsFilterComponent>

  beforeEach(() => {
    return MockBuilder(OrganisationsFilterComponent)
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
    }).compileComponents()

    fixture = TestBed.createComponent(OrganisationsFilterComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
