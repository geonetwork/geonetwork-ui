import fetchMock from 'fetch-mock-jest'
import fs from 'fs/promises'
import path from 'path'
import { readDataset } from '@geonetwork-ui/data-fetcher'

describe('all', () => {
  beforeEach(() => {
    // this is used to make the HTTP requests pointing at http://localfile
    // to read the fixture files by name
    fetchMock.get(
      (url) => new URL(url).hostname === 'localfile',
      async (url) =>
        await fs.readFile(
          path.join(__dirname, '..', new URL(url).pathname),
          'utf8'
        )
    )
  })
  afterEach(() => {
    fetchMock.reset()
  })
  describe('readDataset', () => {
    describe('network error occurs', () => {
      beforeEach(() => {
        fetchMock.get(
          () => true,
          () => {
            throw new Error('random network problem')
          }
        )
      })
      it('throws a relevant error', () => {
        return expect(
          readDataset('http://bla/abcd.json')
        ).rejects.toMatchObject({
          message: expect.stringContaining('random network problem'),
          isCrossOriginOrNetworkRelated: true,
        })
      })
    })
    describe('HTTP error code received', () => {
      beforeEach(() => {
        fetchMock.get(
          () => true,
          () => ({ body: 'something went wrong', status: 403 })
        )
      })
      it('throws a relevant error', () => {
        return expect(
          readDataset('http://bla/abcd.json')
        ).rejects.toMatchObject({
          message: expect.stringContaining('HTTP error'),
          httpStatus: 403,
        })
      })
    })
    describe('Mime type is not recognized', () => {
      beforeEach(() => {
        fetchMock.get(
          () => true,
          () => ({
            body: 'some data in an unsupported format',
            status: 200,
            headers: {
              'Content-Type': 'application/unsupported',
            },
          })
        )
      })
      it('throws a relevant error', () => {
        return expect(
          readDataset('http://bla/abcd.json')
        ).rejects.toMatchObject({
          message: expect.stringContaining('content type is unsupported'),
          contentTypeError: true,
        })
      })
    })
    describe('Mime type is absent', () => {
      beforeEach(() => {
        fetchMock.get(
          () => true,
          () => ({
            status: 200,
          })
        )
      })
      it('throws a relevant error', () => {
        return expect(
          readDataset('http://bla/abcd.json')
        ).rejects.toMatchObject({
          message: expect.stringContaining(
            'content type could not be inferred'
          ),
          contentTypeError: true,
        })
      })
    })
  })
})
