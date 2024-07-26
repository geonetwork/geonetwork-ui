import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ConfirmationDialogComponent } from './confirmation-dialog.component'

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent
  let fixture: ComponentFixture<ConfirmationDialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationDialogComponent],
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
