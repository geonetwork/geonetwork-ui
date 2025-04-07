import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MetadataSpatialExtentComponent } from './metadata-spatial-extent.component'
import { TranslateModule } from '@ngx-translate/core'

describe('MetadataSpatialExtentComponent', () => {
  let component: MetadataSpatialExtentComponent
  let fixture: ComponentFixture<MetadataSpatialExtentComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetadataSpatialExtentComponent, TranslateModule.forRoot()],
    }).compileComponents()

    fixture = TestBed.createComponent(MetadataSpatialExtentComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
