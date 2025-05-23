import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { MetadataCatalogComponent } from './metadata-catalog.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('MetadataCatalogComponent', () => {
  let component: MetadataCatalogComponent
  let fixture: ComponentFixture<MetadataCatalogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideI18n()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataCatalogComponent)
    component = fixture.componentInstance
    component.sourceLabel = 'source label'
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('content', () => {
    let ps
    beforeEach(() => {
      ps = fixture.debugElement.queryAll(By.css('p'))
    })
    it('displays the source label', () => {
      expect(ps[1].nativeElement.innerHTML).toBe(' source label ')
    })
  })
})
