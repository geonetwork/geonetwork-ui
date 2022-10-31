import { Action } from '@ngrx/store'

import * as MapActions from './map.actions'
import { MapState, initialMapState, mapReducer } from './map.reducer'
import { MAP_CTX_LAYER_WMS_FIXTURE } from '../map-context/map-context.fixtures'
import { MapLayerWithInfo } from './map.models'

function getSampleLayer(title: string): MapLayerWithInfo {
  return { ...MAP_CTX_LAYER_WMS_FIXTURE, loading: false, error: null, title }
}

describe('Map Reducer', () => {
  let initialState: MapState

  beforeEach(() => {
    initialState = {
      ...initialMapState,
      layers: [
        getSampleLayer('first'),
        getSampleLayer('second'),
        getSampleLayer('third'),
      ],
    }
  })

  describe('addLayer', () => {
    it('should add a layer at the end of the list if no index specified', () => {
      const action = MapActions.addLayer({ layer: getSampleLayer('test') })
      const result: MapState = mapReducer(initialState, action)
      expect(result.layers.map((l) => l.title)).toEqual([
        'first',
        'second',
        'third',
        'test',
      ])
    })
    it('should add a layer at a specific index if specified', () => {
      const action = MapActions.addLayer({
        layer: getSampleLayer('test'),
        atIndex: 0,
      })
      const result: MapState = mapReducer(initialState, action)
      expect(result.layers.map((l) => l.title)).toEqual([
        'test',
        'first',
        'second',
        'third',
      ])
    })
  })

  describe('removeLayer', () => {
    it('should remove a layer at the specified index', () => {
      const action = MapActions.removeLayer({ index: 2 })
      const result: MapState = mapReducer(initialState, action)
      expect(result.layers.map((l) => l.title)).toEqual(['first', 'second'])
    })
  })

  describe('updateLayer', () => {
    it('should update a layer at the specified index', () => {
      const action = MapActions.updateLayer({
        updatedLayer: getSampleLayer('updated'),
        index: 1,
      })
      const result: MapState = mapReducer(initialState, action)
      expect(result.layers.map((l) => l.title)).toEqual([
        'first',
        'updated',
        'third',
      ])
    })
  })

  describe('changeLayerOrder', () => {
    it('should reorder the array of layers (current index > new index)', () => {
      const action = MapActions.changeLayerOrder({
        currentIndex: 1,
        newIndex: 0,
      })
      const result: MapState = mapReducer(initialState, action)
      expect(result.layers.map((l) => l.title)).toEqual([
        'second',
        'first',
        'third',
      ])
    })
    it('should reorder the array of layers (current index < new index)', () => {
      const action = MapActions.changeLayerOrder({
        currentIndex: 1,
        newIndex: 2,
      })
      const result: MapState = mapReducer(initialState, action)
      expect(result.layers.map((l) => l.title)).toEqual([
        'first',
        'third',
        'second',
      ])
    })
  })

  describe('setLayerError', () => {
    it('should set the error on a layer', () => {
      const action = MapActions.setLayerError({
        index: 2,
        error: 'something went wrong',
      })
      const result: MapState = mapReducer(initialState, action)
      expect(result.layers.map((l) => l.error)).toEqual([
        null,
        null,
        'something went wrong',
      ])
    })
  })

  describe('clearLayerError', () => {
    it('should clear the error on a layer', () => {
      initialState.layers[1].error = 'oopsie'
      const action = MapActions.clearLayerError({ index: 1 })
      const result: MapState = mapReducer(initialState, action)
      expect(result.layers.map((l) => l.error)).toEqual([null, null, null])
    })
  })

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action
      const result = mapReducer(initialState, action)
      expect(result).toBe(initialState)
    })
  })
})
