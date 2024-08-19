import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { MockBuilder, MockProvider } from 'ng-mocks'
import { ConfirmationDialogComponent } from './confirmation-dialog.component'

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent
  let fixture: ComponentFixture<ConfirmationDialogComponent>

  beforeEach(() => {
    return MockBuilder(ConfirmationDialogComponent)
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationDialogComponent],
      providers: [
        MockProvider(MatDialogRef),
        MockProvider(MAT_DIALOG_DATA, {
          title: 'title',
          message: 'message',
          confirmText: 'confirm',
          cancelText: 'cancel',
        }),
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
