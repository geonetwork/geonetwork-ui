import { ComponentFixture, TestBed } from '@angular/core/testing'

import { StarToggleComponent } from './star-toggle.component'

describe('StarToggleComponent', () => {
  let component: StarToggleComponent
  let fixture: ComponentFixture<StarToggleComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarToggleComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(StarToggleComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
