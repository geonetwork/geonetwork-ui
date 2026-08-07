import { BaseFileReader } from './base-file'

export class JsonReader extends BaseFileReader {
  async getLoadQuery() {
    return `
CREATE TABLE ${this.datasetId} AS SELECT * FROM read_json("${this.url}",
    maximum_object_size = 268435456 -- 0 x 1000 0000
);`
  }
}
