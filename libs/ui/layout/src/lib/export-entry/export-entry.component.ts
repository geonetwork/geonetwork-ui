import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core'
import { ColorService } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-export-entry',
  templateUrl: './export-entry.component.html',
  styleUrls: ['./export-entry.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportEntryComponent implements OnInit {
  @Input() protocol: string
  @Input() name: string
  @Input() description: string
  @Input() url: string
  @Output() exportUrl = new EventEmitter<string>()

  color: string

  ngOnInit(): void {
    this.color = ColorService.generateLabelColor(this.protocol, 0.6, 0.5)
  }

  openUrl() {
    this.exportUrl.emit(this.url)
  }
}
