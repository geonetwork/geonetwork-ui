import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'

import { FacetItemStubComponent } from '../facet-item/facet-item.component'
import { FacetBlockComponent } from './facet-block.component'

describe('FacetBlockComponent', () => {
  let component: FacetBlockComponent
  let fixture: ComponentFixture<FacetBlockComponent>

  const modelMock = {
    key: 'tag',
    items: [
      { value: 'Hungary', count: 20, path: ['tag', 'Hungary'] },
      { value: 'Austria', count: 17, path: ['tag', 'Austria'] },
      { value: 'Belgium', count: 17, path: ['tag', 'Belgium'] },
      { value: 'Bulgaria', count: 17, path: ['tag', 'Bulgaria'] },
      { value: 'Croatia', count: 17, path: ['tag', 'Croatia'] },
      { value: 'Cyprus', count: 17, path: ['tag', 'Cyprus'] },
      { value: 'Czechia', count: 17, path: ['tag', 'Czechia'] },
      { value: 'Denmark', count: 17, path: ['tag', 'Denmark'] },
      { value: 'Estonia', count: 17, path: ['tag', 'Estonia'] },
      { value: 'Finland', count: 17, path: ['tag', 'Finland'] },
      { value: 'France', count: 17, path: ['tag', 'France'] },
      { value: 'Germany', count: 17, path: ['tag', 'Germany'] },
      { value: 'Italy', count: 17, path: ['tag', 'Italy'] },
      { value: 'Latvia', count: 17, path: ['tag', 'Latvia'] },
      { value: 'Luxembourg', count: 17, path: ['tag', 'Luxembourg'] },
      { value: 'Malta', count: 17, path: ['tag', 'Malta'] },
      { value: 'Netherlands', count: 17, path: ['tag', 'Netherlands'] },
      { value: 'Poland', count: 17, path: ['tag', 'Poland'] },
      { value: 'Portugal', count: 17, path: ['tag', 'Portugal'] },
      { value: 'Romania', count: 17, path: ['tag', 'Romania'] },
      { value: 'Slovakia', count: 17, path: ['tag', 'Slovakia'] },
    ],
    path: ['tag'],
    type: 'terms',
    size: 21,
    more: true,
    includeFilter: true,
    excludeFilter: false,
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FacetBlockComponent, FacetItemStubComponent],
      imports: [FormsModule],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetBlockComponent)
    component = fixture.componentInstance
    component.model = modelMock
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
