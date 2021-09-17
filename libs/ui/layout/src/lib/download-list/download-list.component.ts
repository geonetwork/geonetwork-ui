import { Component, ChangeDetectionStrategy, Input } from '@angular/core'

@Component({
  selector: 'gn-ui-download-list',
  templateUrl: './download-list.component.html',
  styleUrls: ['./download-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadListComponent {
  @Input() links: Array<any> //TODO: type as MetadataLink, once model is updated
}
