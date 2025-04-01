import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SearchFeatureCatalogComponent } from './search-feature-catalog.component'
import { TranslateModule } from '@ngx-translate/core'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { By } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'

describe('SearchFeatureCatalogComponent', () => {
  let component: SearchFeatureCatalogComponent
  let fixture: ComponentFixture<SearchFeatureCatalogComponent>

  const singleFeatureCatalog = {
    featureTypes: [
      {
        name: 'Feature1',
        attributes: [
          { name: 'attr1', type: 'string' },
          { name: 'attr2', type: 'number' },
          { name: 'attr3', type: 'boolean' },
        ],
      },
    ],
  }

  const multipleFeatureCatalog = {
    featureTypes: [
      {
        name: 'Feature1',
        attributes: [
          { name: 'attr1', type: 'string' },
          { name: 'attr2', type: 'number' },
        ],
      },
      {
        name: 'Feature2',
        attributes: [
          { name: 'attr3', type: 'boolean' },
          { name: 'attr4', type: 'string' },
          { name: 'attr5', type: 'date' },
        ],
      },
      {
        name: 'TestFeature',
        attributes: [
          { name: 'attr6', type: 'number' },
          { name: 'attr7', type: 'string' },
        ],
      },
    ],
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SearchFeatureCatalogComponent,
        TranslateModule.forRoot(),
        FormsModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()

    fixture = TestBed.createComponent(SearchFeatureCatalogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  describe('Single feature catalog', () => {
    beforeEach(() => {
      component.featureCatalog = singleFeatureCatalog
      fixture.detectChanges()
    })

    it('should not display search input', () => {
      const searchInput = fixture.debugElement.query(By.css('input'))
      expect(searchInput).toBeNull()
    })

    it('should not display total objects count', () => {
      const totalObjectsText = fixture.debugElement.query(
        By.css('[translate="record.feature.catalog.number.total.object"]')
      )
      expect(totalObjectsText).toBeNull()
    })

    it('should display correct total attributes count', () => {
      const totalAttributesCount = fixture.debugElement.query(
        By.css('.text-sm.font-bold')
      )
      expect(totalAttributesCount.nativeElement.textContent.trim()).toBe('3')
    })
  })

  describe('Multiple feature catalog', () => {
    beforeEach(() => {
      component.featureCatalog = multipleFeatureCatalog
      fixture.detectChanges()
    })

    it('should display search input', () => {
      const searchInput = fixture.debugElement.query(By.css('input'))
      expect(searchInput).toBeTruthy()
    })

    it('should display correct initial counts', () => {
      const counts = fixture.debugElement.queryAll(By.css('.text-sm.font-bold'))
      expect(counts[0].nativeElement.textContent.trim()).toBe('3') // total objects
      expect(counts[1].nativeElement.textContent.trim()).toBe('7') // total attributes
    })

    it('should filter and update counts when searching', () => {
      const searchInput = fixture.debugElement.query(By.css('input'))
      searchInput.nativeElement.value = 'test'
      searchInput.nativeElement.dispatchEvent(new Event('input'))
      fixture.detectChanges()

      const counts = fixture.debugElement.queryAll(By.css('.text-sm.font-bold'))
      expect(counts[0].nativeElement.textContent.trim()).toBe('1') // filtered objects
      expect(counts[1].nativeElement.textContent.trim()).toBe('2') // filtered attributes
    })

    it('should emit filtered catalog on search', () => {
      let emittedCatalog
      component.filteredFeatureCatalogChange.subscribe((catalog) => {
        emittedCatalog = catalog
      })

      const searchInput = fixture.debugElement.query(By.css('input'))
      searchInput.nativeElement.value = 'test'
      searchInput.nativeElement.dispatchEvent(new Event('input'))

      expect(emittedCatalog.featureTypes.length).toBe(1)
      expect(emittedCatalog.featureTypes[0].name).toBe('TestFeature')
    })

    it('should reset to initial catalog when search is cleared', () => {
      const searchInput = fixture.debugElement.query(By.css('input'))

      // First filter
      searchInput.nativeElement.value = 'test'
      searchInput.nativeElement.dispatchEvent(new Event('input'))
      fixture.detectChanges()

      // Then clear
      searchInput.nativeElement.value = ''
      searchInput.nativeElement.dispatchEvent(new Event('input'))
      fixture.detectChanges()

      const counts = fixture.debugElement.queryAll(By.css('.text-sm.font-bold'))
      expect(counts[0].nativeElement.textContent.trim()).toBe('3')
      expect(counts[1].nativeElement.textContent.trim()).toBe('7')
    })
  })
})
