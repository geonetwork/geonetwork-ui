import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MetadataQualityPanelComponent } from './metadata-quality-panel.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { EditorConfig } from '../../models'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { EditorFacade } from '../../+state/editor.facade'

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
  let mockFacade: { setFocusedField: jest.Mock }

  beforeEach(async () => {
    mockFacade = { setFocusedField: jest.fn() }

    await TestBed.configureTestingModule({
      imports: [MetadataQualityPanelComponent],
      providers: [
        provideI18n(),
        { provide: EditorFacade, useValue: mockFacade },
      ],
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
          {
            label: 'editor.record.form.field.title',
            value: true,
            model: 'title',
          },
          {
            label: 'editor.record.form.field.abstract',
            value: true,
            model: 'abstract',
          },
          {
            label: 'editor.record.form.field.keywords',
            value: true,
            model: 'keywords',
          },
          {
            label: 'editor.record.form.field.updateFrequency',
            value: true,
            model: 'updateFrequency',
          },
          {
            label: 'editor.record.form.field.topics',
            value: true,
            model: 'topics',
          },
        ],
        [
          {
            label: 'editor.record.form.field.legalConstraints',
            value: false,
            model: 'legalConstraints',
          },
          {
            label: 'editor.record.form.field.contacts',
            value: false,
            model: 'contacts',
          },
          {
            label: 'editor.record.form.field.organisation',
            value: false,
            model: 'organisation' as any,
          },
        ],
      ])
    })

    it('should append organisation to page 2 as FIXME field', () => {
      const page2 = component.propertiesByPage[1]
      expect(page2.find((p) => p.label.includes('organisation'))).toBeDefined()
    })
  })

  it('should handle empty editorConfig and record', () => {
    component.editorConfig = undefined
    component.record = undefined
    component.ngOnChanges()
    expect(component.propertiesByPage.length).toBe(0)
  })

  describe('onCriterionClick', () => {
    it('should call facade.setFocusedField when criterion is invalid', () => {
      component.onCriterionClick({ value: false, model: 'abstract' })
      expect(mockFacade.setFocusedField).toHaveBeenCalledWith('abstract')
    })

    it('should not call facade.setFocusedField when criterion is valid', () => {
      component.onCriterionClick({ value: true, model: 'title' })
      expect(mockFacade.setFocusedField).not.toHaveBeenCalled()
    })
  })

  describe('getExtraClass', () => {
    it('should include hover background for invalid items', () => {
      expect(component.getExtraClass(false)).toContain('hover:bg-gray-100')
    })

    it('should include cursor-default for valid items', () => {
      expect(component.getExtraClass(true)).toContain('cursor-default')
    })

    it('should include bg-neutral-100 for checked items', () => {
      expect(component.getExtraClass(true)).toContain('bg-neutral-100')
    })
  })
})
