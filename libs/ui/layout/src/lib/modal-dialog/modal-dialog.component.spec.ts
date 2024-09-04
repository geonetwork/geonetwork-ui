import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ModalDialogComponent } from './modal-dialog.component'
import { MockProvider } from 'ng-mocks'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

describe('ModalDialogComponent', () => {
  let component: ModalDialogComponent
  let fixture: ComponentFixture<ModalDialogComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ModalDialogComponent],
      providers: [
        MockProvider(MatDialogRef),
        MockProvider(MAT_DIALOG_DATA, {
          title: 'title',
          message: 'message',
          confirmText: 'confirm',
          cancelText: 'cancel',
        }),
      ],
    })
    fixture = TestBed.createComponent(ModalDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
