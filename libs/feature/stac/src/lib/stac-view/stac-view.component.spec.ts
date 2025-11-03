import { ComponentFixture, TestBed } from '@angular/core/testing'
import { StacViewComponent } from './stac-view.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { DatasetTemporalExtent } from '@geonetwork-ui/common/domain/model/record'

describe('StacViewComponent', () => {
  let component: StacViewComponent
  let fixture: ComponentFixture<StacViewComponent>

  const mockTemporalExtent: DatasetTemporalExtent = {
    start: new Date('2020-01-01T00:00:00Z'),
    end: new Date('2023-12-31T23:59:59Z'),
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StacViewComponent],
      providers: [provideI18n()],
    }).compileComponents()

    fixture = TestBed.createComponent(StacViewComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('Initial state', () => {
    it('should pre-fill date fields when collection has temporal extent', () => {
      component.initialTemporalExtent = mockTemporalExtent
      component.ngOnInit()

      expect(component.currentTemporalExtent.start).toEqual(
        mockTemporalExtent.start
      )
      expect(component.currentTemporalExtent.end).toEqual(
        mockTemporalExtent.end
      )
      expect(component.isTemporalFilterModified).toBe(false)
    })

    it('should not pre-fill date fields when collection has no temporal extent', () => {
      component.initialTemporalExtent = null
      component.ngOnInit()

      expect(component.currentTemporalExtent).toBeNull()
      expect(component.isTemporalFilterModified).toBe(false)
    })
  })

  describe('Date modifications', () => {
    beforeEach(() => {
      component.initialTemporalExtent = mockTemporalExtent
      component.ngOnInit()
    })

    it('should update start date and mark filter as modified', () => {
      const newStartDate = new Date('2021-06-15T00:00:00Z')
      component.onStartDateChange(newStartDate)

      expect(component.currentTemporalExtent.start).toEqual(newStartDate)
      expect(component.currentTemporalExtent.end).toEqual(
        mockTemporalExtent.end
      )
      expect(component.isTemporalFilterModified).toBe(true)
    })

    it('should update end date and mark filter as modified', () => {
      const newEndDate = new Date('2022-08-20T23:59:59Z')
      component.onEndDateChange(newEndDate)

      expect(component.currentTemporalExtent.end).toEqual(newEndDate)
      expect(component.currentTemporalExtent.start).toEqual(
        mockTemporalExtent.start
      )
      expect(component.isTemporalFilterModified).toBe(true)
    })

    it('should mark filter as modified even when date is same as initial', () => {
      component.onStartDateChange(mockTemporalExtent.start)

      expect(component.isTemporalFilterModified).toBe(true)
    })
  })

  describe('Reset filters', () => {
    beforeEach(() => {
      component.initialTemporalExtent = mockTemporalExtent
      component.ngOnInit()
    })

    it('should restore initial dates and hide reset button', () => {
      component.onStartDateChange(new Date('2021-06-15T00:00:00Z'))
      component.onEndDateChange(new Date('2022-08-20T23:59:59Z'))
      component.onResetFilters()

      expect(component.currentTemporalExtent.start).toEqual(
        mockTemporalExtent.start
      )
      expect(component.currentTemporalExtent.end).toEqual(
        mockTemporalExtent.end
      )
      expect(component.isTemporalFilterModified).toBe(false)
    })

    it('should restore to null when no initial temporal extent', () => {
      component.initialTemporalExtent = null
      component.ngOnInit()
      component.onStartDateChange(new Date('2021-01-01T00:00:00Z'))
      component.onResetFilters()

      expect(component.currentTemporalExtent).toBeNull()
      expect(component.isTemporalFilterModified).toBe(false)
    })
  })
})
