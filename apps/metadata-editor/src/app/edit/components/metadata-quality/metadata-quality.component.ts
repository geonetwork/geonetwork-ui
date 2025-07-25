import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { EditorFacade } from '@geonetwork-ui/feature/editor'
import { MetadataQualityComponent as GnUiMetadataQualityComponent } from '@geonetwork-ui/ui/elements'

@Component({
  selector: 'md-editor-metadata-quality',
  standalone: true,
  imports: [CommonModule, GnUiMetadataQualityComponent],
  providers: [],
  templateUrl: './metadata-quality.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataQualityComponent {
  record$ = this.editorFacade.record$
  constructor(private editorFacade: EditorFacade) {}
}
