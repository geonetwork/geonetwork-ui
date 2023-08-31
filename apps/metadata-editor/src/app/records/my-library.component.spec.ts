import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MyLibraryComponent } from './my-library.component'

describe('MyLibraryComponent', () => {
  let component: MyLibraryComponent
  let fixture: ComponentFixture<MyLibraryComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyLibraryComponent],
    })
    fixture = TestBed.createComponent(MyLibraryComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
