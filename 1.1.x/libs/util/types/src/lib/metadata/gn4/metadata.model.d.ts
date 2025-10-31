import { Geometry } from 'geojson';
type LangCode = string;
type MultilingualField = {
    [K in `lang${LangCode}`]: string;
} & {
    default: string;
};
type BooleanString = 'true' | 'false';
interface CodeListEntry extends MultilingualField {
    key: string;
    link?: string;
}
type MaybeArray<T> = T | T[];
interface Contact {
    organisation: string;
    role: string;
    email: string;
    website: string;
    logo: string;
    individual: string;
    position: string;
    phone: string;
    address: string;
}
interface Overview {
    data?: string;
    url?: string;
    text?: MultilingualField;
}
interface ResourceDate {
    type: string;
    date: string;
}
interface ResourceTemporalDateRange {
    gte?: string;
    lte?: string;
}
interface ResourceIdentifier {
    code: string;
    codeSpace: string;
    link: string;
}
interface SpecificationConformance {
    title: string;
    date: string;
    explanation: string;
    pass: BooleanString;
}
type Keyword = MultilingualField;
type Keywords = Keyword[];
type ThesaurusName = string;
interface Thesaurus {
    id?: string;
    title?: string;
    theme?: string;
    link?: string;
    keywords: Keywords;
}
export interface Link {
    protocol?: string;
    mimeType?: string;
    url?: string;
    name?: string;
    description?: string;
    function?: string;
    applicationProfile?: string;
    group?: number;
}
type DocType = 'metadata';
export type MetadataObject = Partial<{
    MD_ConstraintsUseLimitationObject: MultilingualField[];
    MD_LegalConstraintsOtherConstraintsObject: MultilingualField[];
    Org: string;
    OrgForResource: string[];
    allKeywords: Record<ThesaurusName, Thesaurus>;
    changeDate: string;
    cl_characterSet: CodeListEntry[];
    cl_function: CodeListEntry[];
    cl_hierarchyLevel: CodeListEntry[];
    cl_resourceCharacterSet: CodeListEntry[];
    cl_status: CodeListEntry[];
    cl_topic: CodeListEntry[];
    cl_type: CodeListEntry[];
    conformTo_Titredunespcificationlaquellelasriededonnesestconformeounon: string;
    contact: Contact[];
    contactForResource: Contact[];
    createDate: string;
    creationDateForResource: string[];
    creationMonthForResource: string;
    creationYearForResource: string;
    dateStamp: string;
    displayOrder: string;
    docType: DocType;
    document: string;
    documentStandard: string;
    draft: string;
    extentDescriptionObject: MultilingualField[];
    extra: string;
    featureOfRecord: string;
    feedbackCount: string;
    geom: Geometry;
    groupOwner: string;
    groupPublished: string[];
    groupPublishedId: string;
    harvesterUuid: string;
    hasInspireTheme: BooleanString;
    hasOverview: BooleanString;
    hasxlinks: BooleanString;
    id: string;
    indexingDate: string;
    indexingError: string[];
    indexingErrorMsg: string[];
    inspireAnnex: string[];
    inspireAnnexForFirstTheme: string;
    inspireTheme: string[];
    inspireThemeFirst: string;
    inspireThemeFirst_syn: string;
    inspireThemeNumber: string;
    inspireThemeUri: string[];
    inspireTheme_syn: string[];
    isHarvested: string;
    isOpenData: string;
    isPublishedToAll: string;
    isTemplate: string;
    keywordType: Record<string, MultilingualField[]>;
    licenseObject: MultilingualField[];
    lineageObject: MultilingualField;
    link: Link[];
    linkProtocol: string[];
    linkUrl: string[];
    linkUrlProtocolOGCWFS: string[];
    linkUrlProtocolOGCWMS: string[];
    linkUrlProtocolWWWLINK10httplink: MaybeArray<string>;
    linkUrlProtocolWWWLINK10httprelated: string;
    location: string;
    logo: string;
    mainLanguage: string;
    metadataIdentifier: string;
    overview: Overview[];
    owner: string;
    pointOfContactOrg: string;
    pointOfContactOrgForResource: string;
    popularity: number;
    rating: string;
    record: string;
    recordGroup: string;
    recordOwner: string;
    resolutionDistance: string[];
    resolutionScaleDenominator: string[];
    resourceAbstractObject: MultilingualField;
    resourceDate: ResourceDate[];
    resourceEdition: string;
    resourceIdentifier: ResourceIdentifier[];
    resourceLanguage: string[];
    resourceTemporalDateRange: ResourceTemporalDateRange[];
    resourceTemporalExtentDateRange: ResourceTemporalDateRange[];
    resourceTitleObject: MultilingualField;
    resourceType: string[];
    resourceTypeNameObject: MultilingualField;
    revisionDateForResource: string[];
    revisionMonthForResource: string;
    revisionYearForResource: string;
    sourceCatalogue: string;
    specificationConformance: MaybeArray<SpecificationConformance>;
    standardNameObject: MultilingualField;
    standardVersionObject: MultilingualField;
    tag: Keywords;
    tagNumber: string;
    userSavedCount: string;
    userinfo: string;
    uuid: string;
    valid: string;
    xlink: string[];
}>;
interface Hit {
    _index: string;
    _type: string;
    _id: string;
    _score: number;
    _source: MetadataObject;
    edit?: boolean;
    owner?: boolean;
    isPublishedToAll?: boolean;
    view?: boolean;
    notify?: boolean;
    download?: boolean;
    dynamic?: boolean;
    featured?: boolean;
    guestdownload?: boolean;
    selected?: boolean;
}
interface HitsObject {
    max_score?: number;
    total?: {
        value: number;
        relation: 'eq';
    };
    hits: Hit[];
}
export interface Gn4SearchResults {
    took?: number;
    timed_out?: boolean;
    _shards?: {
        total: number;
        successful: number;
        skipped: number;
        failed: number;
    };
    hits: HitsObject;
}
export {};
