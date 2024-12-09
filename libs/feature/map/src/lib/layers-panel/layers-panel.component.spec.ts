import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LayersPanelComponent } from './layers-panel.component'
import { of } from 'rxjs'
import { MockBuilder, MockProvider } from 'ng-mocks'
import { MapFacade } from '../+state/map.facade'
import { mapCtxFixture } from '@geonetwork-ui/common/fixtures'

describe('LayersPanelComponent', () => {
  let component: LayersPanelComponent
  let fixture: ComponentFixture<LayersPanelComponent>

  beforeEach(() => {
    return MockBuilder(LayersPanelComponent)
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayersPanelComponent],
      providers: [
        MockProvider(MapFacade, {
          context$: of(mapCtxFixture()),
        }),
      ],
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
