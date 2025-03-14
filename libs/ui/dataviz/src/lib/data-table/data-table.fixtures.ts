import { DataItem, PropertyInfo } from '@geonetwork-ui/data-fetcher'

export const tableItemsFixture = {
  items: [
    {
      type: 'Feature',
      geometry: null,
      properties: {
        id: '0001',
        firstName: 'John',
        lastName: 'Lennon',
      },
    },
    {
      type: 'Feature',
      geometry: null,
      properties: {
        id: '0002',
        firstName: 'Ozzy',
        lastName: 'Osbourne',
      },
    },
    {
      type: 'Feature',
      geometry: null,
      properties: {
        id: '0003',
        firstName: 'Claude',
        lastName: 'François',
      },
    },
  ] as DataItem[],
  properties: [
    { name: 'id', label: 'id', type: 'string' },
    { name: 'firstName', label: 'Firstname', type: 'string' },
    { name: 'lastName', label: 'Lastname', type: 'string' },
  ] as PropertyInfo[],
}

export const someHabTableItemFixture = {
  items: [
    {
      type: 'Feature',
      geometry: null,
      properties: {
        id: '1',
        name: 'France',
        pop: 50500000,
      },
    },
    {
      type: 'Feature',
      geometry: null,
      properties: {
        id: '2',
        name: 'Italy',
        pop: 155878789655,
      },
    },
    {
      type: 'Feature',
      geometry: null,
      properties: {
        id: '3',
        name: 'UK',
        pop: 31522456,
      },
    },
    {
      type: 'Feature',
      geometry: null,
      properties: {
        id: '4',
        name: 'US',
        pop: 3215448888,
      },
    },
  ] as DataItem[],
  properties: [
    { name: 'id', label: 'ID', type: 'string' },
    { name: 'name', label: 'Name', type: 'string' },
    { name: 'pop', label: 'Population', type: 'number' },
  ] as PropertyInfo[],
}
