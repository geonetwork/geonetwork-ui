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

/**
 * Metadata status
 */
export interface MetadataStatusParameterApiModel {
  type?: MetadataStatusParameterApiModel.TypeEnum
  status?: number
  changeMessage?: string
  dueDate?: string
  closeDate?: string
  owner?: number
}
export namespace MetadataStatusParameterApiModel {
  export type TypeEnum = 'workflow' | 'task' | 'event'
  export const TypeEnum = {
    Workflow: 'workflow' as TypeEnum,
    Task: 'task' as TypeEnum,
    Event: 'event' as TypeEnum,
  }
}
