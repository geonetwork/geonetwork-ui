import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { EditorFacade } from '@geonetwork-ui/feature/editor'
import { type ValidatorMapperKeys } from '@geonetwork-ui/util/shared'
import { MetadataQualityComponent as GnUiMetadataQualityComponent } from '@geonetwork-ui/ui/elements'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'md-editor-metadata-quality',
  standalone: true,
  imports: [
    CommonModule,
    GnUiMetadataQualityComponent,
    TranslateDirective,
    TranslatePipe,
  ],
  providers: [],
  templateUrl: './metadata-quality.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataQualityComponent {
  record$ = this.editorFacade.record$
  propsToValidate: ValidatorMapperKeys[] = [
    'title',
    'description',
    'keywords',
    'legalConstraints',
    'contact',
    'updateFrequency',
    'topic',
  ]

  constructor(private editorFacade: EditorFacade) {}
}
