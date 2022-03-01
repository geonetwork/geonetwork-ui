import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { of } from 'rxjs'

import { RecordPageComponent } from './record-page.component'

class MdViewFacadeMock {
  metadata$ = of()
}

describe('RecordPageComponent', () => {
  let component: RecordPageComponent
  let fixture: ComponentFixture<RecordPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordPageComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: MdViewFacade,
          useClass: MdViewFacadeMock,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('has id="record-page" at root for related records scroll', () => {
    expect(fixture.nativeElement.children[0].id).toBe('record-page')
  })
})
