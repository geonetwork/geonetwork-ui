import { ComponentFixture, TestBed } from '@angular/core/testing'
import { InteractiveTableComponent } from './interactive-table.component'
import { Component, DebugElement, EventEmitter, Output } from '@angular/core'
import { By } from '@angular/platform-browser'
import { InteractiveTableColumnComponent } from './interactive-table-column/interactive-table-column.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'

@Component({
  template: `
    <gn-ui-interactive-table [items]="[{ name: 'abcd' }]">
      <gn-ui-interactive-table-column
        [sortable]="true"
        (sortChange)="sortChange.emit([0, $event])"
      >
        <ng-template #header>header 1</ng-template>
        <ng-template #cell let-item>cell 1: {{ item.name }}</ng-template>
      </gn-ui-interactive-table-column>
      <gn-ui-interactive-table-column [grow]="true">
        <ng-template #header>header 2</ng-template>
        <ng-template #cell let-item>cell 2: {{ item.name }}</ng-template>
      </gn-ui-interactive-table-column>
      <gn-ui-interactive-table-column
        [sortable]="true"
        (sortChange)="sortChange.emit([1, $event])"
        activeSort="asc"
      >
        <ng-template #header>header 3</ng-template>
        <ng-template #cell let-item>cell 3: {{ item.name }}</ng-template>
      </gn-ui-interactive-table-column>
    </gn-ui-interactive-table>
  `,
  standalone: true,
  imports: [InteractiveTableComponent, InteractiveTableColumnComponent],
})
class TestHostComponent {
  @Output() sortChange = new EventEmitter()
}

describe('InteractiveTableComponent', () => {
  let component: InteractiveTableComponent
  let hostComponent: TestHostComponent
  let fixture: ComponentFixture<TestHostComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideI18n()],
    }).compileComponents()

    fixture = TestBed.createComponent(TestHostComponent)
    hostComponent = fixture.componentInstance
    component = fixture.debugElement.query(
      By.directive(InteractiveTableComponent)
    ).componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('gridStyle', () => {
    it('computes CSS props according to the columns', () => {
      expect(component.gridStyle).toEqual({
        'grid-template-columns':
          'minmax(0px,max-content) minmax(0px,1fr) minmax(0px,max-content)',
      })
    })
  })

  describe('column sort', () => {
    let headerCells: DebugElement[]
    let emitted
    beforeEach(() => {
      headerCells = fixture.debugElement.queryAll(By.css('.table-header-cell'))
      emitted = null
      hostComponent.sortChange.subscribe((e) => (emitted = e))
    })
    describe('sortChange event', () => {
      it('emits asc if no defined sort', () => {
        headerCells[0].nativeElement.click()
        expect(emitted).toEqual([0, 'asc'])
      })
      it('changes sort order if an existing sort order is defined', () => {
        headerCells[2].nativeElement.click()
        expect(emitted).toEqual([1, 'desc'])
        headerCells[2].nativeElement.click()
        expect(emitted).toEqual([1, 'asc'])
      })
      it('does nothing if column is not sortable', () => {
        headerCells[1].nativeElement.click()
        expect(emitted).toEqual(null)
      })
    })
  })
})
