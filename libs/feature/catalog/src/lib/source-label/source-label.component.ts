import { Component, ChangeDetectionStrategy, Input } from '@angular/core'
import { Observable } from 'rxjs'
import { SourcesService } from '../sources/sources.service'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'gn-ui-source-label',
  templateUrl: './source-label.component.html',
  styleUrls: ['./source-label.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class SourceLabelComponent {
  sourceLabel$: Observable<string>
  @Input() set catalogUuid(uuid: string) {
    this.sourceLabel$ = this.sourcesService.getSourceLabel(uuid)
  }
  constructor(public sourcesService: SourcesService) {}
}
