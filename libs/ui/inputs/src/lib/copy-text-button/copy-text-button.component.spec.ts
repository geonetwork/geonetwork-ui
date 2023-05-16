import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CopyTextButtonComponent } from './copy-text-button.component'

describe('CopyTextButtonComponent', () => {
  let component: CopyTextButtonComponent
  let fixture: ComponentFixture<CopyTextButtonComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CopyTextButtonComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(CopyTextButtonComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
