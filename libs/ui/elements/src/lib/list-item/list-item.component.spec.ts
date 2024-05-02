import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatIconModule } from '@angular/material/icon'
import { TranslateModule } from '@ngx-translate/core'
import { ListItemComponent } from './list-item.component'
import { By } from '@angular/platform-browser'
import { ChangeDetectionStrategy, DebugElement } from '@angular/core'

describe('DownloadsListItemComponent', () => {
  let component: ListItemComponent
  let fixture: ComponentFixture<ListItemComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListItemComponent],
      imports: [MatIconModule, TranslateModule.forRoot()],
    })
      .overrideComponent(ListItemComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemComponent)
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
        const descElmt = fixture.debugElement.query(By.css('.text-21'))

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
        const descElmt = fixture.debugElement.query(By.css('.text-21'))

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

    describe('when it is not Wfs', () => {
      it('do not display wfs information', () => {
        const spans = fixture.debugElement.queryAll(By.css('span'))

        expect(spans.length).toBe(1)
      })
    })
    describe('when it is not Wfs', () => {
      beforeEach(() => {
        component.isFromWfs = true
        fixture.detectChanges()
      })
      it('add wfs information', () => {
        const spans = fixture.debugElement.queryAll(By.css('span'))

        expect(spans.length).toBe(2)
      })
    })
  })
})
