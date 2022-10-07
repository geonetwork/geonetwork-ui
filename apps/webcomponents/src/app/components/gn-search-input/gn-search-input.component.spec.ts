import { ComponentFixture, TestBed } from '@angular/core/testing'

import { GnSearchInputComponent } from './gn-search-input.component'

describe('GnSearchInputComponent', () => {
  let component: GnSearchInputComponent
  let fixture: ComponentFixture<GnSearchInputComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GnSearchInputComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(GnSearchInputComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
