import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LoadingMaskComponent } from './loading-mask.component'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

describe('LoadingMaskComponent', () => {
  let component: LoadingMaskComponent
  let fixture: ComponentFixture<LoadingMaskComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingMaskComponent, MatProgressSpinnerModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingMaskComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
