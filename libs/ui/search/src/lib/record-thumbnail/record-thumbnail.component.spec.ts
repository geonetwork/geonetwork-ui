import { ChangeDetectionStrategy, DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'

import { RecordThumbnailComponent } from './record-thumbnail.component'

jest.mock('@geonetwork-ui/util/app-config', () => ({
  getThemeConfig: jest.fn(() => ({
    THUMBNAIL_PLACEHOLDER: 'assets/img/placeholder.svg',
  })),
  isConfigLoaded: jest.fn(() => true),
}))

describe('RecordThumbnailComponent', () => {
  let component: RecordThumbnailComponent
  let fixture: ComponentFixture<RecordThumbnailComponent>
  let de: DebugElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtilSharedModule],
      declarations: [RecordThumbnailComponent],
    })
      .overrideComponent(RecordThumbnailComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordThumbnailComponent)
    component = fixture.componentInstance
    de = fixture.debugElement
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('<img> element', () => {
    describe('When no url is given', () => {
      beforeEach(() => {
        component.thumbnailUrl = undefined
        component.placeholderUrl = undefined
      })

      it('is not diplayed', () => {
        const img = de.query(By.css('img'))
        expect(img).toBeFalsy()
      })
    })
    describe('When an url is given', () => {
      const url = 'http://test.com/img.png'
      let img
      beforeEach(() => {
        component.thumbnailUrl = url
        fixture.detectChanges()
        img = de.query(By.css('img'))
      })
      it('is displayed', () => {
        expect(img).toBeTruthy()
      })
      it('url attribute as url @Input', () => {
        expect(img.nativeElement.getAttribute('src')).toEqual(url)
      })
    })
  })
  describe('When no url is given, but placeholder is set in config', () => {
    const placeholderUrl = 'assets/img/placeholder.svg'
    let img
    beforeEach(() => {
      component.thumbnailUrl = undefined
      component.placeholderUrl = placeholderUrl
      fixture.detectChanges()
      img = de.query(By.css('img'))
    })
    it('is diplayed, with placeholder src', () => {
      expect(img.nativeElement.getAttribute('src')).toEqual(placeholderUrl)
    })
  })
  describe('broken image url', () => {
    const url = 'http://test.com/img.png'
    const placeholderUrl = 'http://localhost/assets/img/placeholder.png'
    let img
    beforeEach(() => {
      component.thumbnailUrl = url
      component.placeholderUrl = placeholderUrl
      fixture.detectChanges()
      img = de.query(By.css('img'))
      img.triggerEventHandler('error')
    })
    it('uses placeholder img', () => {
      expect(img.nativeElement.src).toEqual(placeholderUrl)
    })
  })
})
