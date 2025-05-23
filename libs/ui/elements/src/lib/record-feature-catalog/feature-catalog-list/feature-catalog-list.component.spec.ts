import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FeatureCatalogListComponent } from './feature-catalog-list.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('FeatureCatalogListComponent', () => {
  let component: FeatureCatalogListComponent
  let fixture: ComponentFixture<FeatureCatalogListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideI18n()],
    }).compileComponents()

    fixture = TestBed.createComponent(FeatureCatalogListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('#getColumnsDefinition', () => {
    it('returns the right base column definition', () => {
      const attributes = [
        {
          code: 'OBJECTID',
          name: 'OBJECTID',
          definition: 'Object identifier',
          type: 'OID',
        },
      ]
      expect(
        component.getColumnsDefinition(attributes).map((c) => c.key)
      ).toStrictEqual(['type', 'name', 'code', 'definition'])
    })

    it('returns the right column definition with "values" column', () => {
      const attributesWithValues = [
        {
          code: 'OBJECTID',
          name: 'OBJECTID',
          definition: 'Object identifier',
          type: 'OID',
          values: [{ code: 'Code', label: 'The Label' }],
        },
      ]
      expect(
        component.getColumnsDefinition(attributesWithValues).map((c) => c.key)
      ).toStrictEqual(['type', 'name', 'code', 'definition', 'values'])
    })
  })

  describe('#getGridTemplateColumns', () => {
    it('returns the right base grid template', () => {
      const attributes = [
        {
          code: 'OBJECTID',
          name: 'OBJECTID',
          definition: 'Object identifier',
          type: 'OID',
        },
      ]
      expect(component.getGridTemplateColumns(attributes)).toBe(
        '17% 32% 17% minmax(0px, 1fr)'
      )
    })
    it('returns the right grid template with "values" column', () => {
      const attributesWithValues = [
        {
          code: 'OBJECTID',
          name: 'OBJECTID',
          definition: 'Object identifier',
          type: 'OID',
          values: [{ code: 'Code', label: 'The Label' }],
        },
      ]
      expect(component.getGridTemplateColumns(attributesWithValues)).toBe(
        '17% 32% 17% minmax(0px, 1fr) 73px'
      )
    })
  })
})
