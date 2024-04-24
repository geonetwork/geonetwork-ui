import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'
import { UserFeedbackItemComponent } from './user-feedback-item.component'
import { ChangeDetectionStrategy } from '@angular/core'
import { SOME_USER_FEEDBACKS } from '@geonetwork-ui/common/fixtures'
import { TimeSincePipe } from './time-since.pipe'

describe('UserFeedbackItemComponent', () => {
  let component: UserFeedbackItemComponent
  let fixture: ComponentFixture<UserFeedbackItemComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFeedbackItemComponent],
      imports: [TranslateModule.forRoot(), TimeSincePipe],
    })
      .overrideComponent(UserFeedbackItemComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFeedbackItemComponent)
    component = fixture.componentInstance
    component.userFeedbackParent = { ...SOME_USER_FEEDBACKS[0], avatarUrl: '' }
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('publishNewAnswer()', () => {
    it('should not emit new answer if new answer is empty', () => {
      component.newAnswer = ''
      component.newUserFeedbackAnswer.emit = jest.fn()
      component.publishNewAnswer()
      expect(component.newUserFeedbackAnswer.emit).not.toHaveBeenCalled()
    })

    it('should emit new answer if new answer is not empty', () => {
      component.newAnswer = 'This is a new answer'
      component.newUserFeedbackAnswer.emit = jest.fn()
      component.publishNewAnswer()
      expect(component.newUserFeedbackAnswer.emit).toHaveBeenCalled()
    })
  })

  describe('onNewAnswerValueChange()', () => {
    it('should set isAnswerEmpty to true if new answer is empty', () => {
      component.newAnswer = ''
      component.onNewAnswerValueChange()
      expect(component.isAnswerEmpty).toBe(true)
    })

    it('should set isAnswerEmpty to false if new answer is not empty', () => {
      component.newAnswer = 'This is a new answer'
      component.onNewAnswerValueChange()
      expect(component.isAnswerEmpty).toBe(false)
    })
  })
})
