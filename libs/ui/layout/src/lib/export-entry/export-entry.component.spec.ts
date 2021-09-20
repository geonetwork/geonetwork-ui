import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatIconModule } from '@angular/material/icon'
import { ExportEntryComponent } from './export-entry.component'

describe('ExportEntryComponent', () => {
  let component: ExportEntryComponent
  let fixture: ComponentFixture<ExportEntryComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExportEntryComponent],
      imports: [MatIconModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportEntryComponent)
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
