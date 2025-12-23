import {
  Component,
  ChangeDetectionStrategy,
  Input,
  inject,
} from '@angular/core'
import { Observable } from 'rxjs'
import { SourcesService } from '../sources/sources.service.js'
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
  sourcesService = inject(SourcesService)

  sourceLabel$: Observable<string>
  @Input() set catalogUuid(uuid: string) {
    this.sourceLabel$ = this.sourcesService.getSourceLabel(uuid)
  }
}
