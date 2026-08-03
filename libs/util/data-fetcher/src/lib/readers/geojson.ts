import { BaseFileReader } from './base-file'

export class GeojsonReader extends BaseFileReader {
  async getLoadQuery() {
    return `
CREATE TABLE ${this.datasetId} AS SELECT * FROM st_read("${this.url}",
    allowed_drivers = ['GeoJSON']
);`
  }
}
