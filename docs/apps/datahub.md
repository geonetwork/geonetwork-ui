---
outline: deep
---

# Datahub

## Pre-requesite

### Useefeedbacks

The user feedbacks section will not work with geonetwork 4.2.2 if you don't set a proper mail configuration:

In the legacy geonetwork-ui, log as admin, then go in "Admin console" and select "Settings", then add a proper value in the "SMTP host" field e.g. `admin@geonetwork.com` (it doesn't need to be a real SMTP server but it has to be a valid adress) then click on the "Save settings" button in the top right corner of that page and now the userfeedbacks should work.

## Metadata pages

Each metadata has its own detailed page, made of multiple sections, described as followed.

The following sections are dynamically generated from the [metadata info component](https://github.com/geonetwork/geonetwork-ui/tree/main/libs/ui/elements/src/lib/metadata-info) component.

### Abstract

The abstract section is based on the metadata attribute `abstract`.

### Keywords

The keywords section is based on the metadata attribute `keywords`.

### Lineage

The lineage section is based on the metadata attribute `lineage`.

### Usage and constraints

The usage and constraints section is based on the metadata attribute `constraints`.
