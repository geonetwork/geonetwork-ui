import { Component, ChangeDetectionStrategy, Input } from '@angular/core'

@Component({
  selector: 'gn-ui-export-list',
  templateUrl: './export-list.component.html',
  styleUrls: ['./export-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportListComponent {
  @Input() links: Array<any> //TODO: type as MetadataLink, once model is updated
}
