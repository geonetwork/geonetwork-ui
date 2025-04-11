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

@Component({
  selector: 'gn-ui-simple-table',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './simple-table.component.html',
  styleUrl: './simple-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleTableComponent implements OnInit, OnChanges {
  @Input() data: unknown[]
  @Input() columns: { key: string; label: string; width?: string }[]
  gridTemplateColumns = ''

  private updateGridTemplate() {
    this.gridTemplateColumns = this.columns
      .map((col) => col.width || '1fr')
      .join(' ')
  }

  ngOnInit(): void {
    this.updateGridTemplate()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['columns']) {
      this.updateGridTemplate()
    }
  }
}
