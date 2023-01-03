import {
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing'
import { MapComponent } from './map.component'
import { MatIconModule } from '@angular/material/icon'

class ResizeObserverMock {
  observe = jest.fn()
  unobserve = jest.fn()
}

;(window as any).ResizeObserver = ResizeObserverMock

let mapmutedCallback
let movestartCallback
let singleclickCallback
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
    if (type === 'movestart') {
      movestartCallback = callback
    }
    if (type === 'singleclick') {
      singleclickCallback = callback
    }
  }
  off() {
    // do nothing!
  }
}

describe('MapComponent', () => {
  let component: MapComponent
  let fixture: ComponentFixture<MapComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconModule],
      declarations: [MapComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent)
    component = fixture.componentInstance
    component.map = new OpenLayersMapMock() as any
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
      let messageDisplayed
      beforeEach(() => {
        messageDisplayed = null
        component.displayMessage$.subscribe(
          (value) => (messageDisplayed = value)
        )
      })
      it('mapmuted event displays message after 300ms (delay for eventually hiding message)', fakeAsync(() => {
        mapmutedCallback()
        tick(400)
        expect(messageDisplayed).toEqual(true)
        discardPeriodicTasks()
      }))
      it('message goes away after 2s', fakeAsync(() => {
        mapmutedCallback()
        tick(2500)
        expect(messageDisplayed).toEqual(false)
        discardPeriodicTasks()
      }))
      it('message does not display if map fires movestart event', fakeAsync(() => {
        movestartCallback()
        tick(300)
        expect(messageDisplayed).toEqual(false)
        discardPeriodicTasks()
      }))
      it('message does not display if map fires singleclick event', fakeAsync(() => {
        singleclickCallback()
        tick(300)
        expect(messageDisplayed).toEqual(false)
        discardPeriodicTasks()
      }))
    })
  })
})
