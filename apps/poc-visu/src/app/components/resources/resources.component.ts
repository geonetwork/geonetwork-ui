import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core'
import { RecordBrief, RecordResponseLink } from '@lib/common'
import { MapService } from '../../map.service'

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcesComponent implements OnInit {
  @Input() metadata: RecordBrief
  links: RecordResponseLink[]

  constructor(public mapService: MapService) {}

  ngOnInit(): void {
    this.links = this.metadata.link.filter((link) =>
      link.protocol.startsWith('WWW:LINK')
    )
  }
}
