import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatIconModule } from '@angular/material/icon'
import { TranslateModule } from '@ngx-translate/core'
import { ApiCardComponent } from './api-card.component'

describe('ApiCardComponent', () => {
  let component: ApiCardComponent
  let fixture: ComponentFixture<ApiCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApiCardComponent],
      imports: [MatIconModule, TranslateModule.forRoot()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiCardComponent)
    component = fixture.componentInstance
    component.link = {
      protocol: 'OGC:WFS',
      name: 'Allroads',
      description: 'A file that contains all roads',
      url: 'https//roads.com/wfs',
    }
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
