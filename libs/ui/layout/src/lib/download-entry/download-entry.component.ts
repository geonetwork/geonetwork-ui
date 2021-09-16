import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core'
import { ColorService } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-download-entry',
  templateUrl: './download-entry.component.html',
  styleUrls: ['./download-entry.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadEntryComponent implements OnInit {
  @Input() format: string
  @Input() resourceName: string
  @Input() title: string
  @Input() description: string
  @Input() url: string

  color: string

  ngOnInit(): void {
    this.color = ColorService.generateLabelColor(this.format, 0.6, 0.5)
  }
}
