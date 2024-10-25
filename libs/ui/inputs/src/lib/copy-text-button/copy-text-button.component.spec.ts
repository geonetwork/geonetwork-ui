import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CopyTextButtonComponent } from './copy-text-button.component'

const clipboardMock = {
  writeText: jest.fn(),
}
const elementMock = {
  blur: jest.fn(),
}
const eventMock = {
  target: elementMock,
  preventDefault: jest.fn(),
}
Object.defineProperty(window, 'navigator', {
  value: { clipboard: clipboardMock },
  writable: true,
})

describe('CopyTextButtonComponent', () => {
  let component: CopyTextButtonComponent
  let fixture: ComponentFixture<CopyTextButtonComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopyTextButtonComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(CopyTextButtonComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('copyText', () => {
    beforeEach(() => {
      component.copyText(eventMock)
    })
    it('should copy text to clipboard', () => {
      expect(clipboardMock.writeText).toHaveBeenCalledWith(component.text)
    })
    it('should blur the target element', () => {
      expect(eventMock.target.blur).toHaveBeenCalled()
    })
  })
})
