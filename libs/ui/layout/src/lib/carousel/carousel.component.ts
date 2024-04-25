import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core'
import EmblaCarousel, { EmblaCarouselType } from 'embla-carousel'

@Component({
  selector: 'gn-ui-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent implements AfterViewInit, OnChanges {
  @ViewChild('carouselOverflowContainer') carouselOverflowContainer: ElementRef

  /**
   * This is needed !!
   */
  @Input() itemsLength = 0

  @Input() containerClass = ''
  @Input() stepsContainerClass = ''
  @Input() title = ''

  steps: number[] = []
  currentStep = 0
  emblaApi: EmblaCarouselType

  isFirstStep = true
  isLastStep = false

  hasFourSlidesOrMore = false

  @Input() previousButtonWidth = 1.4
  @Input() previousButtonHeight = 1.4
  previousButtonStyle = ''

  @Input() nextButtonWidth = 1.4
  @Input() nextButtonHeight = 1.4
  nextButtonStyle = ''

  refreshSteps = () => {
    this.steps = this.emblaApi.scrollSnapList()
    this.currentStep = this.emblaApi.selectedScrollSnap()
    this.isFirstStep = this.currentStep === 0
    this.isLastStep = this.currentStep === this.steps.length - 1
    this.changeDetector.detectChanges()
  }

  constructor(private changeDetector: ChangeDetectorRef) {
    this.previousButtonStyle = `width: ${this.previousButtonWidth}rem; height: ${this.previousButtonHeight}rem;`
    this.nextButtonStyle = `width: ${this.nextButtonWidth}rem; height: ${this.nextButtonHeight}rem;`
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['itemsLength']) {
      const itemsLength = changes['itemsLength'].currentValue
      this.hasFourSlidesOrMore = itemsLength > 3
      this.changeDetector.detectChanges()
    }
  }

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
  slideToPrevious() {
    if (this.isFirstStep) return
    this.emblaApi.scrollPrev()
  }

  /**
   * Click on next arrow
   */
  slideToNext() {
    if (this.isLastStep) return
    this.emblaApi.scrollNext()
  }
}
