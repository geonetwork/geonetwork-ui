import { ComponentFixture, TestBed } from '@angular/core/testing'
import { UserPreviewComponent } from './user-preview.component'

describe('UserPreviewComponent', () => {
  let component: UserPreviewComponent
  let fixture: ComponentFixture<UserPreviewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserPreviewComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(UserPreviewComponent)
    component = fixture.componentInstance
    component.user = {
      name: 'John',
      surname: 'Doe',
      id: '1234',
    }
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
