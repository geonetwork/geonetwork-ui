import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SignInPageComponent } from './sign-in-page.component'

describe('SignInPageComponent', () => {
  let component: SignInPageComponent
  let fixture: ComponentFixture<SignInPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInPageComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(SignInPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
