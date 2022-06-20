import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { LinkHelperService } from '@geonetwork-ui/util/shared'
import { MAP_CONFIG_FIXTURE } from '@geonetwork-ui/util/app-config'

import { ExternalViewerButtonComponent } from './external-viewer-button.component'

class LinkHelperServiceMock {
  isWmsLink = jest.fn((link) => link.protocol === 'OGC:WMS')
  isWfsLink = jest.fn((link) => link.protocol === 'OGC:WFS')
}

@Component({
  selector: 'gn-ui-button',
  template: '<div></div>',
})
export class MockButtonComponent {}

describe('ExternalViewerButtonComponent', () => {
  let component: ExternalViewerButtonComponent
  let fixture: ComponentFixture<ExternalViewerButtonComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExternalViewerButtonComponent, MockButtonComponent],
      providers: [
        {
          provide: LinkHelperService,
          useClass: LinkHelperServiceMock,
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
      component.mapConfig = MAP_CONFIG_FIXTURE
      component.link = null
      fixture.detectChanges()
    })
    it('sets externalViewer to display button to false', () => {
      expect(component.externalViewer).toEqual(false)
    })
  })
  describe('with mapConfig and WMS link', () => {
    beforeEach(() => {
      component.mapConfig = MAP_CONFIG_FIXTURE
      component.link = {
        url: 'http://example.com/ows?service=wms&request=getcapabilities',
        name: 'layername',
        protocol: 'OGC:WMS',
      }
      fixture.detectChanges()
    })
    it('sets externalViewer to display button to true', () => {
      expect(component.externalViewer).toEqual(true)
    })
    describe('click button', () => {
      let buttonComponent: MockButtonComponent
      let componentSpy
      let windowSpy
      const openMock = jest.fn().mockReturnThis()
      const focusMock = jest.fn().mockReturnThis()
      beforeEach(() => {
        buttonComponent = fixture.debugElement.query(
          By.directive(MockButtonComponent)
        )
        componentSpy = jest.spyOn(component, 'openInExternalViewer')
        windowSpy = jest
          .spyOn(global, 'window', 'get')
          .mockImplementation(() => ({
            open: openMock,
            focus: focusMock,
          }))
        buttonComponent.nativeElement.click()
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
          'https://example.com/myviewer?url=http%3A%2F%2Fexample.com%2Fows%3Fservice%3Dwms%26request%3Dgetcapabilities&name=layername&type=wms',
          '_blank'
        )
      })
      it('focuses window', () => {
        expect(focusMock).toHaveBeenCalled()
      })
    })
  })
  describe('with mapConfig and non WMS link', () => {
    beforeEach(() => {
      component.mapConfig = MAP_CONFIG_FIXTURE
      component.link = {
        url: 'http://example.com/',
        name: 'layername',
        protocol: 'NOT:WMS',
      }
      fixture.detectChanges()
    })
    it('sets externalViewer to display button to false', () => {
      expect(component.externalViewer).toEqual(false)
    })
  })
})
