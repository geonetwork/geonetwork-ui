import { ComponentFixture, TestBed } from '@angular/core/testing'

import { OnlineResourceCardComponent } from './online-resource-card.component'
import { TranslateModule } from '@ngx-translate/core'
import { aSetOfLinksFixture } from '@geonetwork-ui/common/fixtures'

describe('OnlineResourceCardComponent', () => {
  let component: OnlineResourceCardComponent
  let fixture: ComponentFixture<OnlineResourceCardComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OnlineResourceCardComponent, TranslateModule.forRoot()],
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
