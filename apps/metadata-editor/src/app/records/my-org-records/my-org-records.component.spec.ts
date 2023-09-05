import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MyOrgRecordsComponent } from './my-org-records.component'

describe('MyOrgRecordsComponent', () => {
  let component: MyOrgRecordsComponent
  let fixture: ComponentFixture<MyOrgRecordsComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyOrgRecordsComponent],
    })
    fixture = TestBed.createComponent(MyOrgRecordsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
