import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FeatureCatalogListComponent } from './feature-catalog-list.component'
import { By } from '@angular/platform-browser'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('FeatureCatalogListComponent', () => {
  let component: FeatureCatalogListComponent
  let fixture: ComponentFixture<FeatureCatalogListComponent>
  beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
      observe = jest.fn()
      unobserve = jest.fn()
      disconnect = jest.fn()
    }
    global.MutationObserver = class MutationObserver {
      observe = jest.fn()
      disconnect = jest.fn()
      takeRecords = jest.fn().mockReturnValue([])
    }
  })
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideI18n({
          useDefaultLang: false, // this leaves the keys untouched
        }),
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(FeatureCatalogListComponent)
    component = fixture.componentInstance
    component.filteredFeatureCatalog = {
      featureTypes: [
        {
          name: 'TestFeature',
          definition: 'Test Definition',
          attributes: [
            {
              type: 'String',
              name: 'test_field',
              code: 'TEST_001',
              title: 'Test description',
            },
          ],
        },
      ],
    }
    fixture.detectChanges()
  })

  it('should create the template with title and columns with right width', () => {
    expect(component).toBeTruthy()
    component.ngOnInit()
    fixture.detectChanges()
    expect(component.gridTemplateColumns).toBe('19% 32% 24% 25%')
    const columnLabels = fixture.debugElement
      .queryAll(By.css('[data-test="column-label"]'))
      .map((el) => el.nativeElement.textContent.trim())
    expect(columnLabels).toEqual([
      'feature.catalog.attribute.type',
      'feature.catalog.attribute.name',
      'feature.catalog.attribute.code',
      'feature.catalog.attribute.description',
    ])
  })
})
