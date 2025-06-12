import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  DatasetSpatialExtent,
  Keyword,
} from '@geonetwork-ui/common/domain/model/record'
import { GenericKeywordsComponent } from '../../../generic-keywords/generic-keywords.component'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { firstValueFrom, map, shareReplay } from 'rxjs'
import { EditorFacade } from '../../../../+state/editor.facade'
import { switchMap } from 'rxjs/operators'
import { TranslatePipe, TranslateService } from '@ngx-translate/core'
import { SPATIAL_SCOPES } from '../../../../fields.config'
import { SpatialExtentComponent } from '@geonetwork-ui/ui/map'

// This intermediary type will let us keep track of which keyword is bound to
// which extent; these properties will not be persisted
type KeywordWithExtent = Keyword & {
  _linkedExtent: DatasetSpatialExtent
  _doNotSave: boolean
}

/**
 * This form field is not like the others, as it will read directly from the state to handle both spatial extents
 * and place keywords.
 * Other types of keywords will not be touched by this field.
 */

@Component({
  selector: 'gn-ui-form-field-spatial-extent',
  templateUrl: './form-field-spatial-extent.component.html',
  styleUrls: ['./form-field-spatial-extent.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    GenericKeywordsComponent,
    TranslatePipe,
    SpatialExtentComponent,
  ],
})
export class FormFieldSpatialExtentComponent {
  spatialExtents$ = this.editorFacade.record$.pipe(
    map((record) => ('spatialExtents' in record ? record?.spatialExtents : []))
  )

  allKeywords$ = this.editorFacade.record$.pipe(
    map((record) => record?.keywords)
  )

  shownKeywords$ = this.editorFacade.record$.pipe(
    map((record) => record?.keywords.filter((k) => k.type === 'place')),
    // look for full keywords in the thesauri
    switchMap((keywords) =>
      Promise.all(
        keywords.map(async (keyword) => {
          if (!keyword.thesaurus) return keyword
          const allKeywords = await firstValueFrom(
            this.platformService.searchKeywordsInThesaurus(
              keyword.label,
              keyword.thesaurus.id
            )
          )
          const found = allKeywords.find((k) => k.label === keyword.label)
          return found ?? keyword
        })
      )
    ),
    // add additional "unnamed" keywords for extents without a matching keyword
    switchMap(async (keywords) => {
      const spatialExtents = await firstValueFrom(this.spatialExtents$)
      const keywordsFromExtents = await Promise.all(
        spatialExtents.map(async (extent) => {
          const existingKeyword =
            extent.description &&
            (keywords.find(
              (k) => k.key === extent.description
            ) as KeywordWithExtent)
          if (existingKeyword) {
            existingKeyword._linkedExtent = extent
            return null
          }
          let bbox = null
          if ('geometry' in extent) {
            bbox = extent.geometry // FIXME: this should be a bbox too but for now it works...
          } else if ('bbox' in extent) {
            bbox = extent.bbox
          }
          const label = await firstValueFrom(
            this.translateService.get('editor.record.placeKeywordWithoutLabel')
          )
          return {
            label,
            type: 'place',
            ...(bbox && { bbox }),
            _linkedExtent: extent,
            _doNotSave: true,
          } as KeywordWithExtent
        })
      ).then((keywords) => keywords.filter((k) => !!k))

      return [...keywords, ...keywordsFromExtents]
    }),
    shareReplay(1)
  )

  constructor(
    private platformService: PlatformServiceInterface,
    private editorFacade: EditorFacade,
    private translateService: TranslateService
  ) {}

  async handleKeywordDelete(keyword: Keyword) {
    const spatialExtents = await firstValueFrom(this.spatialExtents$)
    const shownKeywords = (await firstValueFrom(
      this.shownKeywords$
    )) as KeywordWithExtent[]
    const newKeywords = shownKeywords.filter((k) => k !== keyword)
    const linkedExtent =
      '_linkedExtent' in keyword ? keyword._linkedExtent : null
    const newExtents = linkedExtent
      ? spatialExtents.filter((extent) => linkedExtent !== extent)
      : spatialExtents
    return this.emitChanges(newKeywords, newExtents)
  }

  async handleKeywordAdd(keyword: Keyword) {
    const spatialExtents = await firstValueFrom(this.spatialExtents$)
    const shownKeywords = await firstValueFrom(this.shownKeywords$)
    const newKeywords = [...shownKeywords, keyword] as KeywordWithExtent[]
    let newExtents = spatialExtents
    if (keyword.bbox) {
      newExtents = [
        ...spatialExtents,
        {
          bbox: keyword.bbox,
          description: keyword.key ?? undefined,
        },
      ]
    }
    return this.emitChanges(newKeywords, newExtents)
  }

  async emitChanges(
    placeKeywords: KeywordWithExtent[],
    spatialExtents: DatasetSpatialExtent[]
  ) {
    // some keywords are only present to allow control over extents; they **should not** be saved!
    const filteredPlaceKeywords = placeKeywords
      .filter((keyword) => !keyword._doNotSave)
      .map(
        ({ label, thesaurus, type }) =>
          ({
            label,
            type,
            ...(thesaurus && { thesaurus }),
          }) as Keyword
      )

    const notPlaceKwAndSpatialScopeKw = await firstValueFrom(
      this.editorFacade.record$.pipe(
        map((record) =>
          record.keywords.filter(
            (k) =>
              k.type !== 'place' ||
              SPATIAL_SCOPES.some(
                (spatialScope) => spatialScope.label === k.label // get back spatialScope keywords
              )
          )
        )
      )
    )

    const allKeywords = [
      ...notPlaceKwAndSpatialScopeKw,
      ...filteredPlaceKeywords,
    ]

    this.editorFacade.updateRecordField('keywords', allKeywords)
    this.editorFacade.updateRecordField('spatialExtents', spatialExtents)
  }
}
