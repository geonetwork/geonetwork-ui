import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DepComponent } from './dep.component'

describe('DepComponent', () => {
  let component: DepComponent
  let fixture: ComponentFixture<DepComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(DepComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
