import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { By } from '@angular/platform-browser'

import { FacetItemComponent } from './facet-item.component'
import { TranslateModule } from '@ngx-translate/core'

describe('FacetItemComponent', () => {
  let component: FacetItemComponent
  let fixture: ComponentFixture<FacetItemComponent>
  let de: DebugElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacetItemComponent],
      imports: [FormsModule, TranslateModule.forRoot()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetItemComponent)
    component = fixture.componentInstance
    de = fixture.debugElement
    fixture.detectChanges()
  })

  it('should create with default state', () => {
    expect(component).toBeTruthy()
    expect(de.query(By.css('input')).nativeElement.checked).toBeFalsy()
    expect(de.query(By.css('.icon-exclude'))).toBeTruthy()
    expect(de.query(By.css('.icon-include'))).toBeFalsy()
  })

  describe('Inputs label and count', () => {
    beforeEach(() => {
      component.label = 'my_label'
      component.count = 42
      fixture.detectChanges()
    })
    it('sets the label and count', () => {
      const label = de.query(By.css('label'))
      expect(label.nativeElement.textContent).toBe(' my_label (42)')
    })
  })

  describe('Input selected', () => {
    beforeEach(() => {
      component.selected = true
      fixture.detectChanges()
    })
    it('sets the input to checked', () => {
      expect(de.query(By.css('input')).nativeElement.checked).toBeTruthy()
    })
  })

  describe('Input inverted', () => {
    beforeEach(() => {
      component.inverted = true
      fixture.detectChanges()
    })
    it('shows an icon to include', () => {
      expect(de.query(By.css('.icon-include'))).toBeTruthy()
      expect(de.query(By.css('.icon-exclude'))).toBeFalsy()
    })
  })

  describe('Output selected', () => {
    let input: DebugElement
    beforeEach(() => {
      component.selected = true
      fixture.detectChanges()
      input = de.query(By.css('input'))
    })
    it('outputs the toggled selected value', () => {
      jest.spyOn(component.selectedChange, 'emit')
      input.nativeElement.click()
      expect(component.selectedChange.emit).toHaveBeenCalledWith(false)
    })
  })

  describe('Output inverted', () => {
    let icon: DebugElement
    beforeEach(() => {
      component.inverted = true
      fixture.detectChanges()
      icon = de.query(By.css('.icon-include'))
    })
    it('outputs the toggled inverted value', () => {
      jest.spyOn(component.invertedChange, 'emit')
      icon.nativeElement.click()
      expect(component.invertedChange.emit).toHaveBeenCalledWith(false)
    })
  })
})
