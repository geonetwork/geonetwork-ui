import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ExportListComponent } from './export-list.component'
import { ExportEntryComponent } from '../export-entry/export-entry.component'
import { MatIconModule } from '@angular/material/icon'

describe('ExportListComponent', () => {
  let component: ExportListComponent
  let fixture: ComponentFixture<ExportListComponent>

  const linksMock = [
    {
      protocol: 'WWW:DOWNLOAD',
      name: 'allroads.geojson',
      description: 'A file that contains all roads',
      url: 'https//roads.com/allroads.geojson',
    },
    {
      protocol: 'WWW:DOWNLOAD',
      name: 'allroads.csv',
      description: 'A file that contains all roads',
      url: 'https//roads.com/allroads.csv',
    },
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExportListComponent, ExportEntryComponent],
      imports: [MatIconModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportListComponent)
    component = fixture.componentInstance
    component.links = linksMock
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
