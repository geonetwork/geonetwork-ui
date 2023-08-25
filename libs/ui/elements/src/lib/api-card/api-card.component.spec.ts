import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatIconModule } from '@angular/material/icon'
import { TranslateModule } from '@ngx-translate/core'
import { ApiCardComponent } from './api-card.component'

describe('ApiCardComponent', () => {
  let component: ApiCardComponent
  let fixture: ComponentFixture<ApiCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ApiCardComponent],
      imports: [MatIconModule, TranslateModule.forRoot()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiCardComponent)
    component = fixture.componentInstance
    component.link = {
      name: 'Allroads',
      description: 'A file that contains all roads',
      url: new URL('https://roads.com/wfs'),
      type: 'service',
      accessServiceProtocol: 'wfs',
    }
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
