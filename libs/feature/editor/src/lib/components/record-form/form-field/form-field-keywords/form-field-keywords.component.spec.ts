import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FormFieldKeywordsComponent } from './form-field-keywords.component'
import {
  DropdownSelectorComponent,
  UiInputsModule,
} from '@geonetwork-ui/ui/inputs'
import { CommonModule } from '@angular/common'
import { UiWidgetsModule } from '@geonetwork-ui/ui/widgets'
import { Gn4PlatformService } from '@geonetwork-ui/api/repository'
import { of } from 'rxjs'
import { FormControl } from '@angular/forms'

class Gn4PlatformServiceMock {
  searchKeywords = jest.fn(() =>
    of([{ label: 'Address', thesaurus: { id: '1' } }])
  )
}
describe('FormFieldKeywordsComponent', () => {
  let component: FormFieldKeywordsComponent
  let fixture: ComponentFixture<FormFieldKeywordsComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormFieldKeywordsComponent,
        DropdownSelectorComponent,
        UiInputsModule,
        CommonModule,
        UiWidgetsModule,
      ],
      providers: [
        {
          provide: Gn4PlatformService,
          useClass: Gn4PlatformServiceMock,
        },
      ],
    })
    fixture = TestBed.createComponent(FormFieldKeywordsComponent)
    component = fixture.componentInstance
    component.control = new FormControl()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
