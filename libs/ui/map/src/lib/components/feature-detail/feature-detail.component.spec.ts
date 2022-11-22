import { ChangeDetectionStrategy, DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { OL_FEATURE_FIXTURE } from '@geonetwork-ui/util/shared/fixtures'
import Feature from 'ol/Feature'
import { Geometry } from 'ol/geom'

import { FeatureDetailComponent } from './feature-detail.component'

describe('FeatureDetailComponent', () => {
  let component: FeatureDetailComponent
  let fixture: ComponentFixture<FeatureDetailComponent>
  let de: DebugElement
  let feature: Feature

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeatureDetailComponent],
    })
      .overrideComponent(FeatureDetailComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureDetailComponent)
    component = fixture.componentInstance
    feature = new Feature()
    feature.set('id', 123)
    feature.set('name', 'ol_feature')
    component.feature = OL_FEATURE_FIXTURE
    de = fixture.debugElement
    fixture.detectChanges()
  })

  describe('when a feature is given', () => {
    beforeEach(() => {
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
      feature.set('geometry', new Geometry())
      const props = de.queryAll(By.css('.property'))
      expect(props.length).toBe(2)
    })
  })
})
