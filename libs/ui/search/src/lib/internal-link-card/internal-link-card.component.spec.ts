import { ComponentFixture, TestBed } from '@angular/core/testing'

import { InternalLinkCardComponent } from './internal-link-card.component'

describe('InternalLinkCardComponent', () => {
  let component: InternalLinkCardComponent
  let fixture: ComponentFixture<InternalLinkCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternalLinkCardComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(InternalLinkCardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
