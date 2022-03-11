import { Component, ChangeDetectionStrategy, Input } from '@angular/core'
import { SourcesService } from '../sources/sources.service'

@Component({
  selector: 'gn-ui-source-label',
  templateUrl: './source-label.component.html',
  styleUrls: ['./source-label.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SourceLabelComponent {
  @Input() set catalogUuid(uuid: string) {
    this.sourcesService.setSourceUuid(uuid)
  }

  constructor(public sourcesService: SourcesService) {}
}
