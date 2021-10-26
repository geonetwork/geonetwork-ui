import { ChangeDetectionStrategy } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { TABLE_ITEM_FIXTURE, TABLE_ITEM_FIXTURE_HAB } from './table.fixtures'

import { TableComponent } from './table.component'

describe('TableComponent', () => {
  let component: TableComponent
  let fixture: ComponentFixture<TableComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MatTableModule, MatSortModule],
      declarations: [TableComponent],
    })
      .overrideComponent(TableComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent)
    component = fixture.componentInstance
    component.data = TABLE_ITEM_FIXTURE
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  it('computes data properties', () => {
    fixture.detectChanges()
    expect(component.properties).toEqual(['name', 'id', 'age'])
  })

  describe('input data change', () => {
    let previousDataSource
    beforeEach(() => {
      previousDataSource = component.dataSource
      component.data = TABLE_ITEM_FIXTURE_HAB
      fixture.detectChanges()
    })
    it('updates the internal data source', () => {
      expect(component.dataSource).not.toBe(previousDataSource)
    })
    it('recomputes the data properties', () => {
      expect(component.properties).toEqual(['name', 'id', 'pop'])
    })
  })
})
