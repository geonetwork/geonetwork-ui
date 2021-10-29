import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'gn-ui-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
