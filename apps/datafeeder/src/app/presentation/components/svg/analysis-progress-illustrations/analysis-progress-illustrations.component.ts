import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-analysis-progress-illustrations',
  templateUrl: './analysis-progress-illustrations.component.html',
  styleUrls: ['./analysis-progress-illustrations.component.css'],
})
export class AnalysisProgressIllustrationsComponent implements OnInit {
  @Input() progress

  constructor() {}

  ngOnInit(): void {}
}
