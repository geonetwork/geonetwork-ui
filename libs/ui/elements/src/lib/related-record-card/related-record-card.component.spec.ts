import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'
import { RelatedRecordCardComponent } from './related-record-card.component'

jest.mock('@geonetwork-ui/util/app-config', () => ({
  getThemeConfig: jest.fn(() => ({
    THUMBNAIL_PLACEHOLDER: 'assets/img/placeholder.svg',
  })),
  isConfigLoaded: jest.fn(() => true),
}))
describe('RelatedRecordCardComponent', () => {
  let component: RelatedRecordCardComponent
  let fixture: ComponentFixture<RelatedRecordCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RelatedRecordCardComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [TranslateModule.forRoot()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedRecordCardComponent)
    component = fixture.componentInstance
    component.record = {
      thumbnailUrl:
        'https://www.geo2france.fr/public/vignettes_geonetwork/arrondissements_hdf.JPG',
      title: 'Arrondissements de la région Hauts-de-France',
      uuid: 'd90835e0-2763-49f1-a251-cd64c8a4bbf4',
      metadataUrl:
        '/geonetwork/srv/api/../fre/catalog.search#/metadata/d90835e0-2763-49f1-a251-cd64c8a4bbf4',
      abstract:
        "Découpage géographique des arrondissements des Hauts-de-France. L'arrondissement, subdivision des départements, est une circonscription administrative qui depuis mars 2015 est composé de regroupement de communes.",
      id: '40697',
      hasDownloads: true,
      hasMaps: true,
    }
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
