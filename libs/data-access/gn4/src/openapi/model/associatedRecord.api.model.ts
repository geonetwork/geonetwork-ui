/**
 * GeoNetwork 4.2.7 OpenAPI Documentation
 * This is the description of the GeoNetwork OpenAPI. Use this API to manage your catalog.
 *
 * The version of the OpenAPI document: 4.2.7
 * Contact: geonetwork-users@lists.sourceforge.net
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { JsonNodeApiModel } from './jsonNode.api.model'

export interface AssociatedRecordApiModel {
  origin?: string
  properties?: { [key: string]: string }
  _source?: JsonNodeApiModel
  _id?: string
}