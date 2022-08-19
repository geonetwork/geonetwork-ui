import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NewsPageComponent } from './news-page.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'

describe('NewsPageComponent', () => {
  let component: NewsPageComponent
  let fixture: ComponentFixture<NewsPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsPageComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()

    fixture = TestBed.createComponent(NewsPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
