import { ComponentFixture, TestBed } from '@angular/core/testing'

import { StacItemCardComponent } from './stac-item-card.component'

describe('StacItemCardComponent', () => {
  let component: StacItemCardComponent
  let fixture: ComponentFixture<StacItemCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StacItemCardComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(StacItemCardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
