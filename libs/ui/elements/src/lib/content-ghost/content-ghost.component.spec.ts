import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ContentGhostComponent } from './content-ghost.component.js'

describe('ContentGhostComponent', () => {
  let component: ContentGhostComponent
  let fixture: ComponentFixture<ContentGhostComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentGhostComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentGhostComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
