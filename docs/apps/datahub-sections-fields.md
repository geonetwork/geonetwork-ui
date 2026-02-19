---
outline: deep
---

# Datahub - sections and fields

## Generic sections

### Linked records

The section about linked records is displayed only when the record's ES indexation contains links of type `source` or `hassource` to other records.

These links are indexed when the underlying records contains lineage information:

- iso 19139

```
   <gmd:dataQualityInfo>
      <gmd:DQ_DataQuality>
         <gmd:lineage>
            <gmd:LI_Lineage>
               <gmd:source uuidref="e5c25144-6ea5-4985-a4cb-d2e2568b13d2"
                           xlink:title="GSIGNGPF-23 - source dataset for a map - Copy of template Template for Vector data in ISO19139 (preferred!) created at 2025-04-17T13:03:02.194Z[Etc/UTC]"
                           xlink:href="http://localhost:8080/geonetwork/srv/eng/csw?service=CSW&amp;request=GetRecordById&amp;version=2.0.2&amp;outputSchema=http://www.isotc211.org/2005/gmd&amp;elementSetName=full&amp;id=e5c25144-6ea5-4985-a4cb-d2e2568b13d2"/>
            </gmd:LI_Lineage>
         </gmd:lineage>
      </gmd:DQ_DataQuality>
  </gmd:dataQualityInfo>
```

- iso 19115-3

```
  <mdb:resourceLineage>
      <mrl:LI_Lineage>
         [...]
         <mrl:source uuidref="ee965118-2416-4d48-b07e-bbc696f002c2"
                     xlink:title="SCoT (Schéma de cohérence territoriale) en région Hauts-de-France"
                     xlink:href="http://localhost:8080/geonetwork/srv/api/records/ee965118-2416-4d48-b07e-bbc696f002c2"/>
      </mrl:LI_Lineage>
  </mdb:resourceLineage>
```

The `source` elements can be repeated as many times as necessary.

A source containing only an `uuidref` is still valid and will be indexed.

The reverse link will be created as long as the `uuidref` points to an existing record in the catalog.

## Dataset

### Feature catalog

There are two ways of adding a feature catalog to a dataset record:

- by directly describing the feature catalog inside the record - ISO19115-3
- by linking to a record describing only the feature catalog - ISO19110

Only the first feature catalog of a record is used as of now.

A feature catalog may contain several feature types. Each one will be displayed with it's definition and abstract.

Each attribute will then show various informations:

- Type (type)
- Name (memberName)
- Description (definition)
- Values (listed values)

Note that the attribute definition will be used instead of the technical names (=memberName) in the preview section, if they are properly defined in the feature catalog.

## Service

### Capabilities

The capabilities section of a service is displayed only if a link to an OGC WFS/WMS/WMTS service or an OGCAPI Feature link is found (mind the protocol).

The `ogc-client` library is used to parse the capabilities.

## Reuse

In the **Datahub**, the concept of reuse covers applications and maps, both interactive and static.

### Header link

In the header of a reuse page, the first link of the record that is not an API or a download link is displayed as the main link.
