import { ChangeDetectionStrategy } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatSort } from '@angular/material/sort'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import {
  someHabTableItemFixture,
  tableItemsFixture,
} from './data-table.fixtures'
import { DataTableComponent } from './data-table.component'
import { By } from '@angular/platform-browser'
import {
  BaseFileReader,
  DataItem,
  PropertyInfo,
} from '@geonetwork-ui/data-fetcher'
import { firstValueFrom } from 'rxjs'
import { provideI18n } from '@geonetwork-ui/util/i18n'

const ITEMS_COUNT = 153
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
  override get info(): Promise<{ itemsCount: number }> {
    return Promise.resolve({ itemsCount: ITEMS_COUNT })
  }
}

describe('DataTableComponent', () => {
  let component: DataTableComponent
  let fixture: ComponentFixture<DataTableComponent>
  let dataset: MockBaseReader

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      providers: [provideI18n()],
    })
      .overrideComponent(DataTableComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableComponent)
    component = fixture.componentInstance
    component.featureAttributes = [
      {
        label: 'Identifiant',
        value: 'id',
      },
      { label: 'First Name', value: 'firstName' },
      { label: 'Last Name', value: 'lastName' },
    ]
    dataset = new MockBaseReader(tableItemsFixture)
    component.dataset = dataset
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  it('computes data properties', async () => {
    fixture.detectChanges()
    const properties = await firstValueFrom(component.properties$)
    expect(properties).toEqual(['id', 'firstName', 'lastName'])
  })

  it('displays the amount of objects in the dataset', () => {
    fixture.detectChanges()
    const countEl = fixture.debugElement.query(By.css('.count')).nativeElement
    expect(countEl.textContent).toEqual(ITEMS_COUNT.toString())
  })

  describe('input data change', () => {
    let previousDataSource
    beforeEach(() => {
      previousDataSource = component.dataSource
      component.dataset = new MockBaseReader(someHabTableItemFixture)
      component.featureAttributes = [
        {
          label: 'Identifiant',
          value: 'id',
        },
        {
          label: 'Name',
          value: 'name',
        },
        { label: 'Population', value: 'pop' },
      ]
      fixture.detectChanges()
    })
    it('updates the internal data source', () => {
      expect(component.dataSource).not.toBe(previousDataSource)
    })
    it('recomputes the data properties', async () => {
      const properties = await firstValueFrom(component.properties$)
      expect(properties).toEqual(['id', 'name', 'pop'])
    })
  })

  describe('pagination', () => {
    beforeEach(() => {
      jest.spyOn(dataset, 'limit')
      fixture.detectChanges()
    })
    it('sets the page size on the reader', () => {
      expect(dataset.limit).toHaveBeenCalledWith(0, 10)
    })
    it('calls reader.limit initially', () => {
      expect(dataset.limit).toHaveBeenCalledWith(0, 10)
    })
    it('compute the correct amount of pages', () => {
      expect(component.count).toEqual(ITEMS_COUNT)
    })
    it('calls reader.limit when pagination changes', () => {
      component.paginator.pageIndex = 3
      component.paginator.pageSize = 10
      component.setPagination()
      expect(dataset.limit).toHaveBeenCalledWith(30, 10)
    })
  })

  describe('sorting', () => {
    beforeEach(() => {
      jest.spyOn(dataset, 'orderBy')
      fixture.detectChanges()
    })
    it('do not set an order initially', () => {
      expect(dataset.orderBy).not.toHaveBeenCalled()
    })
    it('calls reader.orderBy on pagination change', () => {
      component.setSort({ active: 'id', direction: 'asc' } as MatSort)
      expect(dataset.orderBy).toHaveBeenCalledWith(['asc', 'id'])
    })
  })

  describe('loading state', () => {
    function getSpinner() {
      return fixture.debugElement.query(By.css('gn-ui-loading-mask'))
    }
    let propsResolver
    let dataResolver
    beforeEach(() => {
      fixture.detectChanges()
      jest
        .spyOn(dataset, 'properties', 'get')
        .mockReturnValue(new Promise((resolver) => (propsResolver = resolver)))
      jest
        .spyOn(dataset, 'read')
        .mockImplementation(
          () => new Promise((resolver) => (dataResolver = resolver))
        )
    })
    it('displays a loading spinner initially until properties and data are loaded', async () => {
      expect(getSpinner()).toBeTruthy()
      propsResolver([])
      dataResolver([])
      await Promise.resolve() // wait for promises in readData to finish
      fixture.detectChanges()
      expect(getSpinner()).toBeFalsy()
    })
    it('displays a loading spinner while the data is loading', async () => {
      propsResolver([])
      dataResolver([])
      await Promise.resolve() // wait for promises in readData to finish
      fixture.detectChanges()
      expect(getSpinner()).toBeFalsy()

      component.paginator.pageIndex = 3
      component.setPagination()
      await Promise.resolve() // wait for promises in readData to finish
      fixture.detectChanges()
      expect(getSpinner()).toBeTruthy()

      dataResolver([])
      await Promise.resolve() // wait for promises in readData to finish
      fixture.detectChanges()
      expect(getSpinner()).toBeFalsy()
    })
  })
  describe('error handling', () => {
    beforeEach(() => {
      component.ngOnInit()
      jest.spyOn(component, 'handleError')
      jest.spyOn(component.dataSource, 'clearData')
      jest
        .spyOn(dataset, 'read')
        .mockImplementation(() => Promise.reject(new Error('Test Error')))
    })
    it('should set component.error if reader ancounters an error', async () => {
      await component.readData()
      expect(component.handleError).toHaveBeenCalledWith(
        new Error('Test Error')
      )
      expect(component.error).toEqual('Test Error')
    })
  })
})
