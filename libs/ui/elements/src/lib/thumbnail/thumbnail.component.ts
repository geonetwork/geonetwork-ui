import {
  OnInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  InjectionToken,
  Input,
  Optional,
  ViewChild,
} from '@angular/core'

export const THUMBNAIL_PLACEHOLDER = new InjectionToken<string>(
  'thumbnail-placeholder'
)

export type GnUiThumbnailImageObject = {
  url: string
  objectFit?: 'cover' | 'contain' | 'scale-down'
}

const DEFAULT_PLACEHOLDER =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH5gkNDCUFYjA1nwAAA1pJREFUeNrtnW2TmjAURh8CLlTdrmun///3tZ22+zLuYlehH7jsMGogwRiiec4MM44K6D3x3hAwAIQQQgghhJDYSM5cPwNQAMgBpACUg22GTg2gArAD8A9AKY+9CsgALAF8YRsGALwDeAWw9yGgALCKoKWP+WU8iwxjUsudLBj83sZciIiPSwhoWz7pJ5dUZFQXlEXOZ/DNeTBt3JnhBpc9aacGsOn0BuoIUk3b+5trGnEC4B7Ak4sUlInRU+wB/JbgVxG18KrTBc01EmYmcTFJQUVPy/9zTh/4BthLDOqeenB2DdBtZBN58LsSNpcUoEtTJWM/GIvMhQDde9j6h2OhXAjo6/2Q/lgkLgSQC0IBFEABZEKyiaQv5AAv7fSlS+lPVxRwOXTnEtoTPAs04yfRHGMoz8F/HOiaJfKeggLc78dmOHsVS33y9SUXsDuLlsg6FOAw/fhYhwI0pJ7WoQASpoC9p3UoQEPpaR0K0LCB3fB1e6KfAhxRweAKgQ5PsQxJ+CzCJYC/A7+EWt4TzVCE77GgEsBPHA/G7QBswcE4b+noVRZ2QxkCCqAAQgEUQCiAAggFUAChAAogFEABhAJcfT9FAdOxQuB/ML9lAfdo/qWYy2MK8EiO5mrrliUCvdIudAEzWWzQzWuxwjRnAK9WwAzAWhZTCe3l7cryNQrQBL/txZhKGGrlwc36ogIPfvdzfhuQsDDM80EVZXUFwe+mEJ2EOwBfLfYTTFFWVxL8Qwl3nedSye1jjhEyCjAPflfCWiScU1iDKMrqyoJ/KOFxRDf1sCg/xCxgTPC7EnIHn6GYsiirKw2+ayYryorBn7YoKwb/qCgntywg1OBPdqSsGPyTRXnp07gvPgD8AAl6KIICCAVQAAlLwOg5MSNi9NyqJgKqAHpQoZNZxs5KgG7SDN7AZzgWOxcCtprn5/wVfLb+uWXsrASUPXlvHbmETGKQjBVgMitVJTuaaQS2t/GoEMeE3onEor2jlK4RvwN4G1u9T4n6zp6PMTWAXzCYdCq12OCOhdeYZzT3mIErAW1Fr+HmNOAt82KSesYIAJoRzR2aIVumo+Ms8WwT/HOOZlM0Y+Zzxv2zp/gCTzfzPOyGtdfgp7LEcDvbvSxbWXg/HUIIIYQQQogx/wHLoX7NoCMFPwAAAABJRU5ErkJggg=='

@Component({
  selector: 'gn-ui-thumbnail',
  templateUrl: './thumbnail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThumbnailComponent implements OnInit {
  @Input() images: GnUiThumbnailImageObject[]
  @ViewChild('imageElement') imgElement: ElementRef<HTMLImageElement>
  @ViewChild('containerElement') containerElement: ElementRef<HTMLDivElement>
  imgUrl = ''
  placeholderUrl = this.optionalPlaceholderUrl || DEFAULT_PLACEHOLDER
  isPlaceholder = false
  fit: 'cover' | 'contain' | 'scale-down' = 'cover'
  imagesMutation = []

  get objectFit() {
    return this.isPlaceholder ? 'scale-down' : this.fit
  }

  constructor(
    @Optional()
    @Inject(THUMBNAIL_PLACEHOLDER)
    private optionalPlaceholderUrl: string
  ) {}

  ngOnInit(): void {
    this.imagesMutation = [...this.images]
    if (this.imagesMutation.length === 0) {
      this.setPlaceholder()
      return
    }
    this.setNewSrcImage(this.imagesMutation[0])
  }

  private setNewSrcImage(image: GnUiThumbnailImageObject) {
    this.fit = image.objectFit || 'cover'
    this.imgUrl = image.url
  }

  private setPlaceholder(): void {
    this.isPlaceholder = true
    this.setNewSrcImage({ url: this.placeholderUrl, objectFit: 'scale-down' })
  }

  useFallback() {
    if (this.imagesMutation.length > 1) {
      this.imagesMutation.shift()
      this.setNewSrcImage(this.imagesMutation[0])
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
      this.fit = 'scale-down'
    }
  }
}
