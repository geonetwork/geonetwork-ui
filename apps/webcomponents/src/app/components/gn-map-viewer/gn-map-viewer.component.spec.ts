import { ComponentFixture, TestBed } from '@angular/core/testing'
import { GnMapViewerComponent } from './gn-map-viewer.component'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { MapFacade } from '@geonetwork-ui/feature/map'
import { TranslateModule } from '@ngx-translate/core'
import { NO_ERRORS_SCHEMA } from '@angular/core'

class SearchFacadeMock {}
class MapFacadeMock {}

describe('GnMapViewerComponent', () => {
  let component: GnMapViewerComponent
  let fixture: ComponentFixture<GnMapViewerComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GnMapViewerComponent],
      imports: [TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(GnMapViewerComponent, {
        set: {
          providers: [
            {
              provide: SearchFacade,
              useClass: SearchFacadeMock,
            },
            {
              provide: MapFacade,
              useClass: MapFacadeMock,
            },
          ],
        },
      })
      .compileComponents()

    fixture = TestBed.createComponent(GnMapViewerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
