import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { FacetBlockStubComponent } from '../facet-block/facet-block.component'
import { FacetListComponent } from './facet-list.component'

describe('FacetListComponent', () => {
  let component: FacetListComponent
  let fixture: ComponentFixture<FacetListComponent>

  const modelsMock = []

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FacetListComponent, FacetBlockStubComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetListComponent)
    component = fixture.componentInstance
    component.models = modelsMock
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
