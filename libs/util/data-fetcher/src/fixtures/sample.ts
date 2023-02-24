import { DataItem } from '../lib/model'

export const SAMPLE_DATA: DataItem[] = [
  {
    type: 'Feature',
    geometry: null,
    properties: {
      myNumber: 100,
      myOtherNumber: 1005,
      myFloat: 8.4,
      myString: 'relevé',
      myDate: new Date('2020-02-01T00:00'),
      myNull: null,
      myUndefined: undefined,
    },
  },
  {
    type: 'Feature',
    geometry: null,
    properties: {
      myNumber: 100,
      myOtherNumber: 1003,
      myFloat: 3.8,
      myString: 'relève',
      myDate: new Date('2020-02-01T00:00'),
      myNull: null,
      myUndefined: undefined,
    },
  },
  {
    type: 'Feature',
    geometry: null,
    properties: {
      myNumber: 200,
      myOtherNumber: 1003,
      myFloat: 9.1,
      myString: 'relevé',
      myDate: new Date('2018-02-05T00:00'),
      myNull: null,
      myUndefined: undefined,
    },
  },
  {
    type: 'Feature',
    geometry: null,
    properties: {
      myNumber: 300,
      myOtherNumber: 1002,
      myFloat: 18.2,
      myString: 'RELEVE',
      myDate: new Date('2018-02-05T00:00'),
      myNull: null,
    },
  },
  {
    type: 'Feature',
    geometry: null,
    properties: {
      myNumber: 200,
      myOtherNumber: 1000,
      myFloat: 0.34,
      myString: 'Relève',
      myDate: new Date('2018-02-01T00:00'),
      myNull: null,
      myUndefined: undefined,
    },
  },
  {
    type: 'Feature',
    geometry: null,
    properties: {
      myNumber: 400,
      myOtherNumber: 1001,
      myFloat: 12.1,
      myString: 'RELEVE',
      myDate: new Date('2016-01-01T00:00'),
      myNull: null,
    },
  },
]
