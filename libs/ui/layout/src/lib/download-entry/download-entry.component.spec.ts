import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DownloadEntryComponent } from './download-entry.component'

describe('DownloadEntryComponent', () => {
  let component: DownloadEntryComponent
  let fixture: ComponentFixture<DownloadEntryComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DownloadEntryComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadEntryComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
