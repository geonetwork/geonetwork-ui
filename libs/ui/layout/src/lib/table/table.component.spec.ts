import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { TableComponent } from './table.component'

const data = [
  {
    name: 'name 1',
    id: 'id 1',
    age: 15,
  },
  {
    name: 'name 2',
    id: 'id 2',
    age: 10,
  },
  {
    name: 'name 3',
    id: 'id 3',
    age: 55,
  },
]
describe('TableComponent', () => {
  let component: TableComponent
  let fixture: ComponentFixture<TableComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MatTableModule, MatSortModule],
      declarations: [TableComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent)
    component = fixture.componentInstance
    component.data = data
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
