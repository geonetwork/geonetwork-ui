import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-results-hits-number',
  templateUrl: './results-hits-number.component.html',
  standalone: true,
  imports: [CommonModule, TranslatePipe, TranslateDirective],
})
export class ResultsHitsNumberComponent {
  @Input() hits: number
  @Input() loading: boolean
}
