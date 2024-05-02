import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ViewChild,
} from '@angular/core'
import { DatasetServiceDistribution } from '@geonetwork-ui/common/domain/model/record'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { CarouselComponent } from '@geonetwork-ui/ui/layout'

@Component({
  selector: 'datahub-record-apis',
  templateUrl: './record-apis.component.html',
  styleUrls: ['./record-apis.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordApisComponent implements OnInit {
  @ViewChild(CarouselComponent) carousel: CarouselComponent

  maxHeight = '0px'
  opacity = 0
  selectedApiLink: DatasetServiceDistribution

  apiLinks$ = this.facade.apiLinks$

  carouselSteps = 0

  constructor(private facade: MdViewFacade) {}

  ngOnInit(): void {
    this.setStyle(undefined)
    this.selectedApiLink = undefined
  }

  get hasSteps() {
    return this.carouselSteps > 1
  }

  carouselStepsHasChanged(stepNumber: number) {
    this.carouselSteps = stepNumber
  }

  get isFirstStep() {
    return this.carousel?.isFirstStep
  }

  get isLastStep() {
    return this.carousel?.isLastStep
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
    this.maxHeight = link === undefined ? '0px' : '500px'
    this.opacity = link === undefined ? 0 : 1
  }

  changeStepOrPage(direction: string) {
    if (direction === 'next') {
      this.carousel?.slideToNext()
    } else {
      this.carousel?.slideToPrevious()
    }
  }
}
