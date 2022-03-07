import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { ImageDirective } from './image.directive'

@Component({
  template: ` <img
    [src]="'http://test.com/img.png'"
    [placeholder]="'http://localhost/assets/img/placeholder.svg'"
    gnUiImage
  />`,
})
class TestComponent {}

let de

beforeEach(() => {
  const fixture = TestBed.configureTestingModule({
    declarations: [ImageDirective, TestComponent],
  }).createComponent(TestComponent)
  fixture.detectChanges()
  de = fixture.debugElement.query(By.directive(ImageDirective))
})

describe('ImageDirective', () => {
  it('should create an instance', () => {
    const directive = new ImageDirective()
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
