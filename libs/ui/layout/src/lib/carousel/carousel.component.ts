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

@Component({
  selector: 'gn-ui-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class CarouselComponent implements AfterViewInit {
  @ViewChild('carouselOverflowContainer') carouselOverflowContainer: ElementRef

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

  get isFirstStep() {
    return this.currentStep === 0
  }
  get isLastStep() {
    return this.currentStep === this.steps.length - 1
  }
  get stepsCount() {
    return this.steps.length
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

  public scrollToStep(stepIndex: number) {
    this.emblaApi.scrollTo(stepIndex)
  }

  public slideToPrevious() {
    if (this.isFirstStep) return
    this.emblaApi.scrollPrev()
  }

  public slideToNext() {
    if (this.isLastStep) return
    this.emblaApi.scrollNext()
  }
}
