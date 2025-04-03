import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'

const DATA = [
  {
    type: 'OID',
    cardinality: '0.1',
    name: 'OBJECTID',
    code: 'OBJECTID',
    description: 'Discover the innovative...',
  },
  {
    type: 'OID',
    cardinality: '0.1',
    name: 'OBJECTID',
    code: 'OBJECTID',
    description: 'sample',
  },
]

const COLUMNS = [
  { key: 'type', label: 'Type', width: '15%' },
  { key: 'name', label: 'Name', width: '25%' },
  { key: 'code', label: 'Code', width: '20%' },
  { key: 'description', label: 'Description', width: '40%' },
]

@Component({
  selector: 'gn-ui-feature-catalog',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './feature-catalog.component.html',
  styleUrl: './feature-catalog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureCatalogComponent implements OnInit, OnChanges {
  @Input() data: any[] = DATA
  @Input() columns: { key: string; label: string; width?: string }[] = COLUMNS

  gridTemplateColumns = ''

  private updateGridTemplate() {
    this.gridTemplateColumns = this.columns
      .map((col) => col.width || '1fr')
      .join(' ')
  }

  ngOnInit(): void {
    this.updateGridTemplate()
    console.log('data', this.data)
    console.log('columns', this.columns)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['columns']) {
      this.updateGridTemplate()
    }
  }
}
