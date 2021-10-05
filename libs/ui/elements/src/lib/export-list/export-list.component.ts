import { Component, ChangeDetectionStrategy, Input } from '@angular/core'
import { MetadataLink } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-export-list',
  templateUrl: './export-list.component.html',
  styleUrls: ['./export-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportListComponent {
  @Input() links: Array<MetadataLink>
}
