import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  Input,
  NO_ERRORS_SCHEMA,
} from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LinkClassifierService } from '@geonetwork-ui/util/shared'
import { TranslateModule } from '@ngx-translate/core'
import { ListComponent } from './list.component'
import { DatasetDistribution } from '@geonetwork-ui/common/domain/model/record'

@Component({
  selector: 'gn-ui-download-item',
  template: ``,
})
class MockDownloadItemComponent {
  @Input() link: DatasetDistribution
  @Input() color: string
  @Input() format: string
  @Input() isFromWfs: boolean
}

describe('ListComponent', () => {
  let component: ListComponent
  let fixture: ComponentFixture<ListComponent>
  let de: DebugElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [ListComponent, MockDownloadItemComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [LinkClassifierService],
    })
      .overrideComponent(ListComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent)
    component = fixture.componentInstance
    component.listItems = []
    de = fixture.debugElement
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
