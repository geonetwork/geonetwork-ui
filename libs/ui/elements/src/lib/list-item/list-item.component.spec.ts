import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatIconModule } from '@angular/material/icon'
import { TranslateModule } from '@ngx-translate/core'
import { ListItemComponent } from './list-item.component'
import { ChangeDetectionStrategy } from '@angular/core'

describe('ListItemComponent', () => {
  let component: ListItemComponent
  let fixture: ComponentFixture<ListItemComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListItemComponent],
      imports: [MatIconModule, TranslateModule.forRoot()],
    })
      .overrideComponent(ListItemComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemComponent)
    component = fixture.componentInstance
    component.link = {
      name: 'allroads.geojson',
      description: 'A file that contains all roads',
      url: new URL('https://roads.com/allroads.geojson'),
      type: 'download',
    }
    component.format = 'geojson'
    component.color = 'red'

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('download description', () => {})
})
