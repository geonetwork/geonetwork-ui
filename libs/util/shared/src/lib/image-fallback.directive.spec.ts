import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { ImageFallbackDirective } from './image-fallback.directive'

@Component({
  template: ` <img
    [src]="'http://test.com/img.png'"
    [fallbackUrl]="'/assets/img/placeholder.svg'"
    gnUiImageFallback
  />`,
  imports: [ImageFallbackDirective],
  standalone: true,
})
class TestComponent {}

describe('ImageFallbackDirective', () => {
  let de
  beforeEach(() => {
    const fixture = TestBed.configureTestingModule({}).createComponent(
      TestComponent
    )
    fixture.detectChanges()
    de = fixture.debugElement.query(By.directive(ImageFallbackDirective))
  })

  it('should use src url', () => {
    expect(de.nativeElement.src).toEqual('http://test.com/img.png')
  })
  describe('if error occurs', () => {
    let srcSpy
    beforeEach(() => {
      srcSpy = jest.spyOn(de.nativeElement, 'src', 'set')
      de.triggerEventHandler('error')
    })
    it('should set placeholder url', () => {
      expect(de.nativeElement.src).toEqual(
        'http://localhost/assets/img/placeholder.svg'
      )
      expect(srcSpy).toHaveBeenCalledTimes(1)
    })
  })
  describe('if error occurs with fallback url', () => {
    let srcSpy
    beforeEach(() => {
      de.nativeElement.src = 'http://localhost/assets/img/placeholder.svg'
      srcSpy = jest.spyOn(de.nativeElement, 'src', 'set')
      de.triggerEventHandler('error')
    })
    it('does not change url again to avoid infinite loop', () => {
      expect(srcSpy).not.toHaveBeenCalled()
    })
  })
})
