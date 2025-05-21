import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'
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
import { CdkScrollable, ScrollingModule } from '@angular/cdk/scrolling'

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
  styleUrls: [],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ExpandablePanelComponent,
    TruncatedTextComponent,
    ValueListComponent,
    ScrollingModule,
  ],
})
export class FeatureCatalogListComponent {
  @Input() filteredFeatureCatalog!: DatasetFeatureCatalog
  @ViewChild(CdkScrollable, { static: true }) scrollable!: CdkScrollable
  // @ViewChild(ViewContainerRef, { read: ViewContainerRef, static: true }) vcRefMarker!: ViewContainerRef
  @ViewChild('totomarker', { read: ViewContainerRef, static: true })
  vcRefMarker!: ViewContainerRef

  @ViewChild('expanel', { read: ExpandablePanelComponent, static: true })
  panelComponent: ExpandablePanelComponent

  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef

  readonly COLUMNS_DEFAULT: ColumnDefinition[] = [
    { key: 'type', width: '17%' },
    { key: 'name', width: '32%' },
    { key: 'code', width: '20%' },
    { key: 'definition', width: 'minmax(0px, 1fr)' },
  ]

  readonly COLUMN_VALUES: ColumnDefinition = {
    key: 'values',
    width: '73px',
    class: 'text-center',
  }

  getColumnsDefinition(attrs: DatasetFeatureAttribute[]): ColumnDefinition[] {
    const hasValues = attrs.some((a) => a.values?.length > 0)
    return [...this.COLUMNS_DEFAULT, ...(hasValues ? [this.COLUMN_VALUES] : [])]
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
