import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DataViewShareComponent } from './data-view-share.component'
import {
  DataViewPermalinkComponent,
  WEB_COMPONENT_EMBEDDER_URL,
} from '../data-view-permalink/data-view-permalink.component'
import { By } from '@angular/platform-browser'
import { MockBuilder } from 'ng-mocks'
import { DataViewWebComponentComponent } from '../data-view-web-component/data-view-web-component.component'

const baseUrl = 'https://example.com/wc-embedder'
describe('DataViewShareComponent', () => {
  let component: DataViewShareComponent
  let fixture: ComponentFixture<DataViewShareComponent>

  beforeEach(() => MockBuilder(DataViewShareComponent))

  describe('if no WEB_COMPONENT_EMBEDDER_URL is defined', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(DataViewShareComponent)
      component = fixture.componentInstance
      fixture.detectChanges()
    })
    it('should create', () => {
      expect(component).toBeTruthy()
    })
    it('renders a tab group', () => {
      expect(
        fixture.debugElement.queryAll(By.css('mat-tab-group'))[0]
      ).toBeTruthy()
    })
    it('only renders one tab', () => {
      expect(fixture.debugElement.queryAll(By.css('mat-tab')).length).toEqual(1)
    })
    it('does not render a data view permalink component', () => {
      expect(
        fixture.debugElement.query(By.directive(DataViewPermalinkComponent))
      ).toBeFalsy()
    })
    it('renders a data view web component component', () => {
      expect(
        fixture.debugElement.query(By.directive(DataViewWebComponentComponent))
      ).toBeTruthy()
    })
  })
  describe('if a WEB_COMPONENT_EMBEDDER_URL is defined', () => {
    beforeEach(() => {
      TestBed.overrideProvider(WEB_COMPONENT_EMBEDDER_URL, {
        useValue: baseUrl,
      })
      fixture = TestBed.createComponent(DataViewShareComponent)
      component = fixture.componentInstance
      fixture.detectChanges()
    })
    it('renders a tab group', () => {
      expect(
        fixture.debugElement.queryAll(By.css('mat-tab-group'))[0]
      ).toBeTruthy()
    })
    it('renders a data view permalink component', () => {
      expect(
        fixture.debugElement.query(By.directive(DataViewPermalinkComponent))
      ).toBeTruthy()
    })
    it('renders a data view web component component', () => {
      expect(
        fixture.debugElement.query(By.directive(DataViewWebComponentComponent))
      ).toBeTruthy()
    })
  })
})
