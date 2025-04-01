import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core'

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
  { key: 'type', label: 'Type' },
  { key: 'name', label: 'Name' },
  { key: 'code', label: 'Code' },
  { key: 'description', label: 'Description' },
]
@Component({
  selector: 'gn-ui-feature-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-catalog.component.html',
  styleUrl: './feature-catalog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureCatalogComponent implements OnInit {
  @Input() data: any[] = DATA
  @Input() columns: { key: string; label: string }[] = COLUMNS

  gridTemplateComlumns = this.columns.map(() => '1fr').join(' ')

  ngOnInit(): void {
    console.log('data', this.data)
    console.log('columns', this.columns)
  }
}
