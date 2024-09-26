import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'
import { OnlineServiceResourceInputComponent } from './online-service-resource-input.component'

describe('OnlineServiceResourceInputComponent', () => {
  let component: OnlineServiceResourceInputComponent
  let fixture: ComponentFixture<OnlineServiceResourceInputComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlineServiceResourceInputComponent, TranslateModule.forRoot()],
    }).compileComponents()

    fixture = TestBed.createComponent(OnlineServiceResourceInputComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
