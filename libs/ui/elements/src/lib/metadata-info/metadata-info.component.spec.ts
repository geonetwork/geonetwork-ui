import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MetadataInfoComponent } from './metadata-info.component'
import { ContentGhostComponent } from '../content-ghost/content-ghost.component'
import { RECORDS_FULL_FIXTURE } from '@geonetwork-ui/ui/search'

describe('MetadataInfoComponent', () => {
  let component: MetadataInfoComponent
  let fixture: ComponentFixture<MetadataInfoComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MetadataInfoComponent, ContentGhostComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataInfoComponent)
    component = fixture.componentInstance
    component.incomplete = false
    component.metadata = RECORDS_FULL_FIXTURE[0]
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
