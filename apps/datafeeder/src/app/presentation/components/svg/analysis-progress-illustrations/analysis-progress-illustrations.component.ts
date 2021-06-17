import { Component, Input } from '@angular/core'

@Component({
  selector: 'gn-ui-analysis-progress-illustrations',
  templateUrl: './analysis-progress-illustrations.component.html',
  styleUrls: ['./analysis-progress-illustrations.component.css'],
})
export class AnalysisProgressIllustrationsComponent {
  @Input() progress
}
