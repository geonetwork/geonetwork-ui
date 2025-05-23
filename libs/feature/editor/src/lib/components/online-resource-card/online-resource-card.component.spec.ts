import { ComponentFixture, TestBed } from '@angular/core/testing'

import { OnlineResourceCardComponent } from './online-resource-card.component'
import { aSetOfLinksFixture } from '@geonetwork-ui/common/fixtures'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('OnlineResourceCardComponent', () => {
  let component: OnlineResourceCardComponent
  let fixture: ComponentFixture<OnlineResourceCardComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideI18n()],
    })
    fixture = TestBed.createComponent(OnlineResourceCardComponent)
    component = fixture.componentInstance
    component.onlineResource = aSetOfLinksFixture().readmeLink()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
