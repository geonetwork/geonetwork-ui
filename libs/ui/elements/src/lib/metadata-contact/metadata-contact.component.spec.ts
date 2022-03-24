import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RECORDS_FULL_FIXTURE } from '@geonetwork-ui/ui/search'

import { MetadataContactComponent } from './metadata-contact.component'

describe('MetadataContactComponent', () => {
  let component: MetadataContactComponent
  let fixture: ComponentFixture<MetadataContactComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MetadataContactComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataContactComponent)
    component = fixture.componentInstance
    component.metadata = RECORDS_FULL_FIXTURE[0]
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
