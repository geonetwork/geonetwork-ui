import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatIconModule } from '@angular/material/icon'
import { DownloadsListItemComponent } from './downloads-list-item.component'

describe('DownloadsListItemComponent', () => {
  let component: DownloadsListItemComponent
  let fixture: ComponentFixture<DownloadsListItemComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DownloadsListItemComponent],
      imports: [MatIconModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadsListItemComponent)
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
