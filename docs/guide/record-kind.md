---
outline: deep
---

# Classification System

While GeoNetwork natively supports metadata filtering by resource type, GeoNetwork-UI introduces a specialized classification logic. By analyzing indexed fields and resource types, the interface dynamically adapts the display and some logic based on three distinct categories:

## The "Dataset" Category

This encompasses core data resources. It includes records typed as `dataset` (excluding maps) and `series`, as well as `featureCatalog` (when actually a dataset) instances representing physical data collections. Essentially, if the record describes a discrete spatial data unit or its schema, it is classified here.

## The "Service" Category

This category provides a direct mapping to the service resource type. It identifies web services (such as WMS, WFS, or WMTS) that provide functional access to spatial data rather than the data files themselves.

## The "Reuse" Category

This category identifies instances where data has been transformed or integrated into a new product:

- **Maps:** Records where datasets have been styled, layered, and contextualized for visualization.
- **Applications:** Instances where raw data has been processed through specific logic to provide high-level functionality, such as network analysis, geocoding, or routing services.

> **Note:** Map classification is unique because it relies on two indexed fields in an exclusive manner: `dataset` and `document` records are only classified as **Reuse** if their `cl_presentationForm` is set to `mapDigital` or `mapHardCopy`.

# Impacts

## Search and Results

The search functionality in both the **DataHub** and the **Metadata-Editor** serves as the primary entry point to the catalog.

The Elasticsearch query is constructed by combining all active search filters. These filters are **restrictive** (using the `AND` operator) between different categories, while multiple values within a single filter are **inclusive** (using the `OR` operator).

The **record kind** is treated as one of these standard filters, following specific rules:

- **Dataset:**
  - `resourceType`: `dataset` or `document` (where `cl_presentationForm` is **not** a map).
  - `series`.
- **Service:**
  - Directly maps to the `service` resource type.
- **Reuse:**
  The "reuse only" search logic is more intricate due to the dependency between `resourceType` and `cl_presentationForm`. The process involves:
  - Generating a base query for all relevant reuse resource types.
  - Applying an explicit restrictive filter to handle the exact cross-filter logic (e.g., isolating `dataset` or `document` records specifically tagged as maps).

## DataHub Route

Routes are determined based on the Elasticsearch results, specifically utilizing the `resourceType` and `cl_presentationForm` indexed fields.

## DataHub Sections and Fields

The distinction between sections and available fields is derived directly from the active route.

For more details on sections and fields, see [Datahub - sections and fields](../apps/datahub-sections-fields.md)

## Quality Score Pipeline

[Metadata Quality](../guide/metadata-quality.md) system

The pipeline also utilizes indexed fields but follows a procedural, cascading logic (from specific to generic):

1.  **Service:** Identified via an exact match.
2.  **Reuse:** Identified by type, including the special case where `dataset` or `document` records are reclassified due to their `cl_presentationForm`.
3.  **Dataset:** Any remaining records default to this category.

## Metadata-Editor

While all records are visible within the editor, only those classified as **datasets** are eligible for editing.
