import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { SearchSnapshotWcComponent } from './search-snapshot-wc.component'

describe('SearchSnapshotWcComponent', () => {
  let component: SearchSnapshotWcComponent
  let fixture: ComponentFixture<SearchSnapshotWcComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchSnapshotWcComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSnapshotWcComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
