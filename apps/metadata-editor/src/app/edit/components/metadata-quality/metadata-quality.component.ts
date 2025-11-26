import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
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
  private editorFacade = inject(EditorFacade)

  record$ = this.editorFacade.record$
}
