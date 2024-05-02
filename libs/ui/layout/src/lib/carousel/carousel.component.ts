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

@Component({
  selector: 'gn-ui-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent implements AfterViewInit {
  @ViewChild('carouselOverflowContainer') carouselOverflowContainer: ElementRef

  @Input() containerClass = ''
  @Input() stepsContainerClass = ''

  @Output() stepsChanged = new EventEmitter<number>()

  steps: number[] = []
  currentStep = 0
  emblaApi: EmblaCarouselType

  isFirstStep = true
  isLastStep = false

  refreshSteps = () => {
    this.steps = this.emblaApi.scrollSnapList()
    this.currentStep = this.emblaApi.selectedScrollSnap()
    this.isFirstStep = this.currentStep === 0
    this.isLastStep = this.currentStep === this.steps.length - 1
    this.stepsChanged.emit(this.steps.length)
    this.changeDetector.detectChanges()
  }

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.emblaApi = EmblaCarousel(
      this.carouselOverflowContainer.nativeElement,
      {
        duration: 15,
      }
    )

    this.emblaApi
      .on('init', this.refreshSteps)
      .on('reInit', this.refreshSteps)
      .on('select', this.refreshSteps)
  }

  scrollToStep(stepIndex: number) {
    this.emblaApi.scrollTo(stepIndex)
  }

  /**
   * Click on previous arrow
   */
  public slideToPrevious() {
    if (this.isFirstStep) return
    this.emblaApi.scrollPrev()
  }

  /**
   * Click on next arrow
   */
  public slideToNext() {
    if (this.isLastStep) return
    this.emblaApi.scrollNext()
  }
}
