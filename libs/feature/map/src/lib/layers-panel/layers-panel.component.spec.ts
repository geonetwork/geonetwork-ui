import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LayersPanelComponent } from './layers-panel.component'
import { UtilI18nModule } from '@geonetwork-ui/util/i18n'
import { TranslateModule } from '@ngx-translate/core'
import { MatIconModule } from '@angular/material/icon'
import { of } from 'rxjs'
import { MAP_CTX_LAYER_XYZ_FIXTURE } from '../map-context/map-context.fixtures'
import { MapFacade } from '../+state/map.facade'
import { NO_ERRORS_SCHEMA } from '@angular/core'

class MapFacadeMock {
  layers$ = of([MAP_CTX_LAYER_XYZ_FIXTURE])
  removeLayer = jest.fn()
}

describe('LayersPanelComponent', () => {
  let component: LayersPanelComponent
  let fixture: ComponentFixture<LayersPanelComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtilI18nModule, TranslateModule.forRoot(), MatIconModule],
      declarations: [LayersPanelComponent],
      providers: [
        {
          provide: MapFacade,
          useClass: MapFacadeMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LayersPanelComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
