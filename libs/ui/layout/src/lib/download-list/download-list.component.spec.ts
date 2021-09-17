import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DownloadListComponent } from './download-list.component'
import { DownloadEntryComponent } from '../download-entry/download-entry.component'
import { MatIconModule } from '@angular/material/icon'

describe('DownloadListComponent', () => {
  let component: DownloadListComponent
  let fixture: ComponentFixture<DownloadListComponent>

  const linksMock = [
    {
      format: 'geojson',
      resourceName: 'allroads.geojson',
      title: 'All roads 2021',
      description: 'A file that contains all roads',
      url: 'https//roads.com/allroads.geojson',
    },
    {
      format: 'csv',
      resourceName: 'allroads.csv',
      title: 'All roads 2021',
      description: 'A file that contains all roads',
      url: 'https//roads.com/allroads.csv',
    },
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DownloadListComponent, DownloadEntryComponent],
      imports: [MatIconModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadListComponent)
    component = fixture.componentInstance
    component.links = linksMock
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
