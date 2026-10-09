# Demo

You can serve demo static files to illustrate usage of web component in dedicated pages.
All demos files from this folder will be published on gh-pages beside webcomponents.
The published tree will be

```
- gh-pages
  - demo
     - eea
        - showcase 1
        - showcase 2
  - webcomponents
       gn-wc.js
```

You will need to load the webcomponents with the correct path to `gn-wc.js`

## Run

```shell script
npm run demo
```

You'll be able to test your files on `http://localhost:8001/pages/`

e.g: http://localhost:8001/pages/eea/results-list.html
