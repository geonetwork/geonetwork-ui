import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MapComponent } from './map.component'
import { readFirst } from '@nrwl/angular/testing'

class ResizeObserverMock {
  observe = jest.fn()
  unobserve = jest.fn()
}
window.ResizeObserver = ResizeObserverMock

let mapmutedCallback
class OpenLayersMapMock {
  _size = undefined
  setTarget = jest.fn()
  updateSize() {
    this._size = [100, 100]
  }
  getSize() {
    return this._size
  }
  on(type, callback) {
    if (type === 'mapmuted') {
      mapmutedCallback = callback
    }
  }
}

describe('MapComponent', () => {
  let component: MapComponent
  let fixture: ComponentFixture<MapComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent)
    component = fixture.componentInstance
    component.map = new OpenLayersMapMock()
    fixture.detectChanges()
  })

  it('creates', () => {
    expect(component).toBeTruthy()
  })

  describe('#afterViewInit', () => {
    it('sets div element for map', () => {
      expect(component.map.setTarget).toHaveBeenCalled()
    })
    it('observes div element of map to update map size', () => {
      expect(component.resizeObserver.observe).toHaveBeenCalled()
    })
    describe('display message that map navigation has been muted', () => {
      beforeEach(() => {
        mapmutedCallback()
      })
      it('mapmuted event displays message', async () => {
        const displayMessage = await readFirst(component.displayMessage$)
        expect(displayMessage).toEqual(true)
      })
    })
  })
})
