import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'gn-ui-dataset-view',
  templateUrl: './dataset-view.component.html',
  styleUrls: ['./dataset-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatasetViewComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
