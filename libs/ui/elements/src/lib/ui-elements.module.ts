import { NgModule } from '@angular/core'
import { CommonModule, NgOptimizedImage } from '@angular/common'
import { RouterModule } from '@angular/router'
import { MatTooltipModule } from '@angular/material/tooltip'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { PopoverComponent, UiWidgetsModule } from '@geonetwork-ui/ui/widgets'
import { MaxLinesComponent, UiLayoutModule } from '@geonetwork-ui/ui/layout'
import { TranslateModule } from '@ngx-translate/core'
import { ThumbnailComponent } from './thumbnail/thumbnail.component'
import {
  BadgeComponent,
  TextInputComponent,
  UiInputsModule,
} from '@geonetwork-ui/ui/inputs'
import { FormsModule } from '@angular/forms'
import { AvatarComponent } from './avatar/avatar.component'
import { UserPreviewComponent } from './user-preview/user-preview.component'
import { MarkdownParserComponent } from './markdown-parser/markdown-parser.component'
import { TimeSincePipe } from './user-feedback-item/time-since.pipe'
import { provideNgIconsConfig } from '@ng-icons/core'

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
  ],
})
export class UiElementsModule {}
