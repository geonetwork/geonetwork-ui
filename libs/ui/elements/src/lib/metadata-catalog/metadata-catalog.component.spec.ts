import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { MetadataCatalogComponent } from './metadata-catalog.component'
import { TranslateModule } from '@ngx-translate/core'

describe('MetadataCatalogComponent', () => {
  let component: MetadataCatalogComponent
  let fixture: ComponentFixture<MetadataCatalogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetadataCatalogComponent, TranslateModule.forRoot()],
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
