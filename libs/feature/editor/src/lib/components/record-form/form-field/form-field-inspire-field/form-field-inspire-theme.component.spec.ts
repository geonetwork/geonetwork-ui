import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormFieldInspireThemeComponent } from './form-field-inspire-theme.component'
import { lastValueFrom } from 'rxjs'
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
    component.addTheme('theme1')

    expect(component.themes).toContain('theme1')
    expect(emitSpy).toHaveBeenCalledWith(['theme1'])
  })

  it('should not add duplicate theme', () => {
    const emitSpy = jest.spyOn(component.valueChange, 'emit')
    component.value = ['theme1']
    component.addTheme('theme1')

    expect(component.themes).toEqual(['theme1'])
    expect(emitSpy).not.toHaveBeenCalled()
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

  it('should filter availableThemes in autoCompleteAction', async () => {
    const query = component.availableThemes[0].value.substring(0, 3)

    const results = await lastValueFrom(component.autoCompleteAction(query))

    expect(results.length).toBeGreaterThan(0)
    expect(results[0].value.toLowerCase()).toContain(query.toLowerCase())
  })

  it('should handle item selection by adding theme', () => {
    const emitSpy = jest.spyOn(component.valueChange, 'emit')
    const item = { title: 'Test', value: 'themeX' }

    component.handleItemSelection(item)

    expect(component.themes).toContain('themeX')
    expect(emitSpy).toHaveBeenCalledWith(['themeX'])
  })
})
