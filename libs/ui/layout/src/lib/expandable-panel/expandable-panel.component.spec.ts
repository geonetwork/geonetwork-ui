import {
  ChangeDetectionStrategy,
  Component,
  NO_ERRORS_SCHEMA,
} from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { ExpandablePanelComponent } from './expandable-panel.component'

@Component({
  template: `
    <gn-ui-expandable-panel>
      <ng-template #titleTemplate>
        <div class="custom-title">Custom Template</div>
      </ng-template>
    </gn-ui-expandable-panel>
  `,
})
class TestHostComponent {}
describe('ExpandablePanelComponent: Template title tests', () => {
  let hostFixture: ComponentFixture<TestHostComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpandablePanelComponent],
      declarations: [TestHostComponent],
    }).compileComponents()

    hostFixture = TestBed.createComponent(TestHostComponent)
    hostFixture.detectChanges()
  })

  it('uses template when provided', () => {
    const customTitle = hostFixture.debugElement.query(By.css('.custom-title'))
    expect(customTitle).toBeTruthy()
    expect(customTitle.nativeElement.textContent).toBe('Custom Template')
  })
})

describe('ExpandablePanelComponent: Basic tests', () => {
  let component: ExpandablePanelComponent
  let fixture: ComponentFixture<ExpandablePanelComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpandablePanelComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(ExpandablePanelComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()

    fixture = TestBed.createComponent(ExpandablePanelComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('click on title', () => {
    it('updates the collapsed property', () => {
      const el = fixture.debugElement.query(By.css('.title')).nativeElement
      expect(component.collapsed).toBe(true)
      el.click()
      expect(component.collapsed).toBe(false)
      el.click()
      expect(component.collapsed).toBe(true)
    })
  })

  describe('simple title rendering', () => {
    it('shows simple title when no template is provided', () => {
      component.title = 'Simple Title'
      fixture.detectChanges()
      const titleElement = fixture.debugElement.query(
        By.css('.font-medium.text-sm')
      )
      expect(titleElement.nativeElement.textContent).toContain('Simple Title')
    })
  })

  describe('content rendering', () => {
    describe('when collapsed', () => {
      beforeEach(() => {
        component.collapsed = true
        fixture.detectChanges()
      })
      it('hides content completely', () => {
        const el = fixture.debugElement.query(By.css('.content'))
        expect(el).toBeFalsy()
      })
    })
    describe('when not collapsed', () => {
      beforeEach(() => {
        component.collapsed = false
        fixture.detectChanges()
      })
      it('shows content with proper classes', () => {
        const el = fixture.debugElement.query(By.css('.content'))
        expect(el).toBeTruthy()
        expect(el.classes['ease-in']).toBeTruthy()
        expect(el.classes['ease-out']).toBeFalsy()
      })
    })
  })
})
