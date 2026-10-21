import { Organization } from './organisation.model';
export declare enum Role {
    UNSPECIFIED = "UNSPECIFIED",
    OTHER = "OTHER",
    AUTHOR = "AUTHOR",
    COLLABORATOR = "COLLABORATOR",
    CONTRIBUTOR = "CONTRIBUTOR",
    CUSTODIAN = "CUSTODIAN",
    DISTRIBUTOR = "DISTRIBUTOR",
    EDITOR = "EDITOR",
    FUNDER = "FUNDER",
    MEDIATOR = "MEDIATOR",
    ORIGINATOR = "ORIGINATOR",
    OWNER = "OWNER",
    POINT_OF_CONTACT = "POINT_OF_CONTACT",
    PRINCIPAL_INVESTIGATOR = "PRINCIPAL_INVESTIGATOR",
    PROCESSOR = "PROCESSOR",
    PUBLISHER = "PUBLISHER",
    RESOURCE_PROVIDER = "RESOURCE_PROVIDER",
    RIGHTS_HOLDER = "RIGHTS_HOLDER",
    SPONSOR = "SPONSOR",
    STAKEHOLDER = "STAKEHOLDER",
    USER = "USER"
}
export interface Individual {
    firstName?: string;
    lastName?: string;
    email: string;
    role: Role;
    position?: string;
    organization: Organization;
}
