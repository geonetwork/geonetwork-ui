---
outline: deep
---

# Using GeoNetwork-UI Standalone Search

GeoNetwork-UI offers a mechanism similar to Web Components but which only allows you to search in a GeoNetwork catalog using its search interface.

The JS file to include is as a result much lighter, and this system is entirely appropriate if the search results coming from GeoNetwork should be used in a different UI framework.

## Use

To use the Standalone Search, you have to:

- import the Standalone Search script exported by Angular (available via jsdelivr)
- call `GNUI.init(options)` with the following options:
  - `apiUrl`: the URL of the GeoNetwork API to use
  - `textLanguage`: the language to use for labels; can be either `localStorage` (will read the language from local storage as described in [this section](../developers/i18n.md#how-the-user-interface-language-is-detected)), `browser` (will use the browser language) or a 2-char code (e.g. `en`)
  - `metadataLanguage`: identical to the [`metadata_language` configuration option](./configure.md#global)

```html
<script src="https://cdn.jsdelivr.net/gh/geonetwork/geonetwork-ui@wc-dist-v2.6.0/gn-standalone-search.js"></script>
...
<script>
  GNUI.init({
    apiUrl: 'https://www.geocat.ch/geonetwork/srv/api',
    textLanguage: 'en', //
  });
  GNUI.recordsRepository
    .search({
      filters: {
        any: 'hello',
        linkProtocol: '/OGC:WMT?S.*/',
      },
      offset: 0,
      limit: 10,
      sort: ['desc', '_score'],
      fields: ['resourceTitleObject', 'link', 'uuid'],
    })
    .subscribe({ records } => console.log(records))
</script>
```

## Publication and Versioning

The Standalone Search script is automatically built upon merges on main and for releases. These builds are made available via a jsdelivr CDN, which points at `wc-dist` branches in the github repository. There is a `wc-dist` branch for every release tag > `v2.6.0` as well as `wc-dist-main`.

You can choose the version of the Standalone Search script you wish to use by indicating the corresponding value in the script's URL e.g. `wc-dist-v2.0.0`.
