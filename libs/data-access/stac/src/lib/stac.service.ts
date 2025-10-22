import { Injectable } from '@angular/core'
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError, Subject, of } from 'rxjs'
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators'
import {
  StacItemCollection,
  StacQueryParams,
  StacQueryResponse,
  StacLink,
} from './models/stac.model'

/**
 * Service for querying STAC (SpatioTemporal Asset Catalog) Items API
 *
 * This service provides methods to:
 * - Query STAC collections with spatial (bbox) and temporal (datetime) filters
 * - Handle pagination with next/previous links
 * - Debounce requests to avoid excessive API calls
 */
@Injectable({
  providedIn: 'root',
})
export class StacService {
  private readonly DEFAULT_LIMIT = 12
  private readonly DEBOUNCE_TIME = 500 // milliseconds

  private querySubject = new Subject<{
    url: string
    params: StacQueryParams
  }>()

  constructor(private http: HttpClient) {}

  /**
   * Query a STAC Items collection with optional spatial and temporal filters
   *
   * @param collectionUrl - The URL to the STAC Items collection endpoint
   * @param params - Query parameters (bbox, datetime, limit)
   * @returns Observable of StacQueryResponse containing items and pagination links
   *
   * @example
   * ```typescript
   * stacService.queryItems(
   *   'https://api.stac.example.com/collections/my-collection/items',
   *   {
   *     bbox: [-10, 40, 10, 50],
   *     datetime: '2024-01-01T00:00:00Z/2024-12-31T23:59:59Z',
   *     limit: 12
   *   }
   * ).subscribe(response => {
   *   console.log('Items:', response.items);
   *   console.log('Next page:', response.links.next);
   * });
   * ```
   */
  queryItems(
    collectionUrl: string,
    params: StacQueryParams = {}
  ): Observable<StacQueryResponse> {
    const httpParams = this.buildHttpParams(params)

    return this.http
      .get<StacItemCollection>(collectionUrl, { params: httpParams })
      .pipe(
        map((collection) => this.transformResponse(collection)),
        catchError((error) => this.handleError(error))
      )
  }

  /**
   * Query STAC Items with debouncing to prevent excessive API calls
   * Useful for search inputs that trigger frequent changes
   *
   * @param collectionUrl - The URL to the STAC Items collection endpoint
   * @param params - Query parameters (bbox, datetime, limit)
   * @returns Observable of StacQueryResponse
   */
  queryItemsDebounced(
    collectionUrl: string,
    params: StacQueryParams = {}
  ): Observable<StacQueryResponse> {
    // Create a debounced observable that triggers the actual query
    return of({ url: collectionUrl, params }).pipe(
      debounceTime(this.DEBOUNCE_TIME),
      distinctUntilChanged(
        (prev, curr) =>
          prev.url === curr.url &&
          JSON.stringify(prev.params) === JSON.stringify(curr.params)
      ),
      switchMap(({ url, params }) => this.queryItems(url, params))
    )
  }

  /**
   * Fetch the next page of results using the 'next' link from a previous response
   *
   * @param nextUrl - The URL from response.links.next
   * @returns Observable of StacQueryResponse
   */
  fetchNextPage(nextUrl: string): Observable<StacQueryResponse> {
    if (!nextUrl) {
      return throwError(() => new Error('No next page URL provided'))
    }

    return this.http.get<StacItemCollection>(nextUrl).pipe(
      map((collection) => this.transformResponse(collection)),
      catchError((error) => this.handleError(error))
    )
  }

  /**
   * Fetch the previous page of results using the 'prev' link from a previous response
   *
   * @param prevUrl - The URL from response.links.prev
   * @returns Observable of StacQueryResponse
   */
  fetchPreviousPage(prevUrl: string): Observable<StacQueryResponse> {
    if (!prevUrl) {
      return throwError(() => new Error('No previous page URL provided'))
    }

    return this.http.get<StacItemCollection>(prevUrl).pipe(
      map((collection) => this.transformResponse(collection)),
      catchError((error) => this.handleError(error))
    )
  }

  /**
   * Build HTTP parameters from StacQueryParams
   */
  private buildHttpParams(params: StacQueryParams): HttpParams {
    let httpParams = new HttpParams()

    // Set limit (default to 12 if not provided)
    const limit = params.limit || this.DEFAULT_LIMIT
    httpParams = httpParams.set('limit', limit.toString())

    // Add bbox if provided
    if (params.bbox && params.bbox.length === 4) {
      httpParams = httpParams.set('bbox', params.bbox.join(','))
    }

    // Add datetime if provided
    if (params.datetime) {
      httpParams = httpParams.set('datetime', params.datetime)
    }

    return httpParams
  }

  /**
   * Transform STAC ItemCollection response to StacQueryResponse
   */
  private transformResponse(
    collection: StacItemCollection
  ): StacQueryResponse {
    const links = this.extractLinks(collection.links)

    return {
      items: collection.features,
      links: {
        next: links.next,
        prev: links.prev,
        self: links.self,
      },
      totalMatched:
        collection.context?.matched || collection.numberMatched || undefined,
      totalReturned:
        collection.context?.returned ||
        collection.numberReturned ||
        collection.features.length,
    }
  }

  /**
   * Extract relevant links from STAC links array
   */
  private extractLinks(links: StacLink[]): {
    next?: string
    prev?: string
    self?: string
  } {
    const result: { next?: string; prev?: string; self?: string } = {}

    links.forEach((link) => {
      if (link.rel === 'next') {
        result.next = link.href
      } else if (link.rel === 'prev' || link.rel === 'previous') {
        result.prev = link.href
      } else if (link.rel === 'self') {
        result.self = link.href
      }
    })

    return result
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred while querying STAC API'

    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Network error: ${error.error.message}`
    } else {
      // Backend error
      switch (error.status) {
        case 400:
          errorMessage = 'Bad request: Invalid query parameters'
          break
        case 404:
          errorMessage = 'Collection not found'
          break
        case 500:
          errorMessage = 'STAC API server error'
          break
        default:
          errorMessage = `STAC API error (${error.status}): ${error.message}`
      }
    }

    return throwError(() => new Error(errorMessage))
  }
}
