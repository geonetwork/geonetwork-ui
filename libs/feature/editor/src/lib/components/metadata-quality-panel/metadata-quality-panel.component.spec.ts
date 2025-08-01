import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MetadataQualityPanelComponent } from './metadata-quality-panel.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { EditorConfig } from '../../models'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'

const EDITOR_CONFIG_MOCK: EditorConfig = {
  pages: [
    {
      sections: [
        {
          fields: [
            { model: 'title', hidden: false },
            { model: 'abstract', hidden: false },
            { model: 'keywords', hidden: false },
            { model: 'updateFrequency', hidden: false },
            { model: 'topics', hidden: false },
            { model: 'notInPropsToValidate', hidden: false },
          ],
        },
      ],
    },
    {
      sections: [
        {
          fields: [{ model: 'notEmptySection', hidden: false }],
        },
      ],
    },
    {
      sections: [
        {
          fields: [
            { model: 'legalConstraints', hidden: true },
            { model: 'organisation', hidden: false },
            { model: 'contacts', hidden: false },
          ],
        },
      ],
    },
  ],
} as any

const RECORD_MOCK: CatalogRecord = {
  title: 'Test Title',
  abstract: 'Test Abstract',
  keywords: ['one', 'two'],
  updateFrequency: 'monthly',
  topics: ['topic1'],
  legalConstraints: [],
  contacts: [],
  otherLanguages: [],
  defaultLanguage: 'en',
} as any

describe('MetadataQualityPanelComponent', () => {
  let component: MetadataQualityPanelComponent
  let fixture: ComponentFixture<MetadataQualityPanelComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetadataQualityPanelComponent],
      providers: [provideI18n()],
    }).compileComponents()

    fixture = TestBed.createComponent(MetadataQualityPanelComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('when editorConfig and record are set', () => {
    beforeEach(() => {
      component.editorConfig = EDITOR_CONFIG_MOCK
      component.record = RECORD_MOCK
      component.ngOnChanges()
    })
    it('should initialize propertiesByPage corresponding to editorConfig and propsToValidate', () => {
      expect(component.propertiesByPage).toEqual([
        [
          { label: 'editor.record.form.field.title', value: true },
          { label: 'editor.record.form.field.abstract', value: true },
          { label: 'editor.record.form.field.keywords', value: true },
          { label: 'editor.record.form.field.updateFrequency', value: true },
          { label: 'editor.record.form.field.topics', value: true },
        ],
        [
          {
            label: 'editor.record.form.field.legalConstraints',
            value: false,
          },
          { label: 'editor.record.form.field.organisation', value: false },
          { label: 'editor.record.form.field.contacts', value: false },
        ],
      ])
    })
  })
  it('should handle empty editorConfig and record', () => {
    component.editorConfig = undefined
    component.record = undefined
    component.ngOnChanges()
    expect(component.propertiesByPage.length).toBe(0)
  })

  it('getExtraClass should return correct classes', () => {
    const checkedClass = component.getExtraClass(true)
    const uncheckedClass = component.getExtraClass(false)
    expect(checkedClass).toContain('bg-neutral-100')
    expect(uncheckedClass).toContain('bg-transparent')
  })
})
