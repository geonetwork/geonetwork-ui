import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core'
import { RecordSummary } from '@lib/common'
import { MapService, RecordLayer } from '../../map.service'

@Component({
  selector: 'app-md-visu',
  templateUrl: './md-visu.component.html',
  styleUrls: ['./md-visu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MapService],
})
export class MdVisuComponent implements OnInit {
  @Input() metadata: RecordSummary
  @Output() closePanel = new EventEmitter<void>()

  constructor(public mapService: MapService) {}

  ngOnInit(): void {
    const layers = this.buildLayerList()
    this.mapService.setLayers(layers)
  }

  onTabIndexChange(index: number): void {
    if (index === 2) {
      setTimeout(() => this.mapService.map.updateSize(), 0)
    }
  }

  buildLayerList(): RecordLayer[] {
    const tree = this.metadata.link
      .filter((link) => ['OGC:WFS', 'OGC:WMS'].includes(link.protocol))
      .reduce((linkTree, link) => {
        return linkTree[link.name]
          ? {
              ...linkTree,
              [link.name]: {
                ...linkTree[link.name],
                [link.protocol]: link.url,
              },
            }
          : {
              ...linkTree,
              [link.name]: {
                description: link.description,
                [link.protocol]: link.url,
              },
            }
      }, {})
    return Object.keys(tree).map((key) => {
      return { ...tree[key], name: key }
    })
  }
}
