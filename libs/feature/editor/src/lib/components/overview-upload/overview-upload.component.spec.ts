import { ComponentFixture, TestBed } from '@angular/core/testing'
import { OverviewUploadComponent } from './overview-upload.component'

describe('OverviewUploadComponent', () => {
  let component: OverviewUploadComponent
  let fixture: ComponentFixture<OverviewUploadComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewUploadComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(OverviewUploadComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
