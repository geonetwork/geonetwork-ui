import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FormFieldKeywordsComponent } from './form-field-keywords.component'
import { of } from 'rxjs'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { Keyword } from '@geonetwork-ui/common/domain/model/record'
import { MockBuilder } from 'ng-mocks'
import { EditorFacade } from '../../../../+state/editor.facade'
import { provideI18n } from '@geonetwork-ui/util/i18n'

const placeKeywords: Keyword[] = [
  {
    label: 'Address',
    thesaurus: { id: '0' },
    type: 'place',
    bbox: [0, 0, 0, 0],
  },
  {
    label: 'City',
    thesaurus: { id: '1' },
    type: 'place',
    bbox: [1, 1, 1, 1],
  },
  {
    label: 'Country',
    thesaurus: { id: '2' },
    type: 'place',
    bbox: [2, 2, 2, 2],
  },
]

const otherKeywords: Keyword[] = [
  {
    label: 'Administatrative',
    thesaurus: { id: '3' },
    type: 'theme',
  },
  {
    label: 'Agriculture',
    thesaurus: { id: '4' },
    type: 'theme',
  },
  {
    label: 'Nature',
    thesaurus: { id: '5' },
    type: 'other',
  },
]

const spatialScopeKeywords: Keyword[] = [
  {
    label: 'National',
    description: '',
    type: 'theme',
  },
  {
    label: 'Regional',
    description: '',
    type: 'theme',
  },
]

class PlatformServiceInterfaceMock {
  searchKeywords = jest.fn(() =>
    of([{ label: 'Address', thesaurus: { id: '1' } }])
  )
}

class EditorFacadeMock {
  record$ = of({
    keywords: [...placeKeywords, ...otherKeywords, spatialScopeKeywords[1]],
  })
}

describe('FormFieldKeywordsComponent', () => {
  let component: FormFieldKeywordsComponent
  let fixture: ComponentFixture<FormFieldKeywordsComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideI18n(),
        {
          provide: PlatformServiceInterface,
          useClass: PlatformServiceInterfaceMock,
        },
        {
          provide: EditorFacade,
          useClass: EditorFacadeMock,
        },
      ],
    })
    fixture = TestBed.createComponent(FormFieldKeywordsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  beforeEach(() => {
    return MockBuilder(FormFieldKeywordsComponent)
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should filter out place keywords and spatial scope keywords', () => {
    component.value = [
      ...placeKeywords,
      ...otherKeywords,
      spatialScopeKeywords[0],
    ]

    expect(component.filteredKeywords).toEqual(otherKeywords)
  })

  it('should emit all keywords (place and other) on change', async () => {
    const newKeyword: Keyword = {
      label: 'New keyword',
      thesaurus: { id: '6' },
      type: 'theme',
    }
    otherKeywords.push(newKeyword)
    const valueChangeSpy = jest.spyOn(component.valueChange, 'emit')
    await component.handleKeywordsChange([...otherKeywords])

    expect(valueChangeSpy).toHaveBeenCalledWith([
      ...placeKeywords,
      spatialScopeKeywords[1],
      ...otherKeywords,
    ])
  })
})
