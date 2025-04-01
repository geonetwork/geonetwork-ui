import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SimpleTableComponent } from './simple-table.component'
import { TranslateModule } from '@ngx-translate/core'
import { By } from '@angular/platform-browser'

describe('SimpleTableComponent', () => {
  let component: SimpleTableComponent
  let fixture: ComponentFixture<SimpleTableComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleTableComponent, TranslateModule.forRoot()],
    }).compileComponents()

    fixture = TestBed.createComponent(SimpleTableComponent)
    component = fixture.componentInstance
    component.data = [
      {
        type: 'String',
        name: 'test_field',
        code: 'TEST_001',
        title: 'Test description',
      },
    ]
    component.columns = [
      { key: 'type', label: 'Type', width: '25%' },
      { key: 'name', label: 'Name', width: '25%' },
      { key: 'code', label: 'Code', width: '25%' },
      { key: 'title', label: 'Description', width: '25%' },
    ]
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display the correct number of columns', () => {
    const headers = fixture.debugElement.queryAll(By.css('.font-bold'))
    expect(headers.length).toBe(4)
  })

  it('should display the correct number of data cells', () => {
    const cells = fixture.debugElement.queryAll(
      By.css('.text-sm:not(.font-bold)')
    )
    expect(cells.length).toBe(4) // 1 row * 4 columns
  })

  it('should update grid template when columns change', () => {
    component.columns = [
      { key: 'type', label: 'Type', width: '50%' },
      { key: 'name', label: 'Name', width: '50%' },
    ]
    component.ngOnChanges({
      columns: {
        currentValue: component.columns,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true,
      },
    })
    fixture.detectChanges()
    expect(component.gridTemplateColumns).toBe('50% 50%')
  })

  it('should handle columns without width', () => {
    component.columns = [
      { key: 'type', label: 'Type' },
      { key: 'name', label: 'Name' },
    ]
    component.ngOnChanges({
      columns: {
        currentValue: component.columns,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true,
      },
    })
    fixture.detectChanges()
    expect(component.gridTemplateColumns).toBe('1fr 1fr')
  })
})
