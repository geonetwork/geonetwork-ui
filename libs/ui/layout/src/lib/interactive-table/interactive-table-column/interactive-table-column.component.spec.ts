import { ComponentFixture, TestBed } from '@angular/core/testing'
import { InteractiveTableColumnComponent } from './interactive-table-column.component'

describe('InteractiveTableColumnComponent', () => {
  let component: InteractiveTableColumnComponent
  let fixture: ComponentFixture<InteractiveTableColumnComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InteractiveTableColumnComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(InteractiveTableColumnComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
