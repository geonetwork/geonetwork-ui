import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DownloadItemComponent } from './download-item.component'
import { By } from '@angular/platform-browser'
import { ChangeDetectionStrategy, DebugElement } from '@angular/core'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('DownloadsListItemComponent', () => {
  let component: DownloadItemComponent
  let fixture: ComponentFixture<DownloadItemComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideI18n()],
    })
      .overrideComponent(DownloadItemComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadItemComponent)
    component = fixture.componentInstance
    component.link = {
      name: 'allroads.geojson',
      description: 'A file that contains all roads',
      url: new URL('https://roads.com/allroads.geojson'),
      type: 'download',
    }
    component.format = 'geojson'
    component.color = 'red'

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  describe('download description', () => {
    describe('when has a description', () => {
      it('displays the description', () => {
        const descElmt = fixture.debugElement.query(By.css('.gn-ui-card-title'))

        expect(descElmt.attributes.title).toEqual(
          'A file that contains all roads'
        )
        expect(descElmt.nativeElement.textContent.trim()).toEqual(
          'A file that contains all roads'
        )
      })
    })
    describe('when has no description', () => {
      beforeEach(() => {
        delete component.link.description
        fixture.detectChanges()
      })
      it('displays name', () => {
        const descElmt = fixture.debugElement.query(By.css('.gn-ui-card-title'))

        expect(descElmt.attributes.title).toEqual('allroads.geojson')
        expect(descElmt.nativeElement.textContent.trim()).toEqual(
          'allroads.geojson'
        )
      })
    })
  })
  describe('download format', () => {
    let badgeElt: DebugElement
    let spans: DebugElement[]
    beforeEach(() => {
      spans = fixture.debugElement.queryAll(By.css('span'))
      badgeElt = spans[0]
    })
    it('displays the format in the badge', () => {
      expect(badgeElt.nativeElement.textContent.trim()).toEqual('geojson')
    })
    it('set the badge color', () => {
      expect(badgeElt.styles['background-color']).toEqual('red')
    })

    describe('when it is not WFS or OGC API', () => {
      it('do not display wfs or OGC API information', () => {
        const spans = fixture.debugElement.queryAll(By.css('span'))

        expect(spans.length).toBe(1)
      })
    })
    describe('when it is WFS or OGC API', () => {
      beforeEach(() => {
        component.isFromApi = true
        fixture.detectChanges()
      })
      it('add WFS or OGC API information', () => {
        const spans = fixture.debugElement.queryAll(By.css('span'))

        expect(spans.length).toBe(2)
      })
    })
  })
})
