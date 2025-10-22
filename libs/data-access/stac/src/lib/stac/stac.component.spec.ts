import { ComponentFixture, TestBed } from '@angular/core/testing'
import { StacComponent } from './stac.component'

describe('StacComponent', () => {
  let component: StacComponent
  let fixture: ComponentFixture<StacComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StacComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(StacComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
