import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FigureComponent } from './figure.component'

describe('FigureComponent', () => {
  let component: FigureComponent
  let fixture: ComponentFixture<FigureComponent>
  let compiled: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FigureComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FigureComponent)
    component = fixture.componentInstance
    component.title = 'Average population in European countries'
    component.icon = 'group'
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
    expect(compiled.querySelector('mat-icon')?.textContent).toContain('group')
  })
  it('icon is primary color', () => {
    expect(compiled.querySelector('mat-icon')?.className).toContain(
      'text-primary'
    )
  })
  it('label is main text color', () => {
    expect(compiled.querySelector('.figure-block')?.className).toContain(
      'text-main'
    )
  })
  it('has a tooltip containing the information', () => {
    const title = component.hoverTitle
    expect(title).toContain(component.title)
    expect(title).toContain(component.unit)
    expect(title).toContain(component.figure)
  })

  describe('without unit', () => {
    beforeEach(() => {
      component.unit = undefined
    })
    it('does not have undefined in the tooltip', () => {
      const title = component.hoverTitle
      expect(title).toContain(component.title)
      expect(title).toContain(component.figure)
      expect(title).not.toContain('undefined')
    })
  })
})
