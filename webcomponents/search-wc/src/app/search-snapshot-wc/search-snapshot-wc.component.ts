import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core'

@Component({
  selector: 'app-search-snapshot-wc',
  templateUrl: './search-snapshot-wc.component.html',
  styleUrls: ['./search-snapshot-wc.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class SearchSnapshotWcComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
