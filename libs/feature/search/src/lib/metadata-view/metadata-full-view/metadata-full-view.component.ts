import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MdViewFacade } from '../state/mdview.facade'
import { map } from 'rxjs/operators'
import { DatasetFinderService } from '@geonetwork-ui/feature/dataviz'

@Component({
  selector: 'gn-ui-metadata-full-view',
  templateUrl: './metadata-full-view.component.html',
  styleUrls: ['./metadata-full-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataFullViewComponent {
  isPresent$ = this.mdViewFacade.isPresent$
  metadata$ = this.mdViewFacade.metadata$
  isIncomplete$ = this.mdViewFacade.isIncomplete$

  mdLinks = this.metadata$.pipe(
    map((metadata) => ('links' in metadata ? metadata.links : []))
  )
  mdDataLinks$ = this.mdLinks.pipe(
    map((links) =>
      links.filter((link) => this.datasetFinder.getLinkUsages(link).length > 0)
    )
  )
  mdOtherLinks$ = this.mdLinks.pipe(
    map((links) =>
      links.filter(
        (link) => this.datasetFinder.getLinkUsages(link).length === 0
      )
    )
  )

  constructor(
    private mdViewFacade: MdViewFacade,
    private datasetFinder: DatasetFinderService
  ) {}
}
