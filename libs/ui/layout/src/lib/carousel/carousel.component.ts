import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
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
  @Input() containerClass = ''
  @Input() stepsContainerClass = ''
  @ViewChild('carouselOverflowContainer')
  carouselOverflowContainer: ElementRef
  steps: number[] = []
  selectedStep = -1
  emblaApi: EmblaCarouselType

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.emblaApi = EmblaCarousel(
      this.carouselOverflowContainer.nativeElement,
      {
        duration: 15,
      }
    )
    const refreshSteps = () => {
      this.steps = this.emblaApi.scrollSnapList()
      this.selectedStep = this.emblaApi.selectedScrollSnap()
      this.changeDetector.detectChanges()
    }
    this.emblaApi
      .on('init', refreshSteps)
      .on('reInit', refreshSteps)
      .on('select', refreshSteps)
  }

  scrollToStep(stepIndex: number) {
    this.emblaApi.scrollTo(stepIndex)
  }
}
