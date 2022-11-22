import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MAP_CTX_FIXTURE } from '../map-context.fixtures'

import { MapContextComponent } from './map-context.component'
import { MAP_CONFIG_FIXTURE } from '@geonetwork-ui/util/app-config'
import { HttpClientModule } from '@angular/common/http'
import { NativeMapElement } from '@camptocamp/native-map'
import { By } from '@angular/platform-browser'
import Feature from 'ol/Feature'

jest.mock('@camptocamp/native-map', () => {
  class NativeMapMock extends HTMLElement {}
  customElements.define('native-map', NativeMapMock)
  return {}
})

describe('MapContextComponent', () => {
  let component: MapContextComponent
  let fixture: ComponentFixture<MapContextComponent>
  let nativeMapElt: NativeMapElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapContextComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MapContextComponent)
    component = fixture.componentInstance
    component.context = MAP_CTX_FIXTURE
    component.mapConfig = MAP_CONFIG_FIXTURE
    nativeMapElt = fixture.debugElement.query(
      By.css('native-map')
    ).nativeElement
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  describe('with initial context', () => {
    beforeEach(() => {
      component.context = MAP_CTX_FIXTURE
      fixture.detectChanges()
    })
    it('provides the value to the native-map element', () => {
      expect(nativeMapElt.context).toBe(MAP_CTX_FIXTURE)
    })
  })

  describe('featuresClicked', () => {
    describe('when a featuresClicked event is received from the native map', () => {
      let emitted
      const feature1 = new Feature({})
      const feature2 = new Feature({})
      beforeEach(() => {
        emitted = null
        component.featuresClicked.subscribe((v) => (emitted = v))
        nativeMapElt.dispatchEvent(
          new CustomEvent('featuresClicked', {
            detail: {
              features: [[feature1], null, null, [feature2]],
            },
          })
        )
      })
      it('emits features in a simple array', () => {
        expect(emitted).toEqual([feature1, feature2])
      })
    })
  })
})
