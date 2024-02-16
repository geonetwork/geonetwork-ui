import { ComponentFixture, TestBed } from '@angular/core/testing'
import { UsersListComponent } from './users-list.component'
import { TranslateModule } from '@ngx-translate/core'

describe('RecordsListComponent', () => {
  let component: UsersListComponent
  let fixture: ComponentFixture<UsersListComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
    })
    fixture = TestBed.createComponent(UsersListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
