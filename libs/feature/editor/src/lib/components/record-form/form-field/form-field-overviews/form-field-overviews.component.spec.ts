import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FormFieldOverviewsComponent } from './form-field-overviews.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TranslateModule } from '@ngx-translate/core'
import { FormControl } from '@angular/forms'

describe('FormFieldOverviewsComponent', () => {
  let component: FormFieldOverviewsComponent
  let fixture: ComponentFixture<FormFieldOverviewsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormFieldOverviewsComponent,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(FormFieldOverviewsComponent)
    component = fixture.componentInstance
    component.metadataUuid = '8505d991-e38f-4704-a47a-e7d335dfbef5'
    const control = new FormControl()
    control.setValue([
      {
        description: 'doge.jpg',
        url: new URL(
          'http://localhost:8080/geonetwork/srv/api/0.1/records/8505d991-e38f-4704-a47a-e7d335dfbef5/attachments/doge.jpg'
        ),
      },
    ])
    component.control = control
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
