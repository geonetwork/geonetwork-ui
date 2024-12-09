---
outline: deep
---

# Metadata Editor

The **Metadata Editor** application offers a user-friendly interface to create, edit, and publish metadata records.

## Features

- A dashboard showing the records available on the platform as well as searching and sorting
- A metadata edition interface allowing the modification of various parts of a record (title, abstract, keywords, dates...)
- Create, duplicate and delete records
- Import remote records using a URL
- Keep a draft while editing a record, with the ability to rollback to the published version and discard changes

## Run & deploy

> [!IMPORTANT]
> GeoNetwork version 4.2.5 or above is required for the Metadata Editor app to function normally.

The Metadata Editor application is available as a docker image or as a ZIP archive.

### Using docker

The docker image is `geonetwork/geonetwork-ui-metadata-editor`.

See the [run guide](../guide/run#with-docker) for more information.

### Using the ZIP archive

A `metadata-editor-VERSION.zip` archive is available on every GeoNetwork-UI release: https://github.com/geonetwork/geonetwork-ui/releases

See the [run guide](../guide/run#from-the-zip-archive) for more information.

### Deployment

Please refer to the [general deploy guide](../guide/deploy.md) to learn how to deploy GeoNetwork-UI applications.

## Supported metadata schemas

The editor currently support the following schemas:

- ISO 19139
- ISO 19115-3
- DCAT-AP _(support for writing values in a record is limited for now)_

Any record written in one of those schemas can be opened and modified in the edition interface.

When a record is created it uses the preferred schema, currently ISO 19115-3.

## How it works

The Metadata Editor relies on the GeoNetwork CRUD (create/read/update/delete) API for manipulating records. The records XML is read and modified fully in the browser to allow for a reactive experience as well as offering more possibilities for supported schemas.

## Multilingual support

> Still under development

## Concurrent edition

> Still under development

## Configuring the edition interface

> Still under development

<!--

THIS IS NOT ACCURATE ANYMORE

## My organization

The "my organization" tab contains filtered records owned by the organization of the logged in user. Note that this page will not display any records if no user is logged in.
The page is made of :

- The organization name and logo, fetched from `organisations$` in the `OrganizationServiceInterface`.
- A table with the filtered records. The table is from the component `md-editor-records-list`, which does the fetching of the records.
- Two links :
  - The first link is the count of published records for this organization. It leads to the datahub, where the filter by organization will be activated to only show the user's organization. The filter is set through the URL directly with the name from `organisations$`.
  - The second link is the count of users for this organization. It leads to a new page in the dashboard. The page is also made of the organization's name and logo, and of a table presenting the users and their details. These users are fetched from the observables `user$` (logged in user), and `allUsers$` (all users of geonetwork) in the `AuthService`. `allUsers$` are then filtered by their organization to be displayed here. The table in this page is also from the component `md-editor-records-list`, which detects if an input `users` (containing the list of filtered users) was received and creates the table accordingly.

It's important to know that a user with an organization must be logged in for this component to work. If not, or in the case where the organization doesn't own any records, a message will be displayed instead of the table, to inform the user.
-->
