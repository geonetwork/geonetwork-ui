import { ComponentFixture, TestBed } from '@angular/core/testing'

import { GenericKeywordsComponent } from './generic-keywords.component'
import {
  DropdownSelectorComponent,
  UiInputsModule,
} from '@geonetwork-ui/ui/inputs'
import { CommonModule } from '@angular/common'
import { UiWidgetsModule } from '@geonetwork-ui/ui/widgets'
import { of } from 'rxjs'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { KeywordType } from '@geonetwork-ui/common/domain/model/thesaurus'

class PlatformServiceInterfaceMock {
  searchKeywords = jest.fn(() =>
    of([{ label: 'Address', thesaurus: { id: '1' } }])
  )
}
describe('GenericKeywordsComponent', () => {
  let component: GenericKeywordsComponent
  let fixture: ComponentFixture<GenericKeywordsComponent>
  let platformService: PlatformServiceInterface

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        GenericKeywordsComponent,
        DropdownSelectorComponent,
        UiInputsModule,
        CommonModule,
        UiWidgetsModule,
      ],
      providers: [
        {
          provide: PlatformServiceInterface,
          useClass: PlatformServiceInterfaceMock,
        },
      ],
    })
    fixture = TestBed.createComponent(GenericKeywordsComponent)
    platformService = TestBed.inject(PlatformServiceInterface)
    component = fixture.componentInstance
    component.keywords = []
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display the keyword with the thesaurus name', () => {
    const item = {
      title: 'Address',
      value: { thesaurus: { name: 'Address-Thesaurus' } },
    } as any
    expect(component.displayWithFn(item)).toBe('Address (Address-Thesaurus)')
  })

  it('should search keywords', () => {
    component.keywordTypes = ['theme', 'temporal']
    component.autoCompleteAction('Address')

    expect(platformService.searchKeywords).toHaveBeenCalledWith('Address', [
      'theme',
      'temporal',
    ])
  })

  it('should add keyword', () => {
    const keyword = {
      label: 'Address',
      thesaurus: { id: '1' },
      type: 'theme' as KeywordType,
    }
    component.addKeyword(keyword)

    expect(component.keywords).toEqual([keyword])
  })

  it('should not add duplicated keyword if it is a duplicate', () => {
    const keyword = {
      label: 'Address',
      thesaurus: { id: '1' },
      type: 'theme' as KeywordType,
    }
    component.keywords = [keyword]
    component.addKeyword(keyword)

    expect(component.keywords).toEqual([keyword])
    expect(component.keywords.length).toEqual(1)
  })

  it('should remove keyword', () => {
    const keyword = {
      label: 'Address',
      thesaurus: { id: '1' },
      type: 'theme' as KeywordType,
    }
    component.keywords = [keyword]
    component.removeKeyword(keyword)

    expect(component.keywords).toEqual([])
  })
})
