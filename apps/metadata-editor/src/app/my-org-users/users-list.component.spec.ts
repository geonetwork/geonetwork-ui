import { ComponentFixture, TestBed } from '@angular/core/testing'
import { UsersListComponent } from './users-list.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('RecordsListComponent', () => {
  let component: UsersListComponent
  let fixture: ComponentFixture<UsersListComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideI18n()],
    })
    fixture = TestBed.createComponent(UsersListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
