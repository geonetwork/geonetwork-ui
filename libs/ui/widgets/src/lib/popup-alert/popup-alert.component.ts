import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'gn-ui-popup-alert',
  templateUrl: './popup-alert.component.html',
  styleUrls: ['./popup-alert.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupAlertComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
