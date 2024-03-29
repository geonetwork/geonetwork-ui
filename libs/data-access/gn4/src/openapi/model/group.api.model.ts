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
import { MetadataCategoryApiModel } from './metadataCategory.api.model'

/**
 * Group details
 */
export interface GroupApiModel {
  logo?: string
  website?: string
  defaultCategory?: MetadataCategoryApiModel
  allowedCategories?: Array<MetadataCategoryApiModel>
  enableAllowedCategories?: boolean
  reserved?: boolean
  email?: string
  referrer?: number
  description?: string
  id?: number
  name?: string
  label?: { [key: string]: string }
}
