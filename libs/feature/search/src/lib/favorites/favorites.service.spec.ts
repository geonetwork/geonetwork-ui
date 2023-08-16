import { FavoritesService } from './favorites.service'
import { AuthService } from '@geonetwork-ui/feature/auth'
import {
  MeResponseApiModel,
  UserselectionsApiService,
} from '@geonetwork-ui/data-access/gn4'
import { of, throwError } from 'rxjs'
import { readFirst } from '@nx/angular/testing'
import { delay } from 'rxjs/operators'
import { fakeAsync, tick } from '@angular/core/testing'

class AuthServiceMock {
  authReady = jest.fn(() =>
    of({
      id: '1234',
      name: 'fakeuser',
    } as MeResponseApiModel)
  )
}

class UserSelectionsServiceMock {
  getSelectionRecords = jest.fn(() => of(['abcd', 'efgh', 'ijkl']))
  addToUserSelection = jest.fn(() => of(''))
  deleteFromUserSelection = jest.fn(() => of(''))
}

describe('FavoritesService', () => {
  let service: FavoritesService
  let userSelectionsService: UserselectionsApiService
  let authService: AuthService

  beforeEach(() => {
    userSelectionsService = new UserSelectionsServiceMock() as any
    authService = new AuthServiceMock() as any
    service = new FavoritesService(userSelectionsService, authService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('myFavorites$', () => {
    describe('when not authenticated', () => {
      beforeEach(() => {
        authService.authReady = () => of(null)
        service = new FavoritesService(userSelectionsService, authService)
      })
      it('returns an empty array', async () => {
        const uuids = await readFirst(service.myFavoritesUuid$)
        expect(uuids).toEqual([])
      })
    })
    describe('when an error happens', () => {
      beforeEach(() => {
        userSelectionsService.getSelectionRecords = jest.fn(() =>
          throwError(new Error('blargz'))
        )
      })
      it('throws an error', async () => {
        expect.assertions(2)
        try {
          await readFirst(service.myFavoritesUuid$)
        } catch (e: any) {
          expect(e.message).toContain('fetching favorite records')
          expect(e.message).toContain('blargz')
        }
      })
    })
    it('emits a list of saved record uuids', async () => {
      const uuids = await readFirst(service.myFavoritesUuid$)
      expect(uuids).toEqual(['abcd', 'efgh', 'ijkl'])
    })
    describe('when subscribing multiple times', () => {
      beforeEach(fakeAsync(() => {
        ;(userSelectionsService as any).getSelectionRecords = jest.fn(() =>
          of(['aa']).pipe(
            delay(100) // add a delay to make sure that there are no concurrent requests
          )
        )
        service.myFavoritesUuid$.subscribe()
        service.myFavoritesUuid$.subscribe()
        tick(200)
        service.myFavoritesUuid$.subscribe()
      }))
      it('only calls the API once', () => {
        expect(userSelectionsService.getSelectionRecords).toHaveBeenCalledTimes(
          1
        )
      })
    })
  })

  describe('addToFavorites', () => {
    let favorites
    describe('when not authenticated', () => {
      beforeEach(() => {
        authService.authReady = () => of(null)
        service = new FavoritesService(userSelectionsService, authService)
      })
      it('throws an error', async () => {
        expect.assertions(1)
        try {
          await service.addToFavorites(['aaa']).toPromise()
        } catch (e: any) {
          expect(e.message).toContain('not authenticated')
        }
      })
    })
    describe('when an error happens', () => {
      beforeEach(() => {
        favorites = null
        service.myFavoritesUuid$.subscribe((value) => (favorites = value))
        userSelectionsService.addToUserSelection = jest.fn(() =>
          throwError(new Error('blargz'))
        )
      })
      it('throws an error', async () => {
        expect.assertions(2)
        try {
          await service.addToFavorites(['aaa']).toPromise()
        } catch (e: any) {
          expect(e.message).toContain('adding records')
          expect(e.message).toContain('blargz')
        }
      })
      it('does not add the record to favorites', async () => {
        expect.assertions(1)
        try {
          await service.addToFavorites(['zzz']).toPromise()
        } catch (e) {
          // ignore
        }
        expect(favorites).toEqual(['abcd', 'efgh', 'ijkl'])
      })
    })
    describe('nominal case', () => {
      beforeEach(async () => {
        favorites = null
        service.myFavoritesUuid$.subscribe((value) => (favorites = value))
        await service.addToFavorites(['uvw', 'xyz']).toPromise()
      })
      it('calls the corresponding API', () => {
        expect(userSelectionsService.addToUserSelection).toHaveBeenCalledWith(
          0,
          1234,
          ['uvw', 'xyz']
        )
      })
      it('emits new records in myFavorites$', () => {
        expect(favorites).toEqual(['abcd', 'efgh', 'ijkl', 'uvw', 'xyz'])
      })
    })
  })

  describe('removeFromFavorites', () => {
    let favorites
    describe('when not authenticated', () => {
      beforeEach(() => {
        authService.authReady = () => of(null)
        service = new FavoritesService(userSelectionsService, authService)
      })
      it('throws an error', async () => {
        expect.assertions(1)
        try {
          await service.removeFromFavorites(['aaa']).toPromise()
        } catch (e: any) {
          expect(e.message).toContain('not authenticated')
        }
      })
    })
    describe('when an error happens', () => {
      beforeEach(() => {
        favorites = null
        service.myFavoritesUuid$.subscribe((value) => (favorites = value))
        userSelectionsService.deleteFromUserSelection = jest.fn(() =>
          throwError(new Error('blargz'))
        )
      })
      it('throws an error', async () => {
        expect.assertions(2)
        try {
          await service.removeFromFavorites(['aaa']).toPromise()
        } catch (e: any) {
          expect(e.message).toContain('removing records')
          expect(e.message).toContain('blargz')
        }
      })
      it('does not remove the record from favorites', async () => {
        expect.assertions(1)
        try {
          await service.removeFromFavorites(['abcd']).toPromise()
        } catch (e) {
          // ignore
        }
        expect(favorites).toEqual(['abcd', 'efgh', 'ijkl'])
      })
    })
    describe('nominal case', () => {
      beforeEach(async () => {
        favorites = null
        service.myFavoritesUuid$.subscribe((value) => (favorites = value))
        await service.removeFromFavorites(['abcd', 'ijkl']).toPromise()
      })
      it('calls the corresponding API', () => {
        expect(
          userSelectionsService.deleteFromUserSelection
        ).toHaveBeenCalledWith(0, 1234, ['abcd', 'ijkl'])
      })
      it('emits records without the ones removed in myFavorites$', () => {
        expect(favorites).toEqual(['efgh'])
      })
    })
  })
})
