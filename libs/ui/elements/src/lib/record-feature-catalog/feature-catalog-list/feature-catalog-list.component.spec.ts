import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FeatureCatalogListComponent } from './feature-catalog-list.component'
import { TranslateModule } from '@ngx-translate/core'
import { By } from '@angular/platform-browser'
import { ExpandablePanelComponent } from '@geonetwork-ui/ui/layout'

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
      imports: [
        FeatureCatalogListComponent,
        TranslateModule.forRoot(),
        ExpandablePanelComponent,
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
    component.columns = [
      { key: 'type', label: 'Type', width: '25%' },
      { key: 'name', label: 'Name', width: '25%' },
      { key: 'code', label: 'Code', width: '20%' },
      { key: 'title', label: 'Description', width: '30%' },
    ]
    fixture.detectChanges()
  })

  it('should create the template with title and colums with right width', () => {
    expect(component).toBeTruthy()
    component.ngOnInit()
    fixture.detectChanges()
    expect(component.gridTemplateColumns).toBe('25% 25% 20% 30%')
    const columnLabels = fixture.debugElement
      .queryAll(By.css('[data-test="column-label"]'))
      .map((el) => el.nativeElement.textContent.trim())
    expect(columnLabels).toEqual(['Type', 'Name', 'Code', 'Description'])
  })
})
