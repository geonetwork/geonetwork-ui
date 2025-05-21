import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { CellPopinComponent } from './cell-popin.component'

describe('CellPopinComponent', () => {
  let component: CellPopinComponent
  let fixture: ComponentFixture<CellPopinComponent>
  let overlayContainer: OverlayContainer

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CellPopinComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(CellPopinComponent)
    component = fixture.componentInstance

    fixture.detectChanges()
  })

  it('should create with default state', () => {
    expect(component).toBeTruthy()
    expect(component.isOpen).toBe(false)
  })

  it('should toggle overlay open and closed', () => {
    component.openOverlay()
    expect(component.isOpen).toBe(true)

    component.closeOverlay()
    expect(component.isOpen).toBe(false)
  })
})
