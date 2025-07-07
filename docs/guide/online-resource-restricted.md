# Online resource with restricted access

It may happen that a record is published with links to online resources protected by some restrictions.

In that case, if the Datahub doesn't have the rights to access the source for the preview, the user might be mislead and think the source has been wrongly configured.

To prevent this, add an anchor to the description of the online resource:

- ISO19139

```
<gmd:description>
  <gmx:Anchor xlink:href="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_RestrictionCode_restricted">Restricted service, access not allowed!</gmx:Anchor>
</gmd:description>
```

- ISO19115-3

```
<gmd:description>
  <gmx:Anchor xlink:href="https://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#MD_RestrictionCode_restricted">Restricted service, access not allowed!</gmx:Anchor>
</gmd:description>
```

The content of the anchor will be displayed to the user instead of loading the source data.
