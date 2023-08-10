---
outline: deep
---

# Datahub

## Chapter 1

## Chapter 2

## Metadata pages

Each metadata has its own detailed page, made of multiple sections, described as followed.

### Keywords

The keyword section is dynamically generated from the `metadata-info` component. The metadata comes from the harvested `record.metadata` object, which contains a `keywords` array or strings. Through a test on the array's length, if the array is empty, the section will not be displayed.

### Usage and constraints

The usage and constraints section is dynamically generated from the `metadata-info` component. The metadata comes from the harvested `record.metadata` object, which contains a `constraints` array or strings. Both the usage and constraints are stored in this array. Through a test on the array's length (`hasUsage`), if the array is empty, the section will not be displayed.

A part of the section can however, in some cases, be displayed despite an empty array. In this scenario, a message will be displayed `record.metadata.noUsage` to warn the user.
