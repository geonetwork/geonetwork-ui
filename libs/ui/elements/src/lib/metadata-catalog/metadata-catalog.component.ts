import { Component, ChangeDetectionStrategy, Input } from '@angular/core'

@Component({
  selector: 'gn-ui-metadata-catalog',
  templateUrl: './metadata-catalog.component.html',
  styleUrls: ['./metadata-catalog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataCatalogComponent {
  @Input() sourceLabel: string
}
