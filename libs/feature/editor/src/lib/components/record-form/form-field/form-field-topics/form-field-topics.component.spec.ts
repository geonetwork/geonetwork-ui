import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormFieldTopicsComponent } from './form-field-topics.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('FormFieldTopicsComponent', () => {
  let component: FormFieldTopicsComponent
  let fixture: ComponentFixture<FormFieldTopicsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideI18n()],
    }).compileComponents()

    fixture = TestBed.createComponent(FormFieldTopicsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should set value via @Input', () => {
    component.value = ['topic1']
    expect(component.topics).toEqual(['topic1'])
  })

  it('should add a topic and emit valueChange', () => {
    const emitSpy = jest.spyOn(component.valueChange, 'emit')
    component.handleItemSelection(['topic1'])

    expect(component.topics).toContain('topic1')
    expect(emitSpy).toHaveBeenCalledWith(['topic1'])
  })

  it('should remove a topic and emit valueChange', () => {
    const emitSpy = jest.spyOn(component.valueChange, 'emit')
    component.value = ['topic1', 'topic2']
    component.removeTopic('topic1')

    expect(component.topics).toEqual(['topic2'])
    expect(emitSpy).toHaveBeenCalledWith(['topic2'])
  })

  it('should return empty string if topic does not exist', () => {
    const result = component.getTranslatedTopic('unknown')
    expect(result).toBe('')
  })

  it('should handle item selection by adding topic', () => {
    const emitSpy = jest.spyOn(component.valueChange, 'emit')

    component.handleItemSelection(['topicX'])

    expect(component.topics).toContain('topicX')
    expect(emitSpy).toHaveBeenCalledWith(['topicX'])
  })
})
