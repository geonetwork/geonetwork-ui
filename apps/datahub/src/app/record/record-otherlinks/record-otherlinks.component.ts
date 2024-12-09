import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { BlockListComponent, CarouselComponent } from '@geonetwork-ui/ui/layout'
import { PreviousNextButtonsComponent } from '@geonetwork-ui/ui/inputs'
import { CommonModule } from '@angular/common'
import { LinkCardComponent } from '@geonetwork-ui/ui/elements'
import { LetDirective } from '@ngrx/component'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'datahub-record-otherlinks',
  templateUrl: './record-otherlinks.component.html',
  styleUrls: ['./record-otherlinks.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    PreviousNextButtonsComponent,
    BlockListComponent,
    LinkCardComponent,
    CarouselComponent,
    LetDirective,
    TranslateModule,
  ],
})
export class RecordOtherlinksComponent implements AfterViewInit {
  otherLinks$ = this.facade.otherLinks$

  @ViewChild(CarouselComponent) carousel: CarouselComponent
  @ViewChild(BlockListComponent) list: BlockListComponent

  constructor(
    public facade: MdViewFacade,
    private changeDetector: ChangeDetectorRef
  ) {}

  get isFirstStepOrPage() {
    return this.carousel?.isFirstStep ?? this.list?.isFirstPage ?? true
  }

  get isLastStepOrPage() {
    return this.carousel?.isLastStep ?? this.list?.isLastPage ?? false
  }

  get hasPagination() {
    return (this.carousel?.stepsCount || this.list?.pagesCount) > 1
  }

  changeStepOrPage(direction: string) {
    if (direction === 'next') {
      this.list?.nextPage()
      this.carousel?.slideToNext()
    } else {
      this.carousel?.slideToPrevious()
      this.list?.previousPage()
    }
  }

  updateView() {
    this.changeDetector.detectChanges()
  }

  ngAfterViewInit() {
    // this is required to show the pagination correctly
    this.changeDetector.detectChanges()
  }
}
