import { BaseFileReader } from './base-file'

export class CsvReader extends BaseFileReader {
  async getLoadQuery() {
    // first we get a list of columns hich have a detected type of VARCHAR
    // then we make sure that for those columns, we don't cast an empty string to null; instead we want to keep the empty string
    return `
SET VARIABLE strColumns = (SELECT list(name) FROM (SELECT unnest(Columns, recursive := true) FROM sniff_csv("${this.url}")) WHERE type = 'VARCHAR');
CREATE TABLE ${this.datasetId} AS SELECT * FROM read_csv("${this.url}",
  strict_mode = false,
  force_not_null = getvariable('strColumns'),
  auto_type_candidates = ['NULL', 'BOOLEAN', 'INTEGER', 'DOUBLE', 'DATE', 'VARCHAR']
);`
  }
}
