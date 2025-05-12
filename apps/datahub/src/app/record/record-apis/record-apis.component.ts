import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core'
import { DatasetServiceDistribution } from '@geonetwork-ui/common/domain/model/record'
import { GpfApiDlComponent, MdViewFacade } from '@geonetwork-ui/feature/record'
import {
  CarouselComponent,
  PreviousNextButtonsComponent,
  BlockListComponent,
} from '@geonetwork-ui/ui/layout'
import {
  ApiCardComponent,
  RecordApiFormComponent,
} from '@geonetwork-ui/ui/elements'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { matCloseOutline } from '@ng-icons/material-icons/outline'
import { TranslateModule } from '@ngx-translate/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { map } from 'rxjs'
import { shareReplay, switchMap } from 'rxjs/operators'
import { DataService } from '@geonetwork-ui/feature/dataviz'

marker('record.metadata.api.form.title.gpf')
marker('record.metadata.api.form.title')

@Component({
  selector: 'datahub-record-apis',
  templateUrl: './record-apis.component.html',
  styleUrls: ['./record-apis.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    BlockListComponent,
    CommonModule,
    CarouselComponent,
    PreviousNextButtonsComponent,
    ApiCardComponent,
    RecordApiFormComponent,
    NgIcon,
    TranslateModule,
    GpfApiDlComponent,
  ],
  viewProviders: [
    provideIcons({
      matCloseOutline,
    }),
  ],
})
export class RecordApisComponent implements OnInit {
  @ViewChild(CarouselComponent) carousel: CarouselComponent
  @ViewChild(BlockListComponent) list: BlockListComponent

  maxHeight = '0px'
  opacity = 0
  selectedApiLink: DatasetServiceDistribution

  apiLinks$ = this.facade.apiLinks$.pipe(
    switchMap(async (apiLinks) => {
        const linksPromises = apiLinks.map((link) => {
          if (link.type === 'service' && link.accessServiceProtocol === 'tms') {
            return this.dataService.getGeodataLinksFromTms(link, true)
          }
          return Promise.resolve(link)
        })
        const processedLinks = await Promise.all(linksPromises)
      return processedLinks.flat()
      }
    ),
    map((links) =>
      (links || []).sort((a, b) =>
        a.type === 'service' && a.accessServiceProtocol === 'GPFDL'
          ? -1
          : b.type === 'service' && b.accessServiceProtocol === 'GPFDL'
            ? 1
            : 0
      )
    ),
    shareReplay(1)
  )

  get apiLinksCount$() {
    return this.apiLinks$?.pipe(map((links) => links.length))
  }

  constructor(
    private facade: MdViewFacade,
    private changeDetector: ChangeDetectorRef,
    private dataService: DataService,
  ) {}

  ngOnInit(): void {
    this.setStyle(undefined)
    this.selectedApiLink = undefined
  }

  updateView() {
    this.changeDetector.detectChanges()
  }

  openRecordApiForm(link: DatasetServiceDistribution) {
    this.selectedApiLink = link
    this.setStyle(link)
  }

  closeRecordApiForm() {
    this.selectedApiLink = undefined
    this.setStyle(undefined)
  }

  setStyle(link: DatasetServiceDistribution) {
    this.maxHeight = link === undefined ? '0px' : '700px'
    this.opacity = link === undefined ? 0 : 1
  }
}
