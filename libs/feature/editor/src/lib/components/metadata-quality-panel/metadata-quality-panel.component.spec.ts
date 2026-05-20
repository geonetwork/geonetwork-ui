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
            { model: 'contacts', hidden: false },
            { model: 'organisation', hidden: false },
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
            model: 'organisation',
          },
        ],
      ])
    })

    it('should append organisation to page 2 as FIXME field', () => {
      const page2 = component.propertiesByPage[1]
      expect(page2.find((p) => p.model === 'organisation')).toBeDefined()
    })
  })

  it('should handle empty editorConfig and record', () => {
    component.editorConfig = undefined
    component.record = undefined
    component.ngOnChanges()
    expect(component.propertiesByPage.length).toBe(0)
  })

  describe('onCriterionClick', () => {
    it('should emit criterionClicked when criterion is invalid', () => {
      const spy = jest.spyOn(component.criterionClicked, 'emit')
      component.onCriterionClick({ value: false, model: 'abstract' })
      expect(spy).toHaveBeenCalledWith('abstract')
    })

    it('should not emit criterionClicked when criterion is valid', () => {
      const spy = jest.spyOn(component.criterionClicked, 'emit')
      component.onCriterionClick({ value: true, model: 'title' })
      expect(spy).not.toHaveBeenCalled()
    })
  })

  describe('getExtraClass', () => {
    it('should include hover background for invalid navigable items', () => {
      expect(component.getExtraClass(false, 0)).toContain('hover:bg-gray-100')
    })

    it('should include cursor-default for valid items', () => {
      expect(component.getExtraClass(true, 0)).toContain('cursor-default')
    })

    it('should include cursor-default for FUTURE fields (pageIndex -1)', () => {
      expect(component.getExtraClass(false, -1)).toContain('cursor-default')
    })

    it('should include bg-neutral-100 for checked items', () => {
      expect(component.getExtraClass(true, 0)).toContain('bg-neutral-100')
    })

    it('should include bg-transparent for unchecked non-clickable items', () => {
      expect(component.getExtraClass(false, -1)).toContain('bg-transparent')
    })
  })
})
