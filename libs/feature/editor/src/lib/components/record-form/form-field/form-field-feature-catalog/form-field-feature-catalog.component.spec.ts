import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { MatDialog } from '@angular/material/dialog'
import { of } from 'rxjs'
import { DatasetFeatureType } from '@geonetwork-ui/common/domain/model/record'
import { provideTranslateTestingService } from '@geonetwork-ui/util/i18n/test-translate-loader'
import { FormFieldFeatureCatalogComponent } from './form-field-feature-catalog.component'

class MatDialogMock {
  confirmed = true
  open = jest.fn(() => ({ afterClosed: () => of(this.confirmed) }))
}

const createFeatureTypes = (): DatasetFeatureType[] => [
  { name: 'roads', description: 'All roads', attributes: [] },
  { name: 'rivers', description: 'All rivers', attributes: [] },
]

describe('FormFieldFeatureCatalogComponent', () => {
  let component: FormFieldFeatureCatalogComponent
  let fixture: ComponentFixture<FormFieldFeatureCatalogComponent>
  let dialog: MatDialogMock
  let emitted: DatasetFeatureType[][]

  const query = (dataTest: string) =>
    fixture.debugElement.query(By.css(`[data-test="${dataTest}"]`))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldFeatureCatalogComponent],
      providers: [
        provideTranslateTestingService({
          en: { 'editor.record.form.featureCatalog.name': 'Table title' },
        }),
        { provide: MatDialog, useClass: MatDialogMock },
      ],
    }).compileComponents()

    dialog = TestBed.inject(MatDialog) as unknown as MatDialogMock
    fixture = TestBed.createComponent(FormFieldFeatureCatalogComponent)
    component = fixture.componentInstance
    emitted = []
    component.valueChange.subscribe((value) => emitted.push(value))
  })

  describe('without feature catalog', () => {
    beforeEach(() => {
      component.value = undefined
      fixture.detectChanges()
    })

    it('shows the create button only', () => {
      expect(query('feature-catalog-create')).toBeTruthy()
      expect(query('feature-catalog-table')).toBeFalsy()
    })

    it('creates an empty feature type', () => {
      query('feature-catalog-create').triggerEventHandler('buttonClick')
      expect(emitted).toEqual([[{ name: '', description: '', attributes: [] }]])
    })
  })

  describe('with feature types', () => {
    beforeEach(() => {
      component.value = createFeatureTypes()
      fixture.detectChanges()
    })

    it('shows the first feature type', () => {
      expect(query('feature-catalog-create')).toBeFalsy()
      expect(query('feature-catalog-name').componentInstance.value()).toBe(
        'roads'
      )
      expect(query('feature-catalog-description').componentInstance.value).toBe(
        'All roads'
      )
    })

    it('updates the name of the first feature type only', () => {
      query('feature-catalog-name').triggerEventHandler('valueChange', 'paths')
      expect(emitted).toEqual([
        [
          { name: 'paths', description: 'All roads', attributes: [] },
          createFeatureTypes()[1],
        ],
      ])
    })

    it('updates the description of the first feature type only', () => {
      query('feature-catalog-description').triggerEventHandler(
        'valueChange',
        'Some paths'
      )
      expect(emitted).toEqual([
        [
          { name: 'roads', description: 'Some paths', attributes: [] },
          createFeatureTypes()[1],
        ],
      ])
    })

    it('deletes all feature types once confirmed', () => {
      query('feature-catalog-delete').triggerEventHandler('buttonClick')
      expect(dialog.open).toHaveBeenCalled()
      expect(emitted).toEqual([[]])
    })

    it('keeps the feature types if deletion is cancelled', () => {
      dialog.confirmed = false
      query('feature-catalog-delete').triggerEventHandler('buttonClick')
      expect(emitted).toEqual([])
    })
  })
})
