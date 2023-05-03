# Web components tools

## HTML embedder

The file [`wc-embedder.html`](wc-embedder.html) can be used to wrap a geonetwork-ui Web Component into a full HTML page,
for example to be used in an [iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe).

To use it, specify the name and attributes of the Web Component to be created when accessing the page:

```
wc-embedder.html?e=gn-dataset-view-table&a=api-url=https://dev.geo2france.fr/geonetwork/srv/api&a=primary-color=%230f4395&a=secondary-color=%238bc832&a=main-color=%23555&a=background-color=%23fdfbff
```

> Note the `#` being encoded to `%23`

The following query parameters are supported:

- `e` (single): element name, such as `gn-results-list`
- `a` (multiple): attributes, specified in the following format: `a=attribute-name=attribute-value`

The created element will be sized to take the full width and height of the page, thus allowing precise sizing when used in an iframe.

The Web Components used are the latest ones distributed on the [`wc-dist` branch](https://github.com/geonetwork/geonetwork-ui/blob/wc-dist).

The HTML Embedder is available in all docker images on the following path:

http://localhost:8080/APP_NAME/wc-embedder.html
