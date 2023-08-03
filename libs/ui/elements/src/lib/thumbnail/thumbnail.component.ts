import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  InjectionToken,
  Input,
  Optional,
  ViewChild,
} from '@angular/core'
import { Subscription } from 'rxjs'

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
export class ThumbnailComponent {
  @Input() set thumbnailUrl(url: string[]) {
    // console.log([url])
    this.urls = url
    this.urls.push(this.placeholderUrl)
    this.imgUrl = this.urls[0]
    console.log(this.urls)
  }
  @Input() fit: 'cover' | 'contain' | 'scale-down' = 'cover'
  @Input() fits: ('cover' | 'contain' | 'scale-down')[]
  @ViewChild('imageElement') imgElement: ElementRef<HTMLImageElement>
  @ViewChild('containerElement') containerElement: ElementRef<HTMLDivElement>
  imgUrl: string
  urls: string[]
  placeholderUrl = this.optionalPlaceholderUrl || DEFAULT_PLACEHOLDER
  isPlaceholder = false
  sub: Subscription
  index: number = 1

  get objectFit() {
    return this.isPlaceholder ? 'scale-down' : this.fit
  }

  constructor(
    @Optional()
    @Inject(THUMBNAIL_PLACEHOLDER)
    private optionalPlaceholderUrl: string
  ) {}

  useFallback() {
    if (this.index >= this.urls.length) return
    let next = this.urls[this.index]
    this.fit = this.fits[this.index] || 'cover'
    this.imgUrl = next
    this.index++
    this.isPlaceholder = this.index === this.urls.length
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
