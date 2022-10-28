import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { PaginationComponent } from './pagination.component'
import { TranslateModule } from '@ngx-translate/core'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'

describe('PaginationComponent', () => {
  let component: PaginationComponent
  let fixture: ComponentFixture<PaginationComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent, ButtonComponent],
      imports: [TranslateModule.forRoot()],
    }).compileComponents()

    fixture = TestBed.createComponent(PaginationComponent)
    component = fixture.componentInstance
    component.currentPage = 10
    component.nPages = 10
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should navigation_next be disabled', () => {
    fixture.detectChanges()
    const isDisabled = fixture.debugElement.query(By.css('#navigate_next'))
      .componentInstance.disabled
    expect(isDisabled).toBeTruthy()
  })

  it('should navigate_previous be enabled', () => {
    fixture.detectChanges()
    const isDisabled = fixture.debugElement.query(By.css('#navigate_previous'))
      .componentInstance.disabled
    expect(isDisabled).toBeFalsy()
  })
})
