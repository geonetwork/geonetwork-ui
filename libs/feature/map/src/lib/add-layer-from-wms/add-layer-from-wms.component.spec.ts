import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AddLayerFromWmsComponent } from './add-layer-from-wms.component'
import { MapFacade } from '../+state/map.facade'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'

class MapFacadeMock {
  addLayer = jest.fn()
}

describe('AddLayerFromWmsComponent', () => {
  let component: AddLayerFromWmsComponent
  let fixture: ComponentFixture<AddLayerFromWmsComponent>
  let mapFacade: MapFacade

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [AddLayerFromWmsComponent],
      providers: [
        {
          provide: MapFacade,
          useClass: MapFacadeMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()

    mapFacade = TestBed.inject(MapFacade)
    fixture = TestBed.createComponent(AddLayerFromWmsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
