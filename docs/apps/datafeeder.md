---
outline: deep
---

# Datafeeder

"Datafeeder" is a geOrchestra's backend RESTful service to upload file based datasets and publish them to GeoServer and GeoNetwork in one shot.

The separate front-end UI service provides the wizard-like user interface to interact with this [backend](https://github.com/georchestra/georchestra/tree/master/datafeeder).

The front-end part is built with Geonetwork-UI components

## Usage

The easiest way to deploy datafeeder locally is to use the docker composition in `support-services/datafeeder`.

```shell
cd support-services/datafeeder
docker compose up -d
```

In `geonetwork-ui/` directory, run :

```shell
npx nx run datafeeder:serve
```

## Configuration

### Adding projections and encodings

The datafeeder configuration can be edited by modifying the `frontend-config.json` file in `support-services/datafeeder/datadir/datafeeder/` folder.
