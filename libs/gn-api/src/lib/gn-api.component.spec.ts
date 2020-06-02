import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { GnApiComponent } from './gn-api.component'

describe('GnApiComponent', () => {
  let component: GnApiComponent
  let fixture: ComponentFixture<GnApiComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GnApiComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(GnApiComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
