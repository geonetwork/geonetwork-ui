import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { CarouselComponent } from '@geonetwork-ui/ui/layout'

@Component({
  selector: 'datahub-record-otherlinks',
  templateUrl: './record-otherlinks.component.html',
  styleUrls: ['./record-otherlinks.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordOtherlinksComponent {
  private _OTHER_LINKS_LIST_PAGE_SIZE = 5
  otherLinks$ = this.facade.otherLinks$
  hasFourSlidesOrMore = true

  get isFirstStep() {
    return this.carousel?.isFirstStep
  }
  get isLastStep() {
    return this.carousel?.isLastStep
  }

  @ViewChild(CarouselComponent) carousel: CarouselComponent

  constructor(public facade: MdViewFacade) {}

  get OTHER_LINKS_LIST_PAGE_SIZE() {
    return this._OTHER_LINKS_LIST_PAGE_SIZE
  }

  slideToPrevious() {
    this.carousel?.slideToPrevious()
  }

  slideToNext() {
    this.carousel?.slideToNext()
  }
}
