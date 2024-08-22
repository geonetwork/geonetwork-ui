import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TranslateModule } from '@ngx-translate/core'
import { FormFieldOverviewsComponent } from './form-field-overviews.component'

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
    component.value = [
      {
        description: 'doge.jpg',
        url: new URL(
          'http://localhost:8080/geonetwork/srv/api/0.1/records/8505d991-e38f-4704-a47a-e7d335dfbef5/attachments/doge.jpg'
        ),
      },
    ]
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
