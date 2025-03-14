---
outline: deep
---

# Supported search fields

GeoNetwork-UI has built-in logic for several search fields, each of them relying on specific parts of the GeoNetwork search index. This page lists them all and their specificities.

## Usage

These fields are used in the following context:

- when building a URL or permalink from several search criteria; these fields will appear as query parameters in the URL, for instance:  
  `/search?organization=MyOrg&format=csv&format=excel`
- when specifying advanced filters [in a configuration file](../guide/configure.md#search)

## Fields

### Organization

> Field id: `organization`

This field targets the owner organization of a record. The exact meaning of a record's organization is defined by the "organization strategy" used; see [this documentation page](../developers/organizations.md) for more details.

_Note: The `organization` search field is set by some routing links within the datahub app. It is thus needed to unset such filters._

### Publisher

> Field id: `publisherOrg`

This field targets the organization publishing the record. The exact meaning of a record's organization publisher is defined by the "organization strategy" used; see [this documentation page](../developers/organizations.md) for more details.

### Producer

> Field id: `producerOrg`

This field targets the organization producing the record. The exact meaning of a record's organization producer is defined by the "organization strategy" used; see [this documentation page](../developers/organizations.md) for more details.

### Format

> Field id: `format`

This field targets the formats of the distributions present in a record. To have human-readable formats with a GeoNetwork 4 backend, see [this section of the documentation](../guide/deploy.md#enabling-improved-search-fields).

### Publication year

> Field id: `publicationYear`

This field targets the "year" part of the publication date of a record.

### Topic

> Field id: `topic`

This field targets the "topic" field of a record, sometimes also known as "theme". Topics are used for a general first-level classification and categorization of records.

### Keyword

> Field id: `keyword`

This field targets the keywords present in a record. These are treated as simple strings.

::: info Note for multilingual catalogs
GeoNetwork 4 supports multilingual keywords.

The keywords will show up in the correct language when viewing a record in applications such as the Datahub, but for the search fields **only the "default" labels are used** (i.e. the labels in the main language of the record).

This means that a "keyword" search filter will show values in potentially many different languages.
:::

### INSPIRE keyword

> Field id: `inspireKeyword`

This field target keywords that are part of the following INSPIRE-specific thesaurus: https://inspire.ec.europa.eu/theme.

Because such keywords are part of a controlled list, they can be shown in the correct language according to the user's preferences.

### Has spatial component

> Field id: `isSpatial`

This field offers the only two values "yes" and "no" according to whether a record contains data with a (geo-)spatial component.

### License

> Field id: `license`

This field targets the license(s) that are mentioned in a record. Note that this only works for a few well-known licenses, such as:

- Creative Commons licenses
- Open Data Commons licenses
- [Etalab Open licenses](https://www.etalab.gouv.fr/licence-ouverte-open-licence/)

Other kind of licenses will appear under the label "Unknown or absent".

### Resource type

> Field id: `resourceType`

Type of record, such as "dataset" or "service".

### Representation type

> Field id: `representationType`

Representation type of a record, such as "vector" or "raster".

### Metadata standard

> Field id: `standard`

This field targets the name of the metadata standard used to describe a record. This can for instance be "ISO 19115-3" or "ISO 19139".
