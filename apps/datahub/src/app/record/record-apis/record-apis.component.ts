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
} from '@geonetwork-ui/ui/layout'
import {
  ApiCardComponent,
  RecordApiFormComponent,
} from '@geonetwork-ui/ui/elements'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { matCloseOutline } from '@ng-icons/material-icons/outline'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'datahub-record-apis',
  templateUrl: './record-apis.component.html',
  styleUrls: ['./record-apis.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
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

  maxHeight = '0px'
  opacity = 0
  selectedApiLink: DatasetServiceDistribution

  apiLinks$ = this.facade.apiLinks$

  constructor(
    private facade: MdViewFacade,
    private changeDetector: ChangeDetectorRef
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
