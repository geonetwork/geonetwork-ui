---
outline: deep
---

# Elasticsearch

## Index

## Search

GeoNetwork-UI provides multiple pathways to retrieve records based on specific criteria: **Main Search**, **Suggestion Search** (autocomplete), and **Similar Record Search**.

> **Note:** This documentation excludes search by _organization_, which functions as an exact match search.

All search requests are routed to **GeoNetwork/ElasticSearch**.

## 1. Main Search

**Query Type:** `query_string`

This is the primary search function. It queries the following fields with specific importance weightings (boosts):

| Target Field   | Boost Value |
| -------------- | ----------- |
| **Title**      | 5           |
| **Keywords**   | 4           |
| **Abstract**   | 3           |
| **Lineage**    | 2           |
| **All Fields** | 1           |
| **UUID**       | 1           |

> **Source Definition:**
>
> - `geonetwork-ui/libs/api/repository/src/lib/gn4/elasticsearch/elasticsearch.service.ts`
>   - `buildPayloadQuery`
> - `geonetwork-ui/libs/api/repository/src/lib/gn4/elasticsearch/constant.ts`
>   - `ES_QUERY_FIELDS_PRIORITY`

## 2. Suggestion Search (Autocomplete)

**Query Type:** `multi_match` (type: `bool_prefix`)

Used for autocomplete functionality. It prioritizes the title significantly but excludes general fields and lineage.

| Target Field            | Boost Value |
| ----------------------- | ----------- |
| **Title**               | 4           |
| **Abstract**            | 3           |
| **Keywords**            | 2           |
| **Resource Identifier** | 1           |

> **Source Definition:**
>
> - `geonetwork-ui/libs/api/repository/src/lib/gn4/elasticsearch/elasticsearch.service.ts`
>   - `buildAutocompletePayload`

## 3. Similar Record Search

**Query Type:** `more_like_this`

This search generates a list of related records. It operates by creating a "virtual document" containing only the specific fields listed below and comparing this virtual document against all documents indexed by ElasticSearch.

**Fields considered:**

- Title
- Abstract
- Keywords

> **Source Definition:**
>
> - `geonetwork-ui/libs/api/repository/src/lib/gn4/elasticsearch/elasticsearch.service.ts`
>   - `getRelatedRecordPayload`
