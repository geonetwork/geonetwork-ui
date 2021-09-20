import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core'
import { ColorService } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-export-entry',
  templateUrl: './export-entry.component.html',
  styleUrls: ['./export-entry.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportEntryComponent implements OnInit {
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
