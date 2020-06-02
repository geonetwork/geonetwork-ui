import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ResultsListComponent } from './results-list.component'

describe('ResultsListComponent', () => {
  let component: ResultsListComponent
  let fixture: ComponentFixture<ResultsListComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResultsListComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
