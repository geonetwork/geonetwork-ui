import { Inject, Injectable, Optional } from '@angular/core'
import {
  HttpClient,
  HttpHeaders,
  HttpParameterCodec,
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { CustomHttpParameterCodec } from '../openapi/encoder'
import { Configuration } from '../openapi/configuration'

import { BASE_PATH, COLLECTION_FORMATS } from '../openapi/variables'

export interface thesaurusResponse {
  values: { [key: string]: string }
  definitions: { [key: string]: string }
  coordEast?: string
  coordWest?: string
  coordSouth?: string
  coordNorth?: string
  thesaurusKey: string
  value: string
  uri: string
  definition?: string
}

@Injectable({
  providedIn: 'root',
})
export class ThesaurusApiService {
  protected basePath = 'https://apps.titellus.net/geonetwork/srv/api'
  public defaultHeaders = new HttpHeaders()
  public configuration = new Configuration()
  public encoder: HttpParameterCodec

  constructor(
    protected httpClient: HttpClient,
    @Optional() @Inject(BASE_PATH) basePath: string,
    @Optional() configuration: Configuration
  ) {
    if (configuration) {
      this.configuration = configuration
    }
    if (typeof this.configuration.basePath !== 'string') {
      if (typeof basePath !== 'string') {
        basePath = this.basePath
      }
      this.configuration.basePath = basePath
    }
    this.encoder = this.configuration.encoder || new CustomHttpParameterCodec()
  }

  /**
   * List database translations (used to overrides client application translations).
   * @param esFieldName set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param iso3 set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getTranslationsFromThesaurus(
    thesaurusName: string,
    langIso3: string,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<any>
  public getTranslationsFromThesaurus(
    thesaurusName: string,
    langIso3: string,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<thesaurusResponse[]>
  public getTranslationsFromThesaurus(
    thesaurusName: string,
    langIso3: string,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<thesaurusResponse[]>
  public getTranslationsFromThesaurus(
    thesaurusName: string,
    langIso3: string,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<any> {
    if (
      thesaurusName === null ||
      thesaurusName === undefined ||
      langIso3 === null ||
      langIso3 === undefined
    ) {
      throw new Error(
        'Required parameter pack was null or undefined when calling getTranslationsFromThesaurus.'
      )
    }

    console.log('here')
    let headers = this.defaultHeaders

    let httpHeaderAcceptSelected: string | undefined =
      options && options.httpHeaderAccept
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = ['application/json']
      httpHeaderAcceptSelected =
        this.configuration.selectHeaderAccept(httpHeaderAccepts)
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected)
    }

    let responseType_: 'text' | 'json' = 'json'
    if (
      httpHeaderAcceptSelected &&
      httpHeaderAcceptSelected.startsWith('text')
    ) {
      responseType_ = 'text'
    }

    return this.httpClient.get<thesaurusResponse[]>(
      `${
        this.configuration.basePath
      }/registries/vocabularies/search?rows=1000&type=CONTAINS&sort=DESC&thesaurus=${encodeURIComponent(
        String(thesaurusName)
      )}&lang=${encodeURIComponent(langIso3)}`,
      {
        responseType: <any>responseType_,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    )
  }
}
