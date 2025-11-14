import { ComponentFixture, TestBed } from '@angular/core/testing'

import { StacItemsResultGridComponent } from './stac-items-result-grid.component'

describe('StacItemsResultGridComponent', () => {
  let component: StacItemsResultGridComponent
  let fixture: ComponentFixture<StacItemsResultGridComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StacItemsResultGridComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(StacItemsResultGridComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
