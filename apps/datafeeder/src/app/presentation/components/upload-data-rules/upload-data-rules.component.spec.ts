import { ComponentFixture, TestBed } from '@angular/core/testing'

import { UploadDataRulesComponent } from './upload-data-rules.component'
import { By } from '@angular/platform-browser'
import { TranslateModule } from '@ngx-translate/core'
import { NO_ERRORS_SCHEMA } from '@angular/core'

describe('UploadDataRulesComponent', () => {
  let component: UploadDataRulesComponent
  let fixture: ComponentFixture<UploadDataRulesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [UploadDataRulesComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDataRulesComponent)
    component = fixture.componentInstance
    component.maxFileSizeMb = 12
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display accepted file formats', () => {
    const el = fixture.debugElement.query(By.css('.formats')).nativeElement

    expect(el.childElementCount).toEqual(component.acceptedFileFormats.length)

    const childArr = [...el.children]
    childArr.forEach((c) => {
      expect(
        component.acceptedFileFormats.find((f) =>
          f.localeCompare(c.textContent.replace('- ', ''))
        )
      ).toBeTruthy()
    })

    expect(component).toBeTruthy()
  })
})
