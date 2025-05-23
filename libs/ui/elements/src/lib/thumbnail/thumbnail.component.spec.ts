import { ChangeDetectionStrategy, DebugElement } from '@angular/core'
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { ThumbnailComponent } from './thumbnail.component'

describe('ThumbnailComponent', () => {
  let component: ThumbnailComponent
  let fixture: ComponentFixture<ThumbnailComponent>
  let de: DebugElement

  beforeEach(async () => {
    await TestBed.overrideComponent(ThumbnailComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default },
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbnailComponent)
    component = fixture.componentInstance
    de = fixture.debugElement
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('<img> element', () => {
    describe('When no url is given', () => {
      let img
      let root
      beforeEach(fakeAsync(() => {
        component.thumbnailUrl = null
        fixture.detectChanges()
        img = de.query(By.css('img'))
        root = de.query(By.css('div'))
        tick(10)
      }))

      it('is displayed, with a placeholder src', () => {
        expect(img.nativeElement.src).not.toEqual('')
      })
      it('sets object cover to scale-down', () => {
        expect(img.nativeElement.style.objectFit).toEqual('scale-down')
      })
      it('sets bg color to gray', () => {
        expect(
          root.nativeElement.classList.contains('bg-gray-100')
        ).toBeTruthy()
        expect(root.nativeElement.classList.contains('bg-white')).toBeFalsy()
      })
    })
    describe('When an url is given and no fit is set', () => {
      const url = 'http://test.com/img.png'
      let img
      let root
      beforeEach(() => {
        component.thumbnailUrl = url
        fixture.detectChanges()
        img = de.query(By.css('img'))
        root = de.query(By.css('div'))
      })
      it('is displayed', () => {
        expect(img).toBeTruthy()
      })
      it('url attribute as url @Input', () => {
        expect(img.nativeElement.src).toEqual(url)
      })
      it('sets object cover to cover', () => {
        expect(img.nativeElement.style.objectFit).toEqual('cover')
      })
      it('sets img height to 100%', () => {
        expect(img.nativeElement.classList.contains('h-full')).toBeTruthy()
      })
      it('sets bg color to white', () => {
        expect(root.nativeElement.classList.contains('bg-white')).toBeTruthy()
        expect(root.nativeElement.classList.contains('bg-gray-100')).toBeFalsy()
      })
    })
    describe('When an url is given and fit is set to "contain"', () => {
      const url = 'http://test.com/img.png'
      let img
      let root
      beforeEach(() => {
        component.thumbnailUrl = url
        component.fit = 'contain'
        fixture.detectChanges()
        img = de.query(By.css('img'))
        root = de.query(By.css('div'))
      })
      it('is displayed', () => {
        expect(img).toBeTruthy()
      })
      it('url attribute as url @Input', () => {
        expect(img.nativeElement.src).toEqual(url)
      })
      it('sets object cover to contain', () => {
        expect(img.nativeElement.style.objectFit).toEqual('contain')
      })
      it('sets img height to 80%', () => {
        expect(img.nativeElement.classList.contains('h-4/5')).toBeTruthy()
      })
      it('sets bg color to white', () => {
        expect(root.nativeElement.classList.contains('bg-white')).toBeTruthy()
        expect(root.nativeElement.classList.contains('bg-gray-100')).toBeFalsy()
      })
    })
  })
  describe('When different size of img are provided', () => {
    beforeEach(() => {
      component.thumbnailUrl = 'http://test.com/img.png'
      fixture.detectChanges()
      Object.defineProperties(component.imgElement.nativeElement, {
        naturalWidth: {
          value: 100,
        },
        naturalHeight: {
          value: 100,
        },
      })
    })
    it('When container is bigger than image, img displayed as scale-down', () => {
      Object.defineProperties(component.containerElement.nativeElement, {
        clientWidth: {
          value: 150,
        },
        clientHeight: {
          value: 150,
        },
      })
      component.setObjectFit()
      fixture.detectChanges()
      expect(component.imgElement.nativeElement.style.objectFit).toEqual(
        'scale-down'
      )
    })
    it('When container is smaller than image, img displayed as cover', () => {
      Object.defineProperties(component.containerElement.nativeElement, {
        clientWidth: {
          value: 50,
        },
        clientHeight: {
          value: 150,
        },
      })
      component.setObjectFit()
      fixture.detectChanges()
      expect(component.imgElement.nativeElement.style.objectFit).toEqual(
        'cover'
      )
    })
  })
  describe('When no url is given and a custom placeholder is provided', () => {
    const placeholderUrl = 'http://localhost/assets/img/placeholder.svg'
    let img
    let root
    beforeEach(() => {
      component.placeholderUrl = placeholderUrl
      component.thumbnailUrl = null
      fixture.detectChanges()
      img = de.query(By.css('img'))
      root = de.query(By.css('div'))
    })
    it('is displayed, with custom placeholder src', () => {
      expect(img.nativeElement.src).toEqual(placeholderUrl)
    })
    it('sets object cover to scale-down', () => {
      expect(img.nativeElement.style.objectFit).toEqual('scale-down')
    })
    it('sets bg color to gray', () => {
      expect(root.nativeElement.classList.contains('bg-gray-100')).toBeTruthy()
      expect(root.nativeElement.classList.contains('bg-white')).toBeFalsy()
    })
  })
  describe('broken image url', () => {
    const url = 'http://test.com/img.png'
    const placeholderUrl = 'http://localhost/assets/img/placeholder.png'
    let img
    let root
    beforeEach(() => {
      component.thumbnailUrl = url
      component.placeholderUrl = placeholderUrl
      fixture.detectChanges()
      img = de.query(By.css('img'))
      root = de.query(By.css('div'))
      img.nativeElement.dispatchEvent(new Event('error'))
      fixture.detectChanges()
    })
    it('uses placeholder img', () => {
      expect(img.nativeElement.src).toEqual(placeholderUrl)
    })
    it('sets object cover to scale-down', () => {
      expect(img.nativeElement.style.objectFit).toEqual('scale-down')
    })
    it('sets bg color to gray', () => {
      expect(root.nativeElement.classList.contains('bg-gray-100')).toBeTruthy()
      expect(root.nativeElement.classList.contains('bg-white')).toBeFalsy()
    })
  })

  describe('thumbnail image url returns 404 and organisation logo exists', () => {
    const url = 'http://test.com/img.png'
    const orgLogoUrl = 'http://test.com/orgLogo.png'
    const placeholderUrl = 'http://localhost/assets/img/placeholder.png'
    let img
    let root
    beforeEach(() => {
      component.thumbnailUrl = [url, orgLogoUrl]
      component.fit = ['cover', 'contain']
      component.placeholderUrl = placeholderUrl
      fixture.detectChanges()
      img = de.query(By.css('img'))
      img.nativeElement.dispatchEvent(new Event('error'))
      root = de.query(By.css('div'))
      fixture.detectChanges()
    })
    it('displays organisation logo', () => {
      expect(img.nativeElement.src).toEqual(orgLogoUrl)
      expect(img.nativeElement.style.objectFit).toEqual('contain')
    })
    it('sets bg color to white', () => {
      expect(root.nativeElement.classList.contains('bg-white')).toBeTruthy()
      expect(root.nativeElement.classList.contains('bg-gray-100')).toBeFalsy()
    })

    describe('if organisation logo also returns 404', () => {
      beforeEach(() => {
        img.nativeElement.dispatchEvent(new Event('error'))
        fixture.detectChanges()
      })
      it('displays placeholder', () => {
        expect(img.nativeElement.src).toEqual(placeholderUrl)
        expect(img.nativeElement.style.objectFit).toEqual('scale-down')
      })
      it('sets bg color to gray', () => {
        expect(
          root.nativeElement.classList.contains('bg-gray-100')
        ).toBeTruthy()
        expect(root.nativeElement.classList.contains('bg-white')).toBeFalsy()
      })
    })
  })
  describe('thumbnail image url returns 404 and no organisation logo', () => {
    const url = 'http://test.com/img.png'
    const placeholderUrl = 'http://localhost/assets/img/placeholder.png'
    let img
    let root
    beforeEach(() => {
      component.thumbnailUrl = url
      component.placeholderUrl = placeholderUrl
      fixture.detectChanges()
      img = de.query(By.css('img'))
      root = de.query(By.css('div'))
      img.nativeElement.dispatchEvent(new Event('error'))
      fixture.detectChanges()
    })

    it('displays placeholder', () => {
      expect(img.nativeElement.src).toEqual(placeholderUrl)
    })
    it('sets bg color to gray', () => {
      expect(root.nativeElement.classList.contains('bg-gray-100')).toBeTruthy()
      expect(root.nativeElement.classList.contains('bg-white')).toBeFalsy()
    })
  })

  describe('several thumbnails urls', () => {
    const url = 'http://test.com/img.png'
    const placeholderUrl = 'http://localhost/assets/img/placeholder.png'
    let img

    describe('at least one is truthy', () => {
      beforeEach(() => {
        component.placeholderUrl = placeholderUrl
        component.thumbnailUrl = [null, undefined, url]
        component.fit = ['cover', 'contain', 'contain']
        fixture.detectChanges()
        img = de.query(By.css('img'))
      })
      it('uses the truthy url', () => {
        expect(img.nativeElement.src).toEqual(url)
        expect(img.nativeElement.style.objectFit).toEqual('contain')
      })
    })

    describe('no truthy url', () => {
      beforeEach(() => {
        component.placeholderUrl = placeholderUrl
        component.thumbnailUrl = [null, undefined]
        component.fit = ['cover', 'contain']
        fixture.detectChanges()
        img = de.query(By.css('img'))
      })
      it('uses the truthy url', () => {
        expect(img.nativeElement.src).toEqual(placeholderUrl)
      })
    })
  })
})
