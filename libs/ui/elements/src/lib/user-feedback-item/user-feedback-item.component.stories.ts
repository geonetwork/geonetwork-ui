import {
  applicationConfig,
  componentWrapperDecorator,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { CommonModule } from '@angular/common'
import { UserFeedbackItemComponent } from './user-feedback-item.component'
import { TranslateModule } from '@ngx-translate/core'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { TimeSincePipe } from './time-since.pipe'
import { HttpClientModule } from '@angular/common/http'
import { importProvidersFrom } from '@angular/core'
import { ButtonComponent, TextAreaComponent } from '@geonetwork-ui/ui/inputs'

export default {
  title: 'Elements/UserFeedbackItemComponent',
  component: UserFeedbackItemComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        UtilI18nModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
        TimeSincePipe,
        TextAreaComponent,
        ButtonComponent,
      ],
    }),
    applicationConfig({
      providers: [importProvidersFrom(HttpClientModule)],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 800px">${story}</div>`
    ),
  ],
}
export const Primary: StoryObj<UserFeedbackItemComponent> = {
  args: {
    userFeedbackParent: {
      published: true,
      avatarUrl:
        'https://hips.hearstapps.com/hmg-prod/images/red-small-german-spitz-walking-in-the-autumn-park-royalty-free-image-1580496879.jpg?crop=0.670xw:1.00xh;0.173xw,0&resize=75:*',
      authorName: 'John Doe',
      date: new Date('2024-01-01T00:00:00Z'),
      comment: 'Sample comment',
      parentUuid: null,
      uuid: '1',
      metadataUUID: '',
      authorUserId: '',
      authorEmail: '',
    },
    userFeedBacksAnswers: [
      {
        published: true,
        avatarUrl:
          'https://wp.inews.co.uk/wp-content/uploads/2019/06/Papageitaucher_Fratercula_arctica-1.jpg?resize=67,67&strip=all&quality=90',
        authorName: 'Maria Carmen',
        date: new Date('2024-03-30T00:00:00Z'),
        comment: 'Sample answer number one',
        parentUuid: '1',
        uuid: '',
        metadataUUID: '',
        authorUserId: '',
        authorEmail: '',
      },
      {
        published: true,
        avatarUrl:
          'https://resize.prod.femina.ladmedia.fr/rblr/80,80/img/var/2023-07/mourir-peut-attendre.jpg',
        authorName: 'James Bond',
        date: new Date('2024-04-18T00:00:00Z'),
        comment: 'Sample answer number two',
        parentUuid: '1',
        uuid: '',
        metadataUUID: '',
        authorUserId: '',
        authorEmail: '',
      },
    ],
    activeUser: {
      id: '1',
      email: 'john@example.com',
      name: 'John',
      surname: 'Doe',
      profile: 'ADMIN',
      username: '',
      organisation: '',
    },
    isLastComment: true,
    isAddUserFeedbackLoading: false,
  },
}
