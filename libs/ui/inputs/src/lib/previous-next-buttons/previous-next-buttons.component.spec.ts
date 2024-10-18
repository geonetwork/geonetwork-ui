import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PreviousNextButtonsComponent } from './previous-next-buttons.component'
import { TranslateModule } from '@ngx-translate/core'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'

describe('PreviousNextButtonsComponent', () => {
  let component: PreviousNextButtonsComponent
  let fixture: ComponentFixture<PreviousNextButtonsComponent>
  let compiled: DebugElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviousNextButtonsComponent, TranslateModule.forRoot()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousNextButtonsComponent)
    component = fixture.componentInstance
    compiled = fixture.debugElement
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('onFirstElement', () => {
    beforeEach(() => {
      component.isFirst = true
      component.isLast = false
      fixture.detectChanges()
    })

    it('previous button should be disabled', () => {
      const previousButton = compiled.query(
        By.css('[data-test="previousButton"]')
      )
      expect(previousButton.attributes['ng-reflect-disabled']).toEqual('true')
    })

    it("next button shouldn't be disabled", () => {
      const nextButton = compiled.query(By.css('[data-test="nextButton"]'))
      expect(nextButton.attributes['ng-reflect-disabled']).toEqual('false')
    })
  })

  describe('onLastElement', () => {
    beforeEach(() => {
      component.isFirst = false
      component.isLast = true
      fixture.detectChanges()
    })

    it('previous button should be disabled', () => {
      const previousButton = compiled.query(
        By.css('[data-test="previousButton"]')
      )
      expect(previousButton.attributes['ng-reflect-disabled']).toEqual('false')
    })

    it("next button shouldn't be disabled", () => {
      const nextButton = compiled.query(By.css('[data-test="nextButton"]'))
      expect(nextButton.attributes['ng-reflect-disabled']).toEqual('true')
    })
  })
})
