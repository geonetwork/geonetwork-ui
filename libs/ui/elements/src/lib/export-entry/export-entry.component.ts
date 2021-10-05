import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core'
import { ColorService, MetadataLinkValid } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-export-entry',
  templateUrl: './export-entry.component.html',
  styleUrls: ['./export-entry.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportEntryComponent implements OnInit {
  @Input() link: MetadataLinkValid
  @Output() exportUrl = new EventEmitter<string>()
  color: string

  ngOnInit(): void {
    this.color = ColorService.generateLabelColor(this.link.format, 0.6, 0.5)
  }

  openUrl() {
    this.exportUrl.emit(this.link.url)
  }
}
