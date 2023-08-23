import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { FacetBlockStubComponent } from '../facet-block/facet-block.component'
import { BLOCK_MODEL_FIXTURE } from '../fixtures'
import { FacetListComponent } from './facet-list.component'

describe('FacetListComponent', () => {
  let component: FacetListComponent
  let fixture: ComponentFixture<FacetListComponent>
  let de: DebugElement

  const modelsMock = [BLOCK_MODEL_FIXTURE]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacetListComponent, FacetBlockStubComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetListComponent)
    component = fixture.componentInstance
    de = fixture.debugElement
    component.models = modelsMock
    component.selectedPaths = []
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('Input selectedPaths', () => {
    let block: DebugElement
    beforeEach(() => {
      component.selectedPaths = [
        ['notTag', 'Hungary'],
        [BLOCK_MODEL_FIXTURE.key, 'Austria'],
        ['notOtherTag', 'Latvia'],
        [BLOCK_MODEL_FIXTURE.key, 'Estonia'],
      ]
      fixture.detectChanges()
      block = de.queryAll(By.directive(FacetBlockStubComponent))[0]
    })
    it('filters only the facets for the block', () => {
      expect(
        (block.componentInstance as FacetBlockStubComponent).selectedPaths
      ).toEqual([
        [BLOCK_MODEL_FIXTURE.key, 'Austria'],
        [BLOCK_MODEL_FIXTURE.key, 'Estonia'],
      ])
    })
  })
})
