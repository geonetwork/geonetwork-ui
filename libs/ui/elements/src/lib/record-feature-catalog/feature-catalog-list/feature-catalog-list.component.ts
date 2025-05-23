import { Component, ElementRef, Input, ViewChild } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslatePipe } from '@ngx-translate/core'
import {
  DatasetFeatureAttribute,
  DatasetFeatureCatalog,
} from '@geonetwork-ui/common/domain/model/record'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import {
  CellPopinComponent,
  ExpandablePanelComponent,
  TruncatedTextComponent,
} from '@geonetwork-ui/ui/layout'
import { CdkScrollable, ScrollingModule } from '@angular/cdk/scrolling'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { iconoirList } from '@ng-icons/iconoir'

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
    ButtonComponent,
    CellPopinComponent,
    CommonModule,
    TranslatePipe,
    ExpandablePanelComponent,
    TruncatedTextComponent,
    NgIconComponent,
    ScrollingModule,
  ],
  providers: [provideIcons({ iconoirList })],
})
export class FeatureCatalogListComponent {
  @Input() filteredFeatureCatalog!: DatasetFeatureCatalog

  @ViewChild('scrollContainer') scrollContainer!: ElementRef
  @ViewChild(CdkScrollable, { static: true }) scrollable!: CdkScrollable
  @ViewChild('expanel', { read: ExpandablePanelComponent, static: true })
  panelComponent: ExpandablePanelComponent

  readonly COLUMNS_DEFAULT: ColumnDefinition[] = [
    { key: 'type', width: '17%' },
    { key: 'name', width: '32%' },
    { key: 'code', width: '17%' },
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
