import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormFieldOnlineResourcesComponent } from './form-field-online-resources.component'
import { MockBuilder, MockProvider } from 'ng-mocks'
import { Subject } from 'rxjs'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { NotificationsService } from '@geonetwork-ui/feature/notifications'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { provideI18n } from '@geonetwork-ui/util/i18n'

let uploadSubject: Subject<any>
class PlatformServiceInterfaceMock {
  attachFileToRecord = jest.fn(() => {
    uploadSubject = new Subject()
    return uploadSubject
  })
}
export class MatDialogMock {
  _subject = new Subject()
  _closeWithValue = (v) => this._subject.next(v)
  open = jest.fn(() => ({
    afterClosed: () => this._subject,
  }))
}

describe('FormFieldOnlineResourcesComponent', () => {
  let component: FormFieldOnlineResourcesComponent
  let fixture: ComponentFixture<FormFieldOnlineResourcesComponent>

  beforeEach(() => {
    return MockBuilder(FormFieldOnlineResourcesComponent)
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideI18n(),
        MockProvider(
          PlatformServiceInterface,
          PlatformServiceInterfaceMock,
          'useClass'
        ),
        MockProvider(NotificationsService),
        MockProvider(MatDialogRef),
        MockProvider(MatDialog, MatDialogMock, 'useClass'),
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(FormFieldOnlineResourcesComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
