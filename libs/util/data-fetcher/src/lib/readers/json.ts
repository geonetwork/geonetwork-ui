import { BaseFileReader } from './base-file'

export class JsonReader extends BaseFileReader {
  async getLoadQuery() {
    return `
CREATE TABLE ${this.datasetId} AS SELECT * FROM read_json("${this.url}",
    maximum_object_size = 536870912 -- 500MB
);`
  }
}
