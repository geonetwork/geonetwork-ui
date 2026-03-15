import { importProvidersFrom } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { StoreModule } from '@ngrx/store'
import { provideGn4, provideRepositoryUrl } from '@geonetwork-ui/api/repository'
import { FeatureSearchModule } from '@geonetwork-ui/feature/search'
import { FeatureRecordModule } from '@geonetwork-ui/feature/record'
import { FeatureEditorModule } from '@geonetwork-ui/feature/editor'
import { EffectsModule } from '@ngrx/effects'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        importProvidersFrom([
          StoreModule.forRoot({}),
          FeatureSearchModule,
          FeatureRecordModule,
          FeatureEditorModule,
          EffectsModule.forRoot(),
        ]),
        provideGn4(),
        provideRepositoryUrl(() => 'https://local.dev/api/'),
        provideI18n(),
      ],
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })
})
