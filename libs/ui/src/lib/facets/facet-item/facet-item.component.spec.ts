import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'

import { FacetItemComponent } from './facet-item.component'

describe('FacetItemComponent', () => {
  let component: FacetItemComponent
  let fixture: ComponentFixture<FacetItemComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FacetItemComponent],
      imports: [FormsModule],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetItemComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
