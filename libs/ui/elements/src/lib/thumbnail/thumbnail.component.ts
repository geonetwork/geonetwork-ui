import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  InjectionToken,
  Input,
  OnDestroy,
  Optional,
  ViewChild,
} from '@angular/core'
import { fromEvent, Subscription } from 'rxjs'

export const THUMBNAIL_PLACEHOLDER = new InjectionToken<string>(
  'thumbnail-placeholder'
)

const DEFAULT_PLACEHOLDER =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH5gkNDCUFYjA1nwAAA1pJREFUeNrtnW2TmjAURh8CLlTdrmun///3tZ22+zLuYlehH7jsMGogwRiiec4MM44K6D3x3hAwAIQQQgghhJDYSM5cPwNQAMgBpACUg22GTg2gArAD8A9AKY+9CsgALAF8YRsGALwDeAWw9yGgALCKoKWP+WU8iwxjUsudLBj83sZciIiPSwhoWz7pJ5dUZFQXlEXOZ/DNeTBt3JnhBpc9aacGsOn0BuoIUk3b+5trGnEC4B7Ak4sUlInRU+wB/JbgVxG18KrTBc01EmYmcTFJQUVPy/9zTh/4BthLDOqeenB2DdBtZBN58LsSNpcUoEtTJWM/GIvMhQDde9j6h2OhXAjo6/2Q/lgkLgSQC0IBFEABZEKyiaQv5AAv7fSlS+lPVxRwOXTnEtoTPAs04yfRHGMoz8F/HOiaJfKeggLc78dmOHsVS33y9SUXsDuLlsg6FOAw/fhYhwI0pJ7WoQASpoC9p3UoQEPpaR0K0LCB3fB1e6KfAhxRweAKgQ5PsQxJ+CzCJYC/A7+EWt4TzVCE77GgEsBPHA/G7QBswcE4b+noVRZ2QxkCCqAAQgEUQCiAAggFUAChAAogFEABhAJcfT9FAdOxQuB/ML9lAfdo/qWYy2MK8EiO5mrrliUCvdIudAEzWWzQzWuxwjRnAK9WwAzAWhZTCe3l7cryNQrQBL/txZhKGGrlwc36ogIPfvdzfhuQsDDM80EVZXUFwe+mEJ2EOwBfLfYTTFFWVxL8Qwl3nedSye1jjhEyCjAPflfCWiScU1iDKMrqyoJ/KOFxRDf1sCg/xCxgTPC7EnIHn6GYsiirKw2+ayYryorBn7YoKwb/qCgntywg1OBPdqSsGPyTRXnp07gvPgD8AAl6KIICCAVQAAlLwOg5MSNi9NyqJgKqAHpQoZNZxs5KgG7SDN7AZzgWOxcCtprn5/wVfLb+uWXsrASUPXlvHbmETGKQjBVgMitVJTuaaQS2t/GoEMeE3onEor2jlK4RvwN4G1u9T4n6zp6PMTWAXzCYdCq12OCOhdeYZzT3mIErAW1Fr+HmNOAt82KSesYIAJoRzR2aIVumo+Ms8WwT/HOOZlM0Y+Zzxv2zp/gCTzfzPOyGtdfgp7LEcDvbvSxbWXg/HUIIIYQQQogx/wHLoX7NoCMFPwAAAABJRU5ErkJggg=='

@Component({
  selector: 'gn-ui-thumbnail',
  templateUrl: './thumbnail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThumbnailComponent implements AfterViewInit, OnDestroy {
  @Input() set thumbnailUrl(url: string) {
    this.imgUrl = url || this.placeholderUrl
    this.isPlaceholder = !url
  }
  @Input() fit: 'cover' | 'contain' | 'scale-down' = 'cover'
  @ViewChild('imageElement') imgElement: ElementRef<HTMLImageElement>
  @ViewChild('containerElement') containerElement: ElementRef<HTMLDivElement>
  imgUrl: string
  placeholderUrl = this.optionalPlaceholderUrl || DEFAULT_PLACEHOLDER
  isPlaceholder = false
  sub: Subscription

  get objectFit() {
    return this.isPlaceholder ? 'scale-down' : this.fit
  }

  constructor(
    @Optional()
    @Inject(THUMBNAIL_PLACEHOLDER)
    private optionalPlaceholderUrl: string,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.sub = fromEvent(this.imgElement.nativeElement, 'error').subscribe(() =>
      this.useFallback()
    )
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  useFallback() {
    if (!this.isPlaceholder) {
      this.isPlaceholder = true
      this.imgUrl = this.placeholderUrl
      this.changeDetector.detectChanges()
    }
  }

  setObjectFit() {
    const cw = this.containerElement?.nativeElement?.clientWidth
    const ch = this.containerElement?.nativeElement?.clientHeight
    if (
      this.imgElement.nativeElement.naturalWidth < cw &&
      this.imgElement.nativeElement.naturalHeight < ch
    ) {
      this.fit = 'scale-down'
    }
  }
}
