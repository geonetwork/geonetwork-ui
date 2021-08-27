import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MetadataPageComponent } from './metadata-page.component'
import { ContentGhostComponent } from '../content-ghost/content-ghost.component'
import { RECORDS_FULL_FIXTURE } from '@geonetwork-ui/ui/search'

describe('MetadataPageComponent', () => {
  let component: MetadataPageComponent
  let fixture: ComponentFixture<MetadataPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MetadataPageComponent, ContentGhostComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataPageComponent)
    component = fixture.componentInstance
    component.incomplete = false
    component.metadata = RECORDS_FULL_FIXTURE[0]
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
