import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LastCreatedPreviewComponent } from './last-created-preview.component'

describe('LastCreatedPreviewComponent', () => {
  let component: LastCreatedPreviewComponent
  let fixture: ComponentFixture<LastCreatedPreviewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LastCreatedPreviewComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(LastCreatedPreviewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
