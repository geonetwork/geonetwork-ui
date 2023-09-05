import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MyDraftComponent } from './my-draft.component'

describe('MyDraftComponent', () => {
  let component: MyDraftComponent
  let fixture: ComponentFixture<MyDraftComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyDraftComponent],
    })
    fixture = TestBed.createComponent(MyDraftComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
