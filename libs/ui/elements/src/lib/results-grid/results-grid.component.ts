import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { ResultCardComponent } from '../result-card/result-card.component'

@Component({
  selector: 'gn-ui-results-grid',
  standalone: true,
  imports: [CommonModule, ResultCardComponent],
  templateUrl: './results-grid.component.html',
  styleUrl: './results-grid.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsGridComponent {
  @Input() items: { id: string; datetime: string }[] = []
}
