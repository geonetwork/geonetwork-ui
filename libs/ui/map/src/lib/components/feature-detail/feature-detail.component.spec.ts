import { ChangeDetectionStrategy, DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { FeatureDetailComponent } from './feature-detail.component'
import { MockBuilder } from 'ng-mocks'

describe('FeatureDetailComponent', () => {
  let component: FeatureDetailComponent
  let fixture: ComponentFixture<FeatureDetailComponent>
  let de: DebugElement

  beforeEach(() => {
    return MockBuilder(FeatureDetailComponent)
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({})
      .overrideComponent(FeatureDetailComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureDetailComponent)
    component = fixture.componentInstance
    de = fixture.debugElement
    fixture.detectChanges()
  })

  describe('when no feature', () => {
    it('it is empty', () => {
      const rootDiv = de.query(By.css('.root'))
      expect(rootDiv).toBeFalsy()
    })
  })
  describe('when a feature is given', () => {
    beforeEach(() => {
      component.feature = {
        type: 'Feature',
        properties: {
          id: 123,
          name: 'ol_feature',
        },
        geometry: null,
      }
      fixture.detectChanges()
    })
    it('displays the info', () => {
      const rootDiv = de.query(By.css('.root'))
      expect(rootDiv).toBeTruthy()
    })
    it('loops over properties', () => {
      const props = de.queryAll(By.css('.property'))
      expect(props.length).toBe(2)
    })
    it('ignore geometry columns', () => {
      component.feature['geometry'] = { type: 'Point', coordinates: [0, 0] }
      const props = de.queryAll(By.css('.property'))
      expect(props.length).toBe(2)
    })
  })
  describe('setProperties', () => {
    beforeEach(() => {
      component.feature = {
        type: 'Feature',
        properties: {
          id: 'someId',
          name: 'ol_feature',
        },
        geometry: null,
      }
      component._featureAttributes = [{ name: 'id', code: 'Identifiant' }]
      fixture.detectChanges()
    })
    it('should update properties correctly with featureAttributes', () => {
      expect(component.properties).toEqual({
        Identifiant: 'someId',
        name: 'ol_feature',
      })
    })
  })
})
