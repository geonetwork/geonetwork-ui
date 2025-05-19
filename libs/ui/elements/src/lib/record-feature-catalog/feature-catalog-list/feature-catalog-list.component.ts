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
  ValueListComponent,
} from '@geonetwork-ui/ui/layout'

marker('feature.catalog.attribute.type')
marker('feature.catalog.attribute.name')
marker('feature.catalog.attribute.code')
marker('feature.catalog.attribute.definition')
marker('feature.catalog.attribute.values')

interface ColumnDefinition {
  key: string
  width: string
  class?: string
}

@Component({
  selector: 'gn-ui-feature-catalog-list',
  templateUrl: './feature-catalog-list.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ExpandablePanelComponent,
    TruncatedTextComponent,
    ValueListComponent,
  ],
})
export class FeatureCatalogListComponent {
  @Input() filteredFeatureCatalog!: DatasetFeatureCatalog

  readonly COLUMNS_DEFAULT: ColumnDefinition[] = [
    { key: 'type', width: '19%' },
    { key: 'name', width: '32%' },
    { key: 'code', width: '24%' },
    { key: 'definition', width: '25%' },
  ]

  readonly COLUMNS_WITH_VALUES: ColumnDefinition[] = [
    { key: 'type', width: '17%' },
    { key: 'name', width: '30%' },
    { key: 'code', width: '18%' },
    { key: 'definition', width: '25%' },
    { key: 'values', width: '10%', class: 'text-center' },
  ]

  getColumnsDefinition(attrs: DatasetFeatureAttribute[]): ColumnDefinition[] {
    const hasValues = attrs.some((a) => a.values?.length > 0)
    return hasValues ? this.COLUMNS_WITH_VALUES : this.COLUMNS_DEFAULT
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
