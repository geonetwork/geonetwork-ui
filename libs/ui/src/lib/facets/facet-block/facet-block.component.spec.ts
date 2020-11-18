import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'

import { FacetItemStubComponent } from '../facet-item/facet-item.component'
import { BLOCK_MODEL_FIXTURE } from '../fixtures'
import { FacetBlockComponent } from './facet-block.component'

describe('FacetBlockComponent', () => {
  let component: FacetBlockComponent
  let fixture: ComponentFixture<FacetBlockComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FacetBlockComponent, FacetItemStubComponent],
      imports: [FormsModule],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetBlockComponent)
    component = fixture.componentInstance
    component.model = BLOCK_MODEL_FIXTURE
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
