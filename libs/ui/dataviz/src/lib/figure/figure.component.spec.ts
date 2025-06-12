import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FigureComponent } from './figure.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { matPerson } from '@ng-icons/material-icons/baseline'
import { By } from '@angular/platform-browser'

describe('FigureComponent', () => {
  let component: FigureComponent
  let fixture: ComponentFixture<FigureComponent>
  let compiled: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        provideI18n(),
        provideIcons({
          matPerson,
        }),
      ],
    })
      .overrideComponent(FigureComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FigureComponent)
    component = fixture.componentInstance
    component.title = 'Average population in European countries'
    component.icon = 'matPerson'
    component.figure = '1020500'
    component.unit = 'hab.'
    fixture.detectChanges()
    compiled = fixture.nativeElement as HTMLElement
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should render figure', () => {
    expect(compiled.querySelector('.figure')?.textContent).toContain('1020500')
  })
  it('should render unit', () => {
    expect(compiled.querySelector('.unit')?.textContent).toContain('hab.')
  })
  it('should render title', () => {
    expect(compiled.querySelector('.title')?.textContent).toContain(
      'Average population in European countries'
    )
  })
  it('should render icon', () => {
    const icon = fixture.debugElement.query(
      By.directive(NgIcon)
    ).componentInstance
    expect(icon.name()).toContain('matPerson')
  })
  it('icon is primary color', () => {
    expect(
      compiled.querySelector('[data-test=icon-container]')?.className
    ).toContain('text-primary')
  })
  it('icon background is primary color', () => {
    expect(
      compiled.querySelector('[data-test=icon-container]')?.className
    ).toContain('bg-primary')
  })
  it('label is black text color', () => {
    expect(compiled.querySelector('.figure-block')?.className).toContain(
      'text-black'
    )
  })
  it('has a tooltip containing the information', () => {
    const title = compiled.querySelector(
      '[data-test="figureTitle"]'
    )?.textContent
    expect(title).toContain(component.title)
    expect(title).toContain(component.unit)
    expect(title).toContain(component.figure)
  })

  describe('without unit', () => {
    beforeEach(() => {
      component.unit = undefined
    })
    it('does not have undefined in the tooltip', () => {
      const title = compiled.querySelector(
        '[data-test="figureTitle"]'
      )?.textContent
      expect(title).toContain(component.title)
      expect(title).toContain(component.figure)
      expect(title).not.toContain('undefined')
    })
  })

  describe('secondary color', () => {
    beforeEach(() => {
      component.color = 'secondary'
      fixture.detectChanges()
    })
    it('icon is secondary color', () => {
      expect(
        compiled.querySelector('[data-test=icon-container]')?.className
      ).toContain('text-secondary')
    })
    it('icon background is secondary color', () => {
      expect(
        compiled.querySelector('[data-test=icon-container]')?.className
      ).toContain('bg-secondary')
    })
  })
})
