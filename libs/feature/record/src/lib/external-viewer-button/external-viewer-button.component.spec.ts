import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import {
  EXTERNAL_VIEWER_OPEN_NEW_TAB,
  EXTERNAL_VIEWER_URL_TEMPLATE,
  ExternalViewerButtonComponent,
} from './external-viewer-button.component'
import { MockBuilder } from 'ng-mocks'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { provideI18n } from '@geonetwork-ui/util/i18n'

window.open = jest.fn().mockImplementation(() => window)
window.focus = jest.fn().mockImplementation(() => window)

describe('ExternalViewerButtonComponent', () => {
  let component: ExternalViewerButtonComponent
  let fixture: ComponentFixture<ExternalViewerButtonComponent>

  beforeEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => MockBuilder(ExternalViewerButtonComponent))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideI18n(),
        {
          provide: EXTERNAL_VIEWER_URL_TEMPLATE,
          useValue:
            'https://example.com/myviewer/#/?actions=[{"type":"CATALOG:ADD_LAYERS_FROM_CATALOGS","layers":["${layer_name}"],"sources":[{"url":"${service_url}","type":"${service_type}"}]}]',
        },
        {
          provide: EXTERNAL_VIEWER_OPEN_NEW_TAB,
          useValue: true,
        },
      ],
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
      component.link = null
      fixture.detectChanges()
    })
    it('sets externalViewer to display button to false', () => {
      expect(component.externalViewer).toEqual(false)
    })
  })
  describe('with mapConfig and valid external links', () => {
    let buttonComponent: ButtonComponent
    let componentSpy

    describe('with mapConfig and WMS link', () => {
      beforeEach(() => {
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
            By.directive(ButtonComponent)
          ).componentInstance
          componentSpy = jest.spyOn(component, 'openInExternalViewer')
          buttonComponent.buttonClick.emit()
        })

        afterEach(() => {
          componentSpy.mockRestore()
        })
        it('calls openInExternalViewer', () => {
          expect(component.openInExternalViewer).toHaveBeenCalled()
        })
        it('opens window in new tab with URL including WMS link params', () => {
          expect(window.open).toHaveBeenCalledWith(
            'https://example.com/myviewer/#/?actions=[{"type":"CATALOG:ADD_LAYERS_FROM_CATALOGS","layers":["layername"],"sources":[{"url":"http%3A%2F%2Fexample.com%2Fows%3Fservice%3Dwms%26request%3Dgetcapabilities","type":"wms"}]}]',
            '_blank'
          )
        })
        it('focuses window', () => {
          expect(window.focus).toHaveBeenCalled()
        })
      })
    })
    describe('with mapConfig and WFS link', () => {
      beforeEach(() => {
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
            By.directive(ButtonComponent)
          ).componentInstance
          componentSpy = jest.spyOn(component, 'openInExternalViewer')
          buttonComponent.buttonClick.emit()
        })

        afterEach(() => {
          componentSpy.mockRestore()
        })
        it('calls openInExternalViewer', () => {
          expect(component.openInExternalViewer).toHaveBeenCalled()
        })
        it('opens window in new tab with URL including WFS link params', () => {
          expect(window.open).toHaveBeenCalledWith(
            'https://example.com/myviewer/#/?actions=[{"type":"CATALOG:ADD_LAYERS_FROM_CATALOGS","layers":["layername"],"sources":[{"url":"http%3A%2F%2Fexample.com%2Fows%3Fservice%3Dwfs%26request%3Dgetcapabilities","type":"wfs"}]}]',
            '_blank'
          )
        })
        it('focuses window', () => {
          expect(window.focus).toHaveBeenCalled()
        })
      })
    })
    describe('with mapConfig and GEOJSON link', () => {
      beforeEach(() => {
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
            By.directive(ButtonComponent)
          ).componentInstance
          componentSpy = jest.spyOn(component, 'openInExternalViewer')
          buttonComponent.buttonClick.emit()
        })

        afterEach(() => {
          componentSpy.mockRestore()
        })
        it('calls openInExternalViewer', () => {
          expect(component.openInExternalViewer).toHaveBeenCalled()
        })
        it('opens window in new tab with URL including link params', () => {
          expect(window.open).toHaveBeenCalledWith(
            'https://example.com/myviewer/#/?actions=[{"type":"CATALOG:ADD_LAYERS_FROM_CATALOGS","layers":["externalviewer.dataset.unnamed"],"sources":[{"url":"http%3A%2F%2Fexample.com%2Fsomespatialdata.geojson","type":"geojson"}]}]',
            '_blank'
          )
        })
        it('focuses window', () => {
          expect(window.focus).toHaveBeenCalled()
        })
      })
    })
  })
  describe('with mapConfig and invalid external link (non WMS/WFS/GEOJSON)', () => {
    beforeEach(() => {
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
