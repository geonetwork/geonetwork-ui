import { ChangeDetectionStrategy } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import {
  someHabTableScrollItemFixture,
  tableScrollItemFixture,
} from './table-scroll.fixtures'
import { TableScrollComponent } from './table-scroll.component'
import { By } from '@angular/platform-browser'
import { TableItemSizeDirective } from 'ng-table-virtual-scroll'
import { TranslateModule } from '@ngx-translate/core'

describe('TableScrollComponent', () => {
  let component: TableScrollComponent
  let fixture: ComponentFixture<TableScrollComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatTableModule,
        MatSortModule,
        TranslateModule.forRoot(),
      ],
      declarations: [TableItemSizeDirective],
    })
      .overrideComponent(TableScrollComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TableScrollComponent)
    component = fixture.componentInstance
    component.data = tableScrollItemFixture()
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  it('computes data properties', () => {
    fixture.detectChanges()
    expect(component.properties).toEqual(['name', 'id', 'age'])
  })

  it('displays the amount of objects in the dataset', () => {
    fixture.detectChanges()
    const countEl = fixture.debugElement.query(By.css('.count')).nativeElement
    expect(countEl.textContent).toEqual('3')
  })

  describe('input data change', () => {
    let previousDataSource
    beforeEach(() => {
      previousDataSource = component.dataSource
      component.data = someHabTableScrollItemFixture()
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
