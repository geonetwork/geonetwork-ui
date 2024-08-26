import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SortableListComponent } from './sortable-list.component'

describe('SortableListComponent', () => {
  let component: SortableListComponent
  let fixture: ComponentFixture<SortableListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortableListComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(SortableListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
