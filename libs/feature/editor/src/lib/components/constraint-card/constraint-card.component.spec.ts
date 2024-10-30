import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ConstraintCardComponent } from './constraint-card.component'
import { importProvidersFrom } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'

describe('ConstraintCardComponent', () => {
  let component: ConstraintCardComponent
  let fixture: ComponentFixture<ConstraintCardComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConstraintCardComponent],
      providers: [importProvidersFrom(TranslateModule.forRoot())],
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
      component.constraint.url = new URL('https://example.com/my-license.pdf')
      expect(component.showUrlInput).toBe(true)
    })
    it('returns true if showUrl button was clicked once', () => {
      component.showUrlBtnClicked = true
      expect(component.showUrlInput).toBe(true)
    })
    it('returns false otherwise', () => {
      expect(component.showUrlInput).toBe(false)
    })
  })
})
