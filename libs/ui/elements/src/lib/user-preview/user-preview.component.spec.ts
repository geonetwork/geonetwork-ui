import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { USER_FIXTURE } from '@geonetwork-ui/util/shared/fixtures'

import { UserPreviewComponent } from './user-preview.component'

const user = USER_FIXTURE()
@Component({
  selector: 'gn-ui-avatar',
  template: '',
})
export class AvatarComponentMock {
  @Input() avatarUrl?: string
}

describe('UserPreviewComponent', () => {
  let component: UserPreviewComponent
  let fixture: ComponentFixture<UserPreviewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserPreviewComponent, AvatarComponentMock],
    })
      .overrideComponent(UserPreviewComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents()

    fixture = TestBed.createComponent(UserPreviewComponent)
    component = fixture.componentInstance
    component.user = user
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('displays avatar', () => {
    const avatar = fixture.debugElement.query(
      By.directive(AvatarComponentMock)
    ).componentInstance
    expect(avatar).toBeTruthy()
  })
  describe('displays user info', () => {
    let elts
    beforeEach(() => {
      elts = fixture.debugElement.queryAll(By.css('figcaption > div'))
    })
    it('displays user name', () => {
      expect(elts[0].nativeElement.textContent).toEqual(' Arnaud De Maison ')
    })
    it('displays profile', () => {
      expect(elts[1].nativeElement.textContent).toEqual('Administrator')
    })
  })
})
