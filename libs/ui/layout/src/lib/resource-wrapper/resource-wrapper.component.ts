import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core'
import EmblaCarousel, { EmblaCarouselType } from 'embla-carousel'
import { CommonModule } from '@angular/common'
import { Paginable } from '../paginable.interface'
import { PaginationDotsComponent } from '../pagination-dots/pagination-dots.component'

@Component({
  selector: 'gn-ui-resource-wrapper',
  templateUrl: './resource-wrapper.component.html',
  styleUrls: ['./resource-wrapper.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, PaginationDotsComponent],
})
export class ResourceWrapperComponent implements AfterViewInit, Paginable {
  @ViewChild('resourceWrapperOverflowContainer')
  resourceWrapperOverflowContainer: ElementRef

  @Input() containerClass = ''
  @Input() stepsContainerClass = 'w-full bottom-0 top-auto'
  @Output() currentStepChange = new EventEmitter<number>()

  protected steps: number[] = []
  protected emblaApi: EmblaCarouselType
  protected currentStep = 0

  protected refreshSteps = () => {
    this.steps = this.emblaApi.scrollSnapList()
    this.currentStep = this.emblaApi.selectedScrollSnap()
    this.currentStepChange.emit(this.currentStep)
    this.changeDetector.detectChanges()
  }

  // Paginable API
  get isFirstPage() {
    return this.currentStep === 0
  }
  get isLastPage() {
    return this.currentStep === this.steps.length - 1
  }
  get currentPage() {
    return this.currentStep + 1 // this is 1-based
  }
  get pagesCount() {
    return this.steps.length
  }
  public goToPage(stepIndex: number) {
    this.emblaApi.scrollTo(stepIndex - 1) // this is 0-based
  }
  public goToPrevPage() {
    if (this.isFirstPage) return
    this.emblaApi.scrollPrev()
  }
  public goToNextPage() {
    if (this.isLastPage) return
    this.emblaApi.scrollNext()
  }

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.emblaApi = EmblaCarousel(
      this.resourceWrapperOverflowContainer.nativeElement,
      {
        duration: 15,
      }
    )

    this.emblaApi
      .on('init', this.refreshSteps)
      .on('reInit', this.refreshSteps)
      .on('select', this.refreshSteps)
  }
}
