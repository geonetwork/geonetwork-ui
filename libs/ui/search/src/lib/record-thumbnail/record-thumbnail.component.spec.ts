import { ChangeDetectionStrategy, DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'

import { RecordThumbnailComponent } from './record-thumbnail.component'

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
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('<img> element', () => {
    describe('When no url is given', () => {
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
        expect(img.properties.src).toEqual(url)
      })
    })
  })
})
