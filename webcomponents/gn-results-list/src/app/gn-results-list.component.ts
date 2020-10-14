import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core'
import { ResultsListLayout } from '@lib/common'
import { Configuration } from '@lib/gn-api'

export const apiConfiguration = new Configuration()

@Component({
  selector: 'wc-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class GnResultsListComponent implements OnInit {
  @Input() layout: ResultsListLayout = ResultsListLayout.BLOCK
  @Input() lines = 10
  @Input() filter

  constructor() {}

  ngOnInit(): void {}
}
