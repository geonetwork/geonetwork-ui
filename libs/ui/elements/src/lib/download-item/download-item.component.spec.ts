import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatIconModule } from '@angular/material/icon'
import { DownloadItemComponent } from './download-item.component'

describe('DownloadsListItemComponent', () => {
  let component: DownloadItemComponent
  let fixture: ComponentFixture<DownloadItemComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DownloadItemComponent],
      imports: [MatIconModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadItemComponent)
    component = fixture.componentInstance
    component.link = {
      protocol: 'WWW:DOWNLOAD',
      name: 'allroads.geojson',
      format: 'geojson',
      description: 'A file that contains all roads',
      url: 'https//roads.com/allroads.geojson',
    }
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
