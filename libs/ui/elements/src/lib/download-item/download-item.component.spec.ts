import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatIconModule } from '@angular/material/icon'
import { TranslateModule } from '@ngx-translate/core'
import { DownloadItemComponent } from './download-item.component'
import { MetadataLinkType } from '@geonetwork-ui/util-shared'

describe('DownloadsListItemComponent', () => {
  let component: DownloadItemComponent
  let fixture: ComponentFixture<DownloadItemComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DownloadItemComponent],
      imports: [MatIconModule, TranslateModule.forRoot()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadItemComponent)
    component = fixture.componentInstance
    component.link = {
      protocol: 'WWW:DOWNLOAD',
      name: 'allroads.geojson',
      description: 'A file that contains all roads',
      url: 'https//roads.com/allroads.geojson',
      type: MetadataLinkType.DOWNLOAD,
    }
    component.format = 'geojson'
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
