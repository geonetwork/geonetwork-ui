import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { FormsPageComponent } from './forms-page.component'
import { TranslateModule } from '@ngx-translate/core'
import { UiModule } from '@lib/ui'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { EditorModule } from '@lib/editor'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterModule } from '@angular/router'

describe('FormsPageComponent', () => {
  let component: FormsPageComponent
  let fixture: ComponentFixture<FormsPageComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormsPageComponent],
      imports: [
        TranslateModule.forRoot(),
        UiModule,
        EditorModule,
        HttpClientTestingModule,
        RouterModule.forRoot([]),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
