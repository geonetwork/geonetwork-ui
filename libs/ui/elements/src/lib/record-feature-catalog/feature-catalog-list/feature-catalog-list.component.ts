import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import {
  DatasetFeatureAttribute,
  DatasetFeatureCatalog,
} from '@geonetwork-ui/common/domain/model/record'
import {
  ExpandablePanelComponent,
  TruncatedTextComponent,
} from '@geonetwork-ui/ui/layout'

marker('feature.catalog.attribute.type')
marker('feature.catalog.attribute.name')
marker('feature.catalog.attribute.code')
marker('feature.catalog.attribute.definition')
marker('feature.catalog.attribute.values')

@Component({
  selector: 'gn-ui-feature-catalog-list',
  templateUrl: './feature-catalog-list.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ExpandablePanelComponent,
    TruncatedTextComponent,
  ],
})
export class FeatureCatalogListComponent {
  @Input() filteredFeatureCatalog!: DatasetFeatureCatalog

  getColumnsDefinition(attributes: DatasetFeatureAttribute[]) {
    const baseColumns = [
      {
        key: 'type',
        width: '19%',
      },
      {
        key: 'name',
        width: '32%',
      },
      {
        key: 'code',
        width: '20%',
      },
      {
        key: 'definition',
        width: 'minmax(0px, 1fr)',
      },
    ]
    const hasValues = attributes.some((a) => a.values?.length > 0)

    if (hasValues) {
      return [
        ...baseColumns,
        {
          // TODO: column label is centered for this one
          key: 'values',
          width: '73px',
        },
      ]
    }

    return baseColumns
  }

  getGridTemplateColumns(attributes: DatasetFeatureAttribute[]) {
    return this.getColumnsDefinition(attributes)
      .map((col) => col.width)
      .join(' ')
  }

  trackByColumn(_i: number, col: { key: string }) {
    return col.key
  }
}
