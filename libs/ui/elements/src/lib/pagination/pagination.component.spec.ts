import { ChangeDetectionStrategy } from '@angular/core'
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
      imports: [PaginationComponent, TranslateModule.forRoot()],
    })
      .overrideComponent(PaginationComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()

    fixture = TestBed.createComponent(PaginationComponent)
    component = fixture.componentInstance
    component.currentPage = 10
    component.nPages = 10
    component.hideButton = false
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('next button', () => {
    let btn
    describe('by default', () => {
      beforeEach(() => {
        btn = fixture.debugElement.query(By.css('gn-ui-button[type=secondary]'))
      })
      it('is displayed', () => {
        expect(btn).toBeTruthy()
      })
    })
    describe('if hidden', () => {
      beforeEach(() => {
        component.hideButton = true
        fixture.detectChanges()
        btn = fixture.debugElement.query(By.css('gn-ui-button[type=secondary]'))
      })
      it('is displayed', () => {
        expect(btn).toBeFalsy()
      })
    })
  })

  it('should navigate_next be disabled', () => {
    const isDisabled = fixture.debugElement.queryAll(
      By.directive(ButtonComponent)
    )[0].componentInstance.disabled
    expect(isDisabled).toBeTruthy()
  })

  it('should navigate_previous be enabled', () => {
    const isDisabled = fixture.debugElement.queryAll(
      By.directive(ButtonComponent)
    )[1].componentInstance.disabled
    expect(isDisabled).toBeFalsy()
  })
})
