import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PopupAlertComponent } from './popup-alert.component'
import { Component, Input } from '@angular/core'
import { By } from '@angular/platform-browser'

@Component({
  template: '<gn-ui-popup-alert>{{message}}</gn-ui-popup-alert>',
})
class PopupAlertWrapperComponent {
  @Input() message
}

describe('PopupAlertComponent', () => {
  let wrapper: PopupAlertWrapperComponent
  let component: PopupAlertComponent
  let fixture: ComponentFixture<PopupAlertWrapperComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupAlertWrapperComponent],
      imports: [PopupAlertComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupAlertWrapperComponent)
    wrapper = fixture.componentInstance
    component = fixture.debugElement.query(
      By.directive(PopupAlertComponent)
    ).componentInstance
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(wrapper).toBeTruthy()
  })

  describe('#showDuration', () => {
    describe('with empty content', () => {
      beforeEach(() => {
        wrapper.message = ''
        fixture.detectChanges()
      })
      it('returns 3 seconds', () => {
        expect(component.showDuration).toEqual(3000)
      })
    })
    describe('with small content', () => {
      beforeEach(() => {
        wrapper.message = 'abcdefg'
        fixture.detectChanges()
      })
      it('returns 3 seconds', () => {
        expect(component.showDuration).toEqual(3000)
      })
    })
    describe('with long content', () => {
      beforeEach(() => {
        wrapper.message =
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse semper massa condimentum tortor auctor, vitae rhoncus nibh fringilla. Mauris ut volutpat purus. Mauris sed posuere quam. In ac ligula ut massa fermentum ornare. Pellentesque dignissim ex rutrum condimentum maximus. Ut placerat eleifend erat vel sodales. Sed nec lacus sodales, maximus mauris at, mollis libero. Nam vel ultricies metus. In sed placerat sem.'
        fixture.detectChanges()
      })
      it('returns more that 8 seconds', () => {
        expect(component.showDuration).toBeGreaterThan(8000)
      })
    })
  })
})
