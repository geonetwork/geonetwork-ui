import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { ImageFallbackDirective } from './image-fallback.directive'

@Component({
  template: ` <img
    [src]="'http://test.com/img.png'"
    [fallbackUrl]="'http://localhost/assets/img/placeholder.svg'"
    gnUiImageFallback
  />`,
})
class TestComponent {}

let de

beforeEach(() => {
  const fixture = TestBed.configureTestingModule({
    declarations: [ImageFallbackDirective, TestComponent],
  }).createComponent(TestComponent)
  fixture.detectChanges()
  de = fixture.debugElement.query(By.directive(ImageFallbackDirective))
})

describe('ImageFallbackDirective', () => {
  it('should create an instance', () => {
    const directive = new ImageFallbackDirective()
    expect(directive).toBeTruthy()
  })
  it('should use src url', () => {
    expect(de.nativeElement.src).toEqual('http://test.com/img.png')
  })
  describe('if error occurs', () => {
    beforeEach(() => {
      de.triggerEventHandler('error')
    })
    it('should use placeholder url', () => {
      expect(de.nativeElement.src).toEqual(
        'http://localhost/assets/img/placeholder.svg'
      )
    })
  })
})
