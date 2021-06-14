import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CatalogTitleComponent } from './catalog-title.component'

describe('CatalogTitleComponent', () => {
  let component: CatalogTitleComponent
  let fixture: ComponentFixture<CatalogTitleComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogTitleComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogTitleComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
