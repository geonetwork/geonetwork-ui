import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { SortByComponent } from './sort-by.component'

describe('SortByComponent', () => {
  let component: SortByComponent
  let fixture: ComponentFixture<SortByComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SortByComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SortByComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
