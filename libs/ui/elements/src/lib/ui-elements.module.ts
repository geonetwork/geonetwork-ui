import { CommonModule, NgOptimizedImage } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MatTooltipModule } from '@angular/material/tooltip'
import { RouterModule } from '@angular/router'
import {
  BadgeComponent,
  TextInputComponent,
  UiInputsModule,
} from '@geonetwork-ui/ui/inputs'
import { MaxLinesComponent, UiLayoutModule } from '@geonetwork-ui/ui/layout'
import { PopoverComponent, UiWidgetsModule } from '@geonetwork-ui/ui/widgets'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { provideNgIconsConfig } from '@ng-icons/core'
import { TranslateModule } from '@ngx-translate/core'
import { AvatarComponent } from './avatar/avatar.component'
import { ImageInputComponent } from './image-input/image-input.component'
import { MarkdownParserComponent } from './markdown-parser/markdown-parser.component'
import { ThumbnailComponent } from './thumbnail/thumbnail.component'
import { TimeSincePipe } from './user-feedback-item/time-since.pipe'
import { UserPreviewComponent } from './user-preview/user-preview.component'

@NgModule({
  imports: [
    CommonModule,
    MatTooltipModule,
    UiWidgetsModule,
    UiLayoutModule,
    TranslateModule.forChild(),
    UtilSharedModule,
    RouterModule,
    UiInputsModule,
    FormsModule,
    NgOptimizedImage,
    PopoverComponent,
    MarkdownParserComponent,
    ThumbnailComponent,
    TimeSincePipe,
    BadgeComponent,
    MaxLinesComponent,
    TextInputComponent,
    ImageInputComponent,
  ],
  providers: [
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
  declarations: [AvatarComponent, UserPreviewComponent],
  exports: [
    ThumbnailComponent,
    AvatarComponent,
    UserPreviewComponent,
    MarkdownParserComponent,
    ImageInputComponent,
  ],
})
export class UiElementsModule {}
