import {
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  flush,
  flushMicrotasks,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing'
import { MapComponent } from './map.component'
import { readFirst } from '@nrwl/angular/testing'
import { MatIconModule } from '@angular/material/icon'

class ResizeObserverMock {
  observe = jest.fn()
  unobserve = jest.fn()
}

;(window as any).ResizeObserver = ResizeObserverMock

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
      it('mapmuted event displays message', fakeAsync(() => {
        mapmutedCallback()
        expect(messageDisplayed).toEqual(true)
        discardPeriodicTasks()
      }))
      it('message goes away after 2s', fakeAsync(() => {
        mapmutedCallback()
        tick(2500)
        expect(messageDisplayed).toEqual(false)
        discardPeriodicTasks()
      }))
    })
  })
})
