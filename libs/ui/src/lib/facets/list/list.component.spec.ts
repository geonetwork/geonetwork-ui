import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'

import { ListComponent } from './list.component'

describe('ListComponent', () => {
  let component: ListComponent
  let fixture: ComponentFixture<ListComponent>

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
      declarations: [ListComponent],
      imports: [FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent)
    component = fixture.componentInstance
    component.model = modelMock
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
