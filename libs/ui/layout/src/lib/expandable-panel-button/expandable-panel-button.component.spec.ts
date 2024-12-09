import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ExpandablePanelButtonComponent } from './expandable-panel-button.component'

describe('ExpandablePanelButtonComponent', () => {
  let component: ExpandablePanelButtonComponent
  let fixture: ComponentFixture<ExpandablePanelButtonComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpandablePanelButtonComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandablePanelButtonComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
