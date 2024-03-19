import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TopToolbarComponent } from './top-toolbar.component'

describe('TopToolbarComponent', () => {
  let component: TopToolbarComponent
  let fixture: ComponentFixture<TopToolbarComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopToolbarComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(TopToolbarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
