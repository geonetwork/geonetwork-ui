import { ComponentFixture, TestBed } from '@angular/core/testing'

import { KeyFiguresComponent } from './key-figures.component'

describe('KeyFiguresComponent', () => {
  let component: KeyFiguresComponent
  let fixture: ComponentFixture<KeyFiguresComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KeyFiguresComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(KeyFiguresComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
