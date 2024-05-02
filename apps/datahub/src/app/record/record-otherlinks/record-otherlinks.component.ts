import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { CarouselComponent } from '@geonetwork-ui/ui/layout'
import { ListComponent } from '@geonetwork-ui/ui/elements'

@Component({
  selector: 'datahub-record-otherlinks',
  templateUrl: './record-otherlinks.component.html',
  styleUrls: ['./record-otherlinks.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordOtherlinksComponent {
  otherLinks$ = this.facade.otherLinks$

  @ViewChild(CarouselComponent) carousel: CarouselComponent
  @ViewChild(ListComponent) list: ListComponent

  constructor(public facade: MdViewFacade) {}

  get isFirstStepOrPage() {
    return this.carousel?.isFirstStep ?? this.list?.isFirstPage ?? true
  }

  get isLastStepOrPage() {
    return this.carousel?.isLastStep ?? this.list?.isLastPage ?? false
  }

  changeStepOrPage(direction: string) {
    if (direction === 'next') {
      this.list?.goToNextPage()
      this.carousel?.slideToNext()
    } else {
      this.carousel?.slideToPrevious()
      this.list?.goToPreviousPage()
    }
  }
}
