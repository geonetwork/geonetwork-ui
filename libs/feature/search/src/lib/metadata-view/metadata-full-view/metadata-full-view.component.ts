import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'gn-ui-metadata-full-view',
  templateUrl: './metadata-full-view.component.html',
  styleUrls: ['./metadata-full-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetadataFullViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
