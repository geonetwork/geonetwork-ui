import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DownloadsListComponent } from './downloads-list.component'

describe('DownloadsListComponent', () => {
  let component: DownloadsListComponent
  let fixture: ComponentFixture<DownloadsListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DownloadsListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadsListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
