import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CatalogTitleComponent } from './catalog-title.component'
import { MockBuilder } from 'ng-mocks'

describe('CatalogTitleComponent', () => {
  let component: CatalogTitleComponent
  let fixture: ComponentFixture<CatalogTitleComponent>

  beforeEach(() => MockBuilder(CatalogTitleComponent))

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogTitleComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
