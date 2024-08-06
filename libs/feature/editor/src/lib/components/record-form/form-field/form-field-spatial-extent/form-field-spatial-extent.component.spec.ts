import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FormFieldSpatialExtentComponent } from './form-field-spatial-extent.component'
import { of } from 'rxjs'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import {
  DEFAULT_STYLE_FIXTURE,
  DEFAULT_STYLE_HL_FIXTURE,
  FeatureMapModule,
  MapFacade,
  MapStyleService,
} from '@geonetwork-ui/feature/map'
import { Style } from 'ol/style'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import {
  AutocompleteComponent,
  DropdownSelectorComponent,
  SwitchToggleComponent,
  UiInputsModule,
} from '@geonetwork-ui/ui/inputs'
import { CommonModule } from '@angular/common'
import { UiWidgetsModule } from '@geonetwork-ui/ui/widgets'
import { FormControl } from '@angular/forms'
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'

const mapStyleServiceMock = {
  createDefaultStyle: jest.fn(() => new Style()),
  styles: {
    default: DEFAULT_STYLE_FIXTURE,
    defaultHL: DEFAULT_STYLE_HL_FIXTURE,
  },
}
class MapFacadeMock {
  addLayer = jest.fn()
}
class PlatformServiceInterfaceMock {
  searchKeywords = jest.fn(() =>
    of([{ label: 'Africa', thesaurus: { id: '1' } }])
  )
}
describe('FormFieldSpatialExtentComponent', () => {
  let component: FormFieldSpatialExtentComponent
  let fixture: ComponentFixture<FormFieldSpatialExtentComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormFieldSpatialExtentComponent,
        EffectsModule.forRoot(),
        StoreModule.forRoot({}),
        DropdownSelectorComponent,
        UiInputsModule,
        CommonModule,
        UiWidgetsModule,
        AutocompleteComponent,
        FeatureMapModule,
        SwitchToggleComponent,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: PlatformServiceInterface,
          useClass: PlatformServiceInterfaceMock,
        },
        {
          provide: MapFacade,
          useClass: MapFacadeMock,
        },
        {
          provide: MapStyleService,
          useValue: mapStyleServiceMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(FormFieldSpatialExtentComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldSpatialExtentComponent)
    component = fixture.componentInstance
    component.placeKeywords = new FormControl()
    component.spatialExtents = { features: [], type: 'FeatureCollection' }
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
