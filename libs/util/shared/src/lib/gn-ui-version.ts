// @ts-expect-error TS2856 -- Import attributes provoke an error; should be fixed when upgrading Typescript
import packageJson from '../../../../../package.json' with { type: 'json' }

export const GEONETWORK_UI_VERSION = packageJson.version

export const GEONETWORK_UI_TAG_NAME =
  GEONETWORK_UI_VERSION.split('-')[1] === 'dev'
    ? 'main'
    : `v${packageJson.version}`
