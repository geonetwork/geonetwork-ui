import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormFieldInspireThemeComponent } from './form-field-inspire-theme.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('FormFieldInspireThemeComponent', () => {
  let component: FormFieldInspireThemeComponent
  let fixture: ComponentFixture<FormFieldInspireThemeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideI18n()],
    }).compileComponents()

    fixture = TestBed.createComponent(FormFieldInspireThemeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should set value via @Input', () => {
    component.value = ['theme1']
    expect(component.themes).toEqual(['theme1'])
  })

  it('should add a theme and emit valueChange', () => {
    const emitSpy = jest.spyOn(component.valueChange, 'emit')
    component.handleItemSelection(['theme1'])

    expect(component.themes).toContain('theme1')
    expect(emitSpy).toHaveBeenCalledWith(['theme1'])
  })

  it('should remove a theme and emit valueChange', () => {
    const emitSpy = jest.spyOn(component.valueChange, 'emit')
    component.value = ['theme1', 'theme2']
    component.removeTheme('theme1')

    expect(component.themes).toEqual(['theme2'])
    expect(emitSpy).toHaveBeenCalledWith(['theme2'])
  })

  it('should return empty string if theme does not exist', () => {
    const result = component.getTranslatedTheme('unknown')
    expect(result).toBe('')
  })

  it('should handle item selection by adding theme', () => {
    const emitSpy = jest.spyOn(component.valueChange, 'emit')

    component.handleItemSelection(['themeX'])

    expect(component.themes).toContain('themeX')
    expect(emitSpy).toHaveBeenCalledWith(['themeX'])
  })
})
