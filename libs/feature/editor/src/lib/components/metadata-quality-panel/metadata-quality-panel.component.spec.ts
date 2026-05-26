import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MetadataQualityPanelComponent } from './metadata-quality-panel.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { EditorConfig } from '../../models'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { EditorFacade } from '../../+state/editor.facade'
import { BehaviorSubject } from 'rxjs'

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
  let mockFacade: {
    setFocusedField: jest.Mock
    editorConfig$: BehaviorSubject<EditorConfig | null>
    record$: BehaviorSubject<CatalogRecord | null>
  }

  beforeEach(async () => {
    mockFacade = {
      setFocusedField: jest.fn(),
      editorConfig$: new BehaviorSubject<EditorConfig | null>(null),
      record$: new BehaviorSubject<CatalogRecord | null>(null),
    }

    await TestBed.configureTestingModule({
      imports: [MetadataQualityPanelComponent],
      providers: [
        provideI18n(),
        { provide: EditorFacade, useValue: mockFacade },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(MetadataQualityPanelComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('when editorConfig and record are set', () => {
    let propertiesByPage: { label: string; value: boolean; model: any }[][]

    beforeEach(() => {
      mockFacade.editorConfig$.next(EDITOR_CONFIG_MOCK)
      mockFacade.record$.next(RECORD_MOCK)
      component.propertiesByPage$.subscribe((v) => (propertiesByPage = v))
    })

    it('should initialize propertiesByPage corresponding to editorConfig and propsToValidate', () => {
      expect(propertiesByPage).toEqual([
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
            model: 'contacts' as any,
          },
        ],
      ])
    })

    it('should append organisation to page 2 as FIXME field', () => {
      expect(
        propertiesByPage[1].find((p) => p.label.includes('organisation'))
      ).toBeDefined()
    })
  })

  it('should have empty propertiesByPage when editorConfig and record are not set', () => {
    let result: any[]
    component.propertiesByPage$.subscribe((v) => (result = v))
    expect(result.length).toBe(0)
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
})
