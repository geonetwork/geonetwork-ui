import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NewsPageComponent } from './news-page.component'
import { getGlobalConfig } from '@geonetwork-ui/util/app-config'
import { TranslateTestingModule } from 'ngx-translate-testing'
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler'
import { MockBuilder } from 'ng-mocks'

jest.mock('@geonetwork-ui/util/app-config', () => ({
  getGlobalConfig() {
    return {
      CONTACT_EMAIL: 'mocked-email@example.com',
    }
  },
  getOptionalSearchConfig() {
    return {
      LIMIT: 10,
    }
  },
}))

describe('NewsPageComponent', () => {
  let component: NewsPageComponent
  let fixture: ComponentFixture<NewsPageComponent>

  beforeEach(() => MockBuilder(NewsPageComponent))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule.withTranslations({
          en: {
            'datahub.news.contact.html': '<p>line1</p><p>line2</p>',
          },
        })
          .withDefaultLanguage('en')
          .withCompiler(new TranslateMessageFormatCompiler()),
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(NewsPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should return email', () => {
    expect(getGlobalConfig().CONTACT_EMAIL).toEqual('mocked-email@example.com')
  })
})
