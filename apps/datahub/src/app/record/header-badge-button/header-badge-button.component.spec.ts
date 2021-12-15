import { ComponentFixture, TestBed } from '@angular/core/testing'

import { HeaderBadgeButtonComponent } from './header-badge-button.component'
import { TranslateModule } from '@ngx-translate/core'

describe('HeaderBadgeButtonComponent', () => {
  let component: HeaderBadgeButtonComponent
  let fixture: ComponentFixture<HeaderBadgeButtonComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderBadgeButtonComponent],
      imports: [TranslateModule.forRoot()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderBadgeButtonComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
