import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { SiteTitleComponent } from './site-title.component'

describe('CatalogTitleComponent', () => {
  let component: SiteTitleComponent
  let fixture: ComponentFixture<SiteTitleComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SiteTitleComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteTitleComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
