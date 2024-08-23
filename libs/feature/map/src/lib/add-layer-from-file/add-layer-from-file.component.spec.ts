import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AddLayerFromFileComponent } from './add-layer-from-file.component'
import { MapFacade } from '../+state/map.facade'
import { TranslateModule } from '@ngx-translate/core'

class MapFacadeMock {
  addLayer = jest.fn()
}

describe('AddLayerFromFileComponent', () => {
  let component: AddLayerFromFileComponent
  let fixture: ComponentFixture<AddLayerFromFileComponent>
  let mapFacade: MapFacade

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), AddLayerFromFileComponent],
      providers: [
        {
          provide: MapFacade,
          useClass: MapFacadeMock,
        },
      ],
    }).compileComponents()

    mapFacade = TestBed.inject(MapFacade)
    fixture = TestBed.createComponent(AddLayerFromFileComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
    expect(component.errorMessage).toBeFalsy()
    expect(component.loading).toBe(false)
    expect(component.successMessage).toBeFalsy()
  })

  describe('handleFileChange', () => {
    describe('if file is not selected', () => {
      beforeEach(() => {
        component.handleFileChange(null)
      })
      it('should set error message', () => {
        expect(component.errorMessage).toEqual('Invalid file format')
      })
    })
    describe('if file size exceeds the limit', () => {
      beforeEach(() => {
        const file = new File([''], 'filename', { type: 'text/plain' })
        jest.spyOn(file, 'size', 'get').mockReturnValue(5000001)
        component.handleFileChange(file)
      })
      it('should set error message', () => {
        expect(component.errorMessage).toEqual(
          'File size exceeds the limit of 5MB'
        )
      })
    })
    describe('if file format is invalid', () => {
      beforeEach(() => {
        const file = new File([''], 'filename', { type: 'text/plain' })
        component.handleFileChange(file)
      })
      it('should set error message', () => {
        expect(component.errorMessage).toEqual('Invalid file format')
      })
    })
    describe('Invalid and then valid file', () => {
      beforeEach(async () => {
        const file = new File([''], 'filename', { type: 'text/plain' })
        await component.handleFileChange(file).catch(() => {
          // ignore
        })
        const file2 = new File([''], 'filename.geojson', {
          type: 'application/json',
        })
        await component.handleFileChange(file2)
      })
      it('should show no error', () => {
        expect(component.errorMessage).toBeFalsy()
      })
    })
  })
  describe('addGeoJsonLayer', () => {
    let data // define data here

    beforeEach(async () => {
      // make this async
      data = {
        type: 'Feature',
        properties: {
          id: '0',
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [100.0, 0.0],
              [101.0, 0.0],
              [101.0, 1.0],
              [100.0, 1.0],
              [100.0, 0.0],
            ],
          ],
        },
      }

      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json',
      })
      const file = new File([blob], 'filename.geojson', {
        type: 'application/json',
      })

      await component.handleFileChange(file) // await this
    })

    it('should add the layer', () => {
      expect(mapFacade.addLayer).toHaveBeenCalledWith({
        type: 'geojson',
        title: 'filename',
        data: JSON.stringify(data, null, 2),
      })
    })
  })
})
