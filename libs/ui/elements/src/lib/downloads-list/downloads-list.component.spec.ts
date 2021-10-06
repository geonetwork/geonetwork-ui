import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DownloadsListComponent } from './downloads-list.component'
import { DownloadsListItemComponent } from '../downloads-list-item/downloads-list-item.component'
import { MatIconModule } from '@angular/material/icon'

describe('DownloadsListComponent', () => {
  let component: DownloadsListComponent
  let fixture: ComponentFixture<DownloadsListComponent>

  const linksMock = [
    {
      protocol: 'WWW:DOWNLOAD',
      name: 'allroads.geojson',
      format: 'geojson',
      description: 'A file that contains all roads',
      url: 'https//roads.com/allroads.geojson',
    },
    {
      protocol: 'WWW:DOWNLOAD',
      name: 'allroads.csv',
      format: 'csv',
      description: 'A file that contains all roads',
      url: 'https//roads.com/allroads.csv',
    },
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DownloadsListComponent, DownloadsListItemComponent],
      imports: [MatIconModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadsListComponent)
    component = fixture.componentInstance
    component.links = linksMock
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
