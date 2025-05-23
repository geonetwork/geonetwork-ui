import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core'
import {
  UserFeedback,
  UserFeedbackViewModel,
} from '@geonetwork-ui/common/domain/model/record'
import { UserModel } from '@geonetwork-ui/common/domain/model/user'
import { TimeSincePipe } from './time-since.pipe'
import { CommonModule } from '@angular/common'
import { ButtonComponent, TextAreaComponent } from '@geonetwork-ui/ui/inputs'
import { TranslatePipe } from '@ngx-translate/core'
import { SpinningLoaderComponent } from '@geonetwork-ui/ui/widgets'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { matSendOutline } from '@ng-icons/material-icons/outline'

@Component({
  selector: 'gn-ui-user-feedback-item',
  templateUrl: './user-feedback-item.component.html',
  styleUrls: ['./user-feedback-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    TimeSincePipe,
    TextAreaComponent,
    TranslatePipe,
    ButtonComponent,
    SpinningLoaderComponent,
    NgIcon,
  ],
  viewProviders: [
    provideIcons({
      matSendOutline,
    }),
  ],
})
export class UserFeedbackItemComponent implements OnInit {
  @Input() userFeedbackParent: UserFeedbackViewModel
  @Input() userFeedBacksAnswers: UserFeedbackViewModel[]
  @Input() activeUser: UserModel
  @Input() isLastComment: boolean
  @Input() isAddUserFeedbackLoading: boolean

  @Output() newUserFeedbackAnswer = new EventEmitter<UserFeedback>()

  isAnAnswer = false
  newAnswer = ''
  isAnswerEmpty = true

  ngOnInit(): void {
    this.isAnAnswer = !!this.userFeedbackParent.parentUuid
  }

  onNewAnswerValueChange() {
    this.isAnswerEmpty = this.newAnswer.length === 0
  }

  publishNewAnswer() {
    if (this.newAnswer.trim() === '') return

    const newAnswer: UserFeedback = {
      ...this.userFeedbackParent,
      uuid: undefined,
      published: true,
      comment: this.newAnswer,
      parentUuid: this.userFeedbackParent.uuid,
      authorUserId: this.activeUser?.id,
      authorEmail: this.activeUser?.email,
      date: new Date(),
      authorName: `${this.activeUser?.name} ${this.activeUser?.surname}`,
    }

    this.newUserFeedbackAnswer.emit(newAnswer)

    this.newAnswer = ''
    this.onNewAnswerValueChange()
  }
}
