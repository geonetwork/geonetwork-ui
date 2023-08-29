import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { USER_FIXTURE } from '@geonetwork-ui/common/fixtures'

import { UserPreviewComponent } from './user-preview.component'

const user = USER_FIXTURE()
@Component({
  selector: 'gn-ui-avatar',
  template: '',
})
export class AvatarComponent {
  @Input() avatarUrl?: string
}

describe('UserPreviewComponent', () => {
  let component: UserPreviewComponent
  let fixture: ComponentFixture<UserPreviewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserPreviewComponent, AvatarComponent],
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
    component.avatarPlaceholder = 'https://www.gravatar.com/avatar/?d=mp'
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('displays avatar', () => {
    const avatar = fixture.debugElement.query(
      By.directive(AvatarComponent)
    ).componentInstance
    expect(avatar).toBeTruthy()
  })
  describe('compute correct information', () => {
    it('compute user full name', () => {
      expect(component.userFullName).toEqual('Arnaud De Maison')
    })
    it('avatar placeholder is good', () => {
      expect(component.avatarPlaceholder).toEqual(
        'https://www.gravatar.com/avatar/?d=mp'
      )
    })
  })
  describe('displays user info', () => {
    let elts
    beforeEach(() => {
      elts = fixture.debugElement.queryAll(By.css('figure > div'))
    })
    it('displays user name', () => {
      expect(elts[0].nativeElement['matTooltip']).toEqual('Arnaud De Maison')
    })
  })
})
