import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MetadataQualityComponent } from './metadata-quality.component'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { CommonModule } from '@angular/common'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { TranslateModule } from '@ngx-translate/core'
import { MetadataQualityItemComponent } from '../metadata-quality-item/metadata-quality-item.component'
import { PopoverComponent } from '@geonetwork-ui/ui/widgets'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { By } from '@angular/platform-browser'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { cold } from 'jasmine-marbles'
import { of } from 'rxjs'

describe('MetadataQualityComponent', () => {
  let component: MetadataQualityComponent
  let fixture: ComponentFixture<MetadataQualityComponent>
  const expectedItems = [
    { name: 'title', value: true },
    { name: 'description', value: true },
    { name: 'topic', value: true },
    { name: 'keywords', value: true },
    { name: 'legalConstraints', value: true },
    { name: 'organisation', value: true },
    { name: 'contact', value: true },
    { name: 'updateFrequency', value: true },
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        MetadataQualityComponent,
        UtilSharedModule,
        CommonModule,
        UtilI18nModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
        PopoverComponent,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataQualityComponent)
    component = fixture.componentInstance
    component.metadata = datasetRecordsFixture()[0]
    component.metadataQualityDisplay = true
    component.initialize()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('content', () => {
    expect(component.metadata?.contacts[0]?.email).toBe('bob@org.net')
  })

  it('should populate info', () => {
    const infoObservable = of(component.items)
    const expected$ = cold('(a|)', { a: expectedItems })
    expect(infoObservable).toBeObservable(expected$)
  })

  it('should display sub-components with correct inputs', () => {
    const popoverElement = fixture.debugElement.query(
      By.directive(PopoverComponent)
    )
    popoverElement.triggerEventHandler('mouseenter', null)
    fixture.detectChanges()
    const metadataItems = fixture.debugElement.queryAll(
      By.directive(MetadataQualityItemComponent)
    )
    const expectedItemsCount = expectedItems.length
    expect(metadataItems.length).toBe(expectedItemsCount)

    for (let i = 0; i < expectedItemsCount; i++) {
      const el = metadataItems[i].componentInstance
      expect(el.name).toBe(expectedItems[i].name)
      expect(el.value).toBe(expectedItems[i].value)
    }
  })
})
