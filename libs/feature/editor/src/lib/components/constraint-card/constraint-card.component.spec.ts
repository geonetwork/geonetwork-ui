import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ConstraintCardComponent } from './constraint-card.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('ConstraintCardComponent', () => {
  let component: ConstraintCardComponent
  let fixture: ComponentFixture<ConstraintCardComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideI18n()],
    })
    fixture = TestBed.createComponent(ConstraintCardComponent)
    component = fixture.componentInstance
    component.constraint = {
      text: 'This is a multiline and **formatted** constraint text.',
    }
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('showUrlInput', () => {
    it('returns true if url is not nullish', () => {
      component.constraint = {
        text: 'abcd',
        url: new URL('https://example.com/my-license.pdf'),
      }
      expect(component.showUrl).toBe(true)
    })
    it('returns true if showUrl button was clicked once', () => {
      component.showUrl = true
      expect(component.showUrl).toBe(true)
    })
    it('returns false otherwise', () => {
      expect(component.showUrl).toBe(false)
    })
  })
})
