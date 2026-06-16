import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SpinningLoaderComponent } from './spinning-loader.component'

describe('SpinningLoaderComponent', () => {
  let component: SpinningLoaderComponent
  let fixture: ComponentFixture<SpinningLoaderComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinningLoaderComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinningLoaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('layoutClasses', () => {
    let svgEl: SVGElement

    it('applies the default layout classes', () => {
      svgEl = fixture.nativeElement.querySelector('svg')
      expect(svgEl.classList).toContain('animate-spin')
      expect(svgEl.classList).toContain('h-8')
      expect(svgEl.classList).toContain('w-8')
      expect(svgEl.classList).toContain('text-primary')
    })

    it('applies custom layout classes while keeping the spin animation', () => {
      component.layoutClasses = 'h-6 w-6 text-white'
      fixture.detectChanges()
      svgEl = fixture.nativeElement.querySelector('svg')
      expect(svgEl.classList).toContain('animate-spin')
      expect(svgEl.classList).toContain('h-6')
      expect(svgEl.classList).toContain('w-6')
      expect(svgEl.classList).toContain('text-white')
      expect(svgEl.classList).not.toContain('text-primary')
    })
  })
})
