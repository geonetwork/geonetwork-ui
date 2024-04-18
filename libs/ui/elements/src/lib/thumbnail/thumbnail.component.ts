import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  OnInit,
  Optional,
  SimpleChanges,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core'

export const THUMBNAIL_PLACEHOLDER = new InjectionToken<string>(
  'thumbnail-placeholder'
)

type FitOptions = 'cover' | 'contain' | 'scale-down'
type ThumbnailImageObject = {
  url: string
  fit?: FitOptions
}

const DEFAULT_PLACEHOLDER =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH5gkNDCUFYjA1nwAAA1pJREFUeNrtnW2TmjAURh8CLlTdrmun///3tZ22+zLuYlehH7jsMGogwRiiec4MM44K6D3x3hAwAIQQQgghhJDYSM5cPwNQAMgBpACUg22GTg2gArAD8A9AKY+9CsgALAF8YRsGALwDeAWw9yGgALCKoKWP+WU8iwxjUsudLBj83sZciIiPSwhoWz7pJ5dUZFQXlEXOZ/DNeTBt3JnhBpc9aacGsOn0BuoIUk3b+5trGnEC4B7Ak4sUlInRU+wB/JbgVxG18KrTBc01EmYmcTFJQUVPy/9zTh/4BthLDOqeenB2DdBtZBN58LsSNpcUoEtTJWM/GIvMhQDde9j6h2OhXAjo6/2Q/lgkLgSQC0IBFEABZEKyiaQv5AAv7fSlS+lPVxRwOXTnEtoTPAs04yfRHGMoz8F/HOiaJfKeggLc78dmOHsVS33y9SUXsDuLlsg6FOAw/fhYhwI0pJ7WoQASpoC9p3UoQEPpaR0K0LCB3fB1e6KfAhxRweAKgQ5PsQxJ+CzCJYC/A7+EWt4TzVCE77GgEsBPHA/G7QBswcE4b+noVRZ2QxkCCqAAQgEUQCiAAggFUAChAAogFEABhAJcfT9FAdOxQuB/ML9lAfdo/qWYy2MK8EiO5mrrliUCvdIudAEzWWzQzWuxwjRnAK9WwAzAWhZTCe3l7cryNQrQBL/txZhKGGrlwc36ogIPfvdzfhuQsDDM80EVZXUFwe+mEJ2EOwBfLfYTTFFWVxL8Qwl3nedSye1jjhEyCjAPflfCWiScU1iDKMrqyoJ/KOFxRDf1sCg/xCxgTPC7EnIHn6GYsiirKw2+ayYryorBn7YoKwb/qCgntywg1OBPdqSsGPyTRXnp07gvPgD8AAl6KIICCAVQAAlLwOg5MSNi9NyqJgKqAHpQoZNZxs5KgG7SDN7AZzgWOxcCtprn5/wVfLb+uWXsrASUPXlvHbmETGKQjBVgMitVJTuaaQS2t/GoEMeE3onEor2jlK4RvwN4G1u9T4n6zp6PMTWAXzCYdCq12OCOhdeYZzT3mIErAW1Fr+HmNOAt82KSesYIAJoRzR2aIVumo+Ms8WwT/HOOZlM0Y+Zzxv2zp/gCTzfzPOyGtdfgp7LEcDvbvSxbWXg/HUIIIYQQQogx/wHLoX7NoCMFPwAAAABJRU5ErkJggg=='

@Component({
  selector: 'gn-ui-thumbnail',
  templateUrl: './thumbnail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class ThumbnailComponent implements OnInit, OnChanges {
  @Input() thumbnailUrl: string | string[]
  @Input() fit: FitOptions | FitOptions[] = 'cover'
  @ViewChild('imageElement') imgElement: ElementRef<HTMLImageElement>
  @ViewChild('containerElement') containerElement: ElementRef<HTMLDivElement>
  @Output() placeholderShown = new EventEmitter<boolean>()
  imgUrl: string
  imgFit: FitOptions
  placeholderUrl = this.optionalPlaceholderUrl || DEFAULT_PLACEHOLDER
  get isPlaceholder() {
    return this.imgUrl === this.placeholderUrl
  }
  private images: ThumbnailImageObject[] = []

  constructor(
    @Optional()
    @Inject(THUMBNAIL_PLACEHOLDER)
    private optionalPlaceholderUrl: string
  ) {}

  ngOnInit() {
    this.updateImageList()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!('thumbnailUrl' in changes) && !('fit' in changes)) {
      return
    }
    this.updateImageList()
  }

  private updateImageList() {
    if (!this.thumbnailUrl) {
      this.setPlaceholder()
      return
    }
    const urls = Array.isArray(this.thumbnailUrl)
      ? this.thumbnailUrl
      : [this.thumbnailUrl]
    this.images = urls
      .map((url, index) => ({
        url,
        fit: (Array.isArray(this.fit) ? this.fit[index] : this.fit) || 'cover',
      }))
      .filter((img) => !!img.url)
    if (!this.images.length) {
      this.setPlaceholder()
      return
    }
    this.setNewSrcImage(this.images[0])
  }

  private setNewSrcImage(image: ThumbnailImageObject) {
    this.imgFit = image.fit
    this.imgUrl = image.url
    this.placeholderShown.emit(this.isPlaceholder)
  }

  private setPlaceholder(): void {
    this.setNewSrcImage({ url: this.placeholderUrl, fit: 'scale-down' })
  }

  useFallback() {
    if (this.images.length > 1) {
      this.images.shift()
      this.setNewSrcImage(this.images[0])
    } else {
      this.setPlaceholder()
    }
  }

  setObjectFit() {
    const cw = this.containerElement?.nativeElement?.clientWidth
    const ch = this.containerElement?.nativeElement?.clientHeight
    if (
      this.imgElement.nativeElement.naturalWidth < cw &&
      this.imgElement.nativeElement.naturalHeight < ch
    ) {
      this.imgFit = 'scale-down'
    }
  }
}
