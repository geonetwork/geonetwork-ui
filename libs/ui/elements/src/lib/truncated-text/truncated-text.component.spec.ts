import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TruncatedTextComponent } from './truncated-text.component'
import { TranslateModule } from '@ngx-translate/core'

describe('TruncatedTextComponent', () => {
  let component: TruncatedTextComponent
  let fixture: ComponentFixture<TruncatedTextComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TruncatedTextComponent, TranslateModule.forRoot()],
    }).compileComponents()

    fixture = TestBed.createComponent(TruncatedTextComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
