import { Component, ChangeDetectionStrategy, Input } from '@angular/core'
import { LANG_2_TO_3_MAPPER } from '@geonetwork-ui/util/i18n'
import { TranslateService } from '@ngx-translate/core'
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
      .pipe(
        map(
          (source) =>
            source.label[LANG_2_TO_3_MAPPER[this.translateService.currentLang]]
        )
      )
  }

  constructor(
    private sourcesService: SourcesService,
    private translateService: TranslateService
  ) {}
}
