import { Component, ChangeDetectionStrategy, Input } from '@angular/core'
import { LangService } from '@geonetwork-ui/util/i18n'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { CatalogSource } from '../sources/sources.model'
import { SourcesService } from '../sources/sources.service'

@Component({
  selector: 'gn-ui-source-label',
  templateUrl: './source-label.component.html',
  styleUrls: ['./source-label.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SourceLabelComponent {
  sourceLabel$: Observable<CatalogSource>
  @Input() set catalogUuid(uuid: string) {
    this.sourceLabel$ = this.sourcesService
      .getSource(uuid)
      .pipe(map((source) => source.label[this.langService.iso3]))
  }

  constructor(
    private sourcesService: SourcesService,
    private langService: LangService
  ) {}
}
