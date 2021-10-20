import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'gn-ui-loading-mask',
  templateUrl: './loading-mask.component.html',
  styleUrls: ['./loading-mask.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingMaskComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
