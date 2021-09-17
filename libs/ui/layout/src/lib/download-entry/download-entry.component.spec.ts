import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatIconModule } from '@angular/material/icon'
import { DownloadEntryComponent } from './download-entry.component'

describe('DownloadEntryComponent', () => {
  let component: DownloadEntryComponent
  let fixture: ComponentFixture<DownloadEntryComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DownloadEntryComponent],
      imports: [MatIconModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadEntryComponent)
    component = fixture.componentInstance
    component.format = 'geojson'
    component.resourceName = 'allroads.geojson'
    component.title = 'All roads 2021'
    component.description = 'A file that contains all roads'
    component.url = 'https//roads.com/allroads.geojson'
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
