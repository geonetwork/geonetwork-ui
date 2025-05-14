import { Component, Input, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { DatasetFeatureCatalog } from '@geonetwork-ui/common/domain/model/record'
import {
  ExpandablePanelComponent,
  TruncatedTextComponent,
} from '@geonetwork-ui/ui/layout'

marker('feature.catalog.attribute.type')
marker('feature.catalog.attribute.name')
marker('feature.catalog.attribute.code')
marker('feature.catalog.attribute.description')

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
export class FeatureCatalogListComponent implements OnInit {
  @Input() filteredFeatureCatalog: DatasetFeatureCatalog

  columns = [
    {
      key: 'type',
      label: 'feature.catalog.attribute.type',
      width: '19%',
    },
    {
      key: 'name',
      label: 'feature.catalog.attribute.name',
      width: '32%',
    },
    {
      key: 'code',
      label: 'feature.catalog.attribute.code',
      width: '24%',
    },
    {
      key: 'title',
      label: 'feature.catalog.attribute.description',
      width: '25%',
    },
  ]

  gridTemplateColumns = ''

  ngOnInit(): void {
    this.gridTemplateColumns = this.columns.map((col) => col.width).join(' ')
  }
}
