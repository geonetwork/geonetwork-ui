import { Individual } from './contact.model';
import { Organization } from './organisation.model';
type Uuid = string;
export type UpdateFrequencyCode = 'unknown' | 'notPlanned' | 'asNeeded' | 'irregular' | 'continual' | 'periodic';
export type UpdateFrequencyCustom = {
    updatedTimes: number;
    per: 'day' | 'week' | 'month' | 'year';
};
export type UpdateFrequency = UpdateFrequencyCode | UpdateFrequencyCustom;
export type RecordKind = 'dataset' | 'service';
export declare enum RecordStatus {
    COMPLETED = "COMPLETED",
    ON_GOING = "ON_GOING",
    UNDER_DEVELOPMENT = "UNDER_DEVELOPMENT",
    DEPRECATED = "DEPRECATED",
    REMOVED = "REMOVED"
}
export type AccessConstraintType = 'security' | 'privacy' | 'legal' | 'other';
export interface AccessConstraint {
    text: string;
    type: AccessConstraintType;
}
export type License = {
    text: string;
    url?: URL;
};
export type SpatialRepresentationType = 'grid' | 'vector' | 'tin' | 'table' | 'point';
export interface BaseRecord {
    uniqueIdentifier: Uuid;
    ownerOrganization: Organization;
    contacts: Array<Individual>;
    title: string;
    abstract: string;
    recordCreated?: Date;
    recordUpdated: Date;
    kind: RecordKind;
    themes: Array<string>;
    keywords: Array<string>;
    accessConstraints: Array<AccessConstraint>;
    useLimitations: Array<string>;
    licenses: Array<License>;
    overviews: Array<GraphicOverview>;
    extras?: Record<string, unknown>;
    landingPage?: URL;
}
export type ServiceProtocol = 'wms' | 'wfs' | 'wps' | 'wmts' | 'esriRest' | 'other';
export type DatasetDistributionType = 'service' | 'download' | 'link' | 'other';
export interface DatasetServiceDistribution {
    type: 'service';
    accessServiceUrl: URL;
    accessServiceProtocol: ServiceProtocol;
    identifierInService?: string;
    name?: string;
    description?: string;
}
export interface DatasetDownloadDistribution {
    type: 'download';
    downloadUrl: URL;
    mimeType?: string;
    sizeBytes?: number;
    name?: string;
    description?: string;
}
export interface OnlineLinkResource {
    type: 'link';
    linkUrl: URL;
    name?: string;
    description?: string;
}
export type DatasetDistribution = (DatasetServiceDistribution | DatasetDownloadDistribution | OnlineLinkResource) & {
    type: DatasetDistributionType;
};
export interface GraphicOverview {
    url: URL;
    description?: string;
}
export interface DatasetSpatialExtent {
    geometry: unknown;
    description?: string;
}
export interface DatasetTemporalExtent {
    start: Date;
    end: Date;
    description?: string;
}
export interface DatasetRecord extends BaseRecord {
    kind: 'dataset';
    status: RecordStatus;
    updateFrequency: UpdateFrequency;
    datasetCreated?: Date;
    datasetUpdated?: Date;
    lineage: string;
    distributions: Array<DatasetDistribution>;
    spatialExtents: Array<DatasetSpatialExtent>;
    temporalExtents: Array<DatasetTemporalExtent>;
    spatialRepresentation?: SpatialRepresentationType;
}
export type ServiceOnlineResourceType = 'endpoint' | 'link';
export interface ServiceEndpoint {
    endpointUrl: URL;
    protocol: string;
    type: 'endpoint';
    description?: string;
}
export type ServiceOnlineResource = (ServiceEndpoint | OnlineLinkResource) & {
    type: ServiceOnlineResourceType;
};
export interface ServiceRecord extends BaseRecord {
    kind: 'service';
    onlineResources: Array<ServiceOnlineResource>;
}
export type CatalogRecord = ServiceRecord | DatasetRecord;
export {};
