import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormFieldOnlineSingleLinkResourceComponent } from './form-field-online-single-link-resource.component'
import { MockBuilder } from 'ng-mocks'
import { aSetOfLinksFixture } from '@geonetwork-ui/common/fixtures'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { OnlineLinkResource } from '@geonetwork-ui/common/domain/model/record'

describe('FormFieldOnlineSingleLinkResourceComponent', () => {
  let component: FormFieldOnlineSingleLinkResourceComponent
  let fixture: ComponentFixture<FormFieldOnlineSingleLinkResourceComponent>

  beforeEach(() => {
    return MockBuilder(FormFieldOnlineSingleLinkResourceComponent)
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideI18n()],
    }).compileComponents()

    fixture = TestBed.createComponent(
      FormFieldOnlineSingleLinkResourceComponent
    )
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('read mode', () => {
    it('displays the URL of the first resource', () => {
      component.value = [
        aSetOfLinksFixture().readmeLink(),
        aSetOfLinksFixture().doiLink(),
      ]
      expect(component.displayUrl).toBe(
        aSetOfLinksFixture().readmeLink().url.toString()
      )
    })

    it('displays an empty string when the array is empty', () => {
      component.value = []
      expect(component.displayUrl).toBe('')
    })
  })

  describe('write mode', () => {
    describe('when the array is empty and user enters a URL', () => {
      let valueChange: any
      beforeEach(() => {
        valueChange = null
        component.valueChange.subscribe((v) => (valueChange = v))
        component.value = []
      })

      it('emits a new array with a single link resource with a default name', () => {
        component.handleUrlChange('https://example.com/my-resource')
        expect(valueChange).toEqual([
          {
            type: 'link',
            url: new URL('https://example.com/my-resource'),
            name: 'editor.record.form.field.onlineLinkageResource.defaultName',
          },
        ])
      })
    })

    describe('when the array is non-empty and user modifies the URL', () => {
      let valueChange: any
      beforeEach(() => {
        valueChange = null
        component.valueChange.subscribe((v) => (valueChange = v))
        component.value = [
          aSetOfLinksFixture().readmeLink(),
          aSetOfLinksFixture().doiLink(),
        ]
      })

      it('emits updated resources with modified first resource URL, keeping others unchanged', () => {
        component.handleUrlChange('https://new-url.example.com/page')
        expect(valueChange).toEqual([
          {
            ...aSetOfLinksFixture().readmeLink(),
            url: new URL('https://new-url.example.com/page'),
          },
          aSetOfLinksFixture().doiLink(),
        ])
      })
    })
  })
})
