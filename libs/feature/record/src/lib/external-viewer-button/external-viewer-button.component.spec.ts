import { Component, EventEmitter, Output } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { mapConfigFixture } from '@geonetwork-ui/util/app-config'
import { ExternalViewerButtonComponent } from './external-viewer-button.component'
import { TranslateModule } from '@ngx-translate/core'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'gn-ui-button',
  template: '<div></div>',
})
export class MockButtonComponent {
  @Output() buttonClick = new EventEmitter()
}

describe('ExternalViewerButtonComponent', () => {
  let component: ExternalViewerButtonComponent
  let fixture: ComponentFixture<ExternalViewerButtonComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExternalViewerButtonComponent, MockButtonComponent],
      imports: [TranslateModule.forRoot(), MatIconModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalViewerButtonComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  describe('with mapConfig and no link', () => {
    beforeEach(() => {
      component.mapConfig = mapConfigFixture()
      component.link = null
      fixture.detectChanges()
    })
    it('sets externalViewer to display button to false', () => {
      expect(component.externalViewer).toEqual(false)
    })
  })
  describe('with mapConfig and valid external links', () => {
    let buttonComponent: MockButtonComponent
    let componentSpy
    let windowSpy
    const openMock = jest.fn().mockReturnThis()
    const focusMock = jest.fn().mockReturnThis()
    describe('with mapConfig and WMS link', () => {
      beforeEach(() => {
        component.mapConfig = mapConfigFixture()
        component.link = {
          url: new URL(
            'http://example.com/ows?service=wms&request=getcapabilities'
          ),
          name: 'layername',
          type: 'service',
          accessServiceProtocol: 'wms',
        }
        fixture.detectChanges()
      })
      it('sets externalViewer to display button to true', () => {
        expect(component.externalViewer).toEqual(true)
      })
      describe('click button', () => {
        beforeEach(() => {
          buttonComponent = fixture.debugElement.query(
            By.directive(MockButtonComponent)
          ).componentInstance
          componentSpy = jest.spyOn(component, 'openInExternalViewer')
          windowSpy = jest
            .spyOn(global, 'window', 'get')
            .mockImplementation(() => ({
              open: openMock,
              focus: focusMock,
            }))
          buttonComponent.buttonClick.emit()
        })

        afterEach(() => {
          componentSpy.mockRestore()
          windowSpy.mockRestore()
        })
        it('calls openInExternalViewer', () => {
          expect(component.openInExternalViewer).toHaveBeenCalled()
        })
        it('opens window in new tab with URL including WMS link params', () => {
          expect(openMock).toHaveBeenCalledWith(
            'https://example.com/myviewer/#/?actions=[{"type":"CATALOG:ADD_LAYERS_FROM_CATALOGS","layers":["layername"],"sources":[{"url":"http%3A%2F%2Fexample.com%2Fows%3Fservice%3Dwms%26request%3Dgetcapabilities","type":"wms"}]}]',
            '_blank'
          )
        })
        it('focuses window', () => {
          expect(focusMock).toHaveBeenCalled()
        })
      })
    })
    describe('with mapConfig and WFS link', () => {
      beforeEach(() => {
        component.mapConfig = mapConfigFixture()
        component.link = {
          url: new URL(
            'http://example.com/ows?service=wfs&request=getcapabilities'
          ),
          name: 'layername',
          type: 'service',
          accessServiceProtocol: 'wfs',
        }
        fixture.detectChanges()
      })
      it('sets externalViewer to display button to true', () => {
        expect(component.externalViewer).toEqual(true)
      })
      describe('click button', () => {
        beforeEach(() => {
          buttonComponent = fixture.debugElement.query(
            By.directive(MockButtonComponent)
          ).componentInstance
          componentSpy = jest.spyOn(component, 'openInExternalViewer')
          windowSpy = jest
            .spyOn(global, 'window', 'get')
            .mockImplementation(() => ({
              open: openMock,
              focus: focusMock,
            }))
          buttonComponent.buttonClick.emit()
        })

        afterEach(() => {
          componentSpy.mockRestore()
          windowSpy.mockRestore()
        })
        it('calls openInExternalViewer', () => {
          expect(component.openInExternalViewer).toHaveBeenCalled()
        })
        it('opens window in new tab with URL including WFS link params', () => {
          expect(openMock).toHaveBeenCalledWith(
            'https://example.com/myviewer/#/?actions=[{"type":"CATALOG:ADD_LAYERS_FROM_CATALOGS","layers":["layername"],"sources":[{"url":"http%3A%2F%2Fexample.com%2Fows%3Fservice%3Dwfs%26request%3Dgetcapabilities","type":"wfs"}]}]',
            '_blank'
          )
        })
        it('focuses window', () => {
          expect(focusMock).toHaveBeenCalled()
        })
      })
    })
    describe('with mapConfig and GEOJSON link', () => {
      beforeEach(() => {
        component.mapConfig = mapConfigFixture()
        component.link = {
          url: new URL('http://example.com/somespatialdata.geojson'),
          type: 'download',
          mimeType: 'application/vnd.geo+json',
        }
        fixture.detectChanges()
      })
      it('sets externalViewer to display button to true', () => {
        expect(component.externalViewer).toEqual(true)
      })
      describe('click button', () => {
        beforeEach(() => {
          buttonComponent = fixture.debugElement.query(
            By.directive(MockButtonComponent)
          ).componentInstance
          componentSpy = jest.spyOn(component, 'openInExternalViewer')
          windowSpy = jest
            .spyOn(global, 'window', 'get')
            .mockImplementation(() => ({
              open: openMock,
              focus: focusMock,
            }))
          buttonComponent.buttonClick.emit()
        })

        afterEach(() => {
          componentSpy.mockRestore()
          windowSpy.mockRestore()
        })
        it('calls openInExternalViewer', () => {
          expect(component.openInExternalViewer).toHaveBeenCalled()
        })
        it('opens window in new tab with URL including link params', () => {
          expect(openMock).toHaveBeenCalledWith(
            'https://example.com/myviewer/#/?actions=[{"type":"CATALOG:ADD_LAYERS_FROM_CATALOGS","layers":["externalviewer.dataset.unnamed"],"sources":[{"url":"http%3A%2F%2Fexample.com%2Fsomespatialdata.geojson","type":"geojson"}]}]',
            '_blank'
          )
        })
        it('focuses window', () => {
          expect(focusMock).toHaveBeenCalled()
        })
      })
    })
  })
  describe('with mapConfig and invalid external link (non WMS/WFS/GEOJSON)', () => {
    beforeEach(() => {
      component.mapConfig = mapConfigFixture()
      component.link = {
        url: new URL('http://example.com/'),
        name: 'layername',
        type: 'link',
      }
      fixture.detectChanges()
    })
    it('sets externalViewer to display button to false', () => {
      expect(component.externalViewer).toEqual(false)
    })
  })
})
