import { ChangeDetectionStrategy } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import {
  someHabTableItemFixture,
  tableItemsFixture,
} from './data-table.fixtures'
import { DataTableComponent } from './data-table.component'
import { By } from '@angular/platform-browser'
import { TableItemSizeDirective } from 'ng-table-virtual-scroll'
import { TranslateModule } from '@ngx-translate/core'
import {
  BaseFileReader,
  DataItem,
  PropertyInfo,
} from '@geonetwork-ui/data-fetcher'

export class MockBaseReader extends BaseFileReader {
  data: {
    items: DataItem[]
    properties: PropertyInfo[]
  }
  constructor(data: { items: DataItem[]; properties: PropertyInfo[] }) {
    super('')
    this.data = data
  }
  override getData(): Promise<{
    items: DataItem[]
    properties: PropertyInfo[]
  }> {
    return Promise.resolve(this.data)
  }
}

describe('DataTableComponent', () => {
  let component: DataTableComponent
  let fixture: ComponentFixture<DataTableComponent>

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
      .overrideComponent(DataTableComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableComponent)
    component = fixture.componentInstance
    component.dataset = new MockBaseReader(tableItemsFixture)
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  it('computes data properties', () => {
    fixture.detectChanges()
    expect(component.properties).toEqual(['id', 'firstName', 'lastName'])
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
      component.dataset = new MockBaseReader(someHabTableItemFixture)
      fixture.detectChanges()
    })
    it('updates the internal data source', () => {
      expect(component.dataSource).not.toBe(previousDataSource)
    })
    it('recomputes the data properties', () => {
      expect(component.properties).toEqual(['id', 'name', 'pop'])
    })
  })
})
