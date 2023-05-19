import 'whatwg-fetch'
import { environment } from './environments/environment'

const SETTING_API = `${environment.apiUrl}/config/frontend`

class Settings {
  encodings = [
    {
      label: 'UTF-8',
      value: 'UTF-8',
    },
    {
      label: 'ISO-8859-1',
      value: 'ISO-8859-1',
    },
  ]
  projections = [
    {
      label: 'WGS84',
      value: 'EPSG:4326',
    },
    {
      label: 'Lambert 93',
      value: 'EPSG:2154',
    },
    {
      label: 'Web Mercator',
      value: 'EPSG:3857',
    },
  ]
  scales = [
    { value: '10000', label: '1:10000' },
    { value: '25000', label: '1:25000' },
    { value: '50000', label: '1:50000' },
    { value: '100000', label: '1:100000' },
  ]
  thesaurusUrl = `/geonetwork/srv/api/registries/vocabularies/search?type=CONTAINS&thesaurus=external.theme.inspire-theme&rows=200&q=$\{q}&uri=**&lang=$\{lang}`
  maxFileUploadSize = '-1'
  init() {
    return fetch(SETTING_API)
      .then((response) => response.json())
      .then((json) => {
        Object.assign(this, json)
      })
  }
}

const SETTINGS = new Settings()
export default SETTINGS
