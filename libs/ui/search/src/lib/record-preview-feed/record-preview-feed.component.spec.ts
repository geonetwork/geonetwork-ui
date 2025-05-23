import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RecordPreviewFeedComponent } from './record-preview-feed.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { someOrganizationsFixture } from '@geonetwork-ui/common/fixtures'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('RecordPreviewFeedComponent', () => {
  let component: RecordPreviewFeedComponent
  let fixture: ComponentFixture<RecordPreviewFeedComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordPreviewFeedComponent],
      imports: [TranslateDirective, TranslatePipe],
      providers: [provideI18n()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()

    fixture = TestBed.createComponent(RecordPreviewFeedComponent)
    component = fixture.componentInstance
    component.record = {
      uniqueIdentifier: 'd2f30aa4-867e-40b9-9c37-3cb21f541008',
      title: 'abcd',
      abstract: '<b>abstract</b>',
      landingPage: new URL('http://localhost/abcd.html'),
      overviews: [{ url: new URL('http://localhost/abcd.jpg') }],
      ownerOrganization: someOrganizationsFixture()[0],
      contacts: [],
    } as CatalogRecord
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('abstract is stripped', () => {
    expect(component.abstract).toBe('abstract')
  })
})
