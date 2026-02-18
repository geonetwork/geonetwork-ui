# Metadata quality

To help users find well documented records, a metadata quality system has been set up.

The metadata quality score shows how complete metadata is on a record, by looking up specific fields that should be present for the metadata to be considered of quality.

The system is disabled by defaut.

When the system is activated **with** the ES pipeline:

- the quality score becomes part of the indexed fields
- the search results display the score
- the search results can be sorted by score
- the record page displays the pipeline score

If it is activated but the ES pipeline is not run, then the computation will be done by the **Datahub** directly, only when the user opens a record.

## Configuration

[metadata-quality](../guide/configure.md#metadata-quality)

## ES pipeline script

[this section](../guide/deploy.md#improved-search-fields)

Look for 'GeoNetwork-UI pipeline' in `tools/pipelines/register-es-pipelines.js`

## Record kind matrix

|                  | Dataset | Service | Reuse |
| ---------------- | ------- | ------- | ----- |
| title            | X       | X       | X     |
| description      | X       | X       | X     |
| topic            | X       |         | X     |
| keywords         | X       | X       | X     |
| legalConstraints | X       | X       | X     |
| organisation     | X       |         | X     |
| contact          | X       | X       | X     |
| updateFrequency  | X       |         |       |
| sources          |         |         | X     |

For more details on the dataset/service/reuse classification, see the [classification system](./record-kind.md)

### sources

The reuse must have at least one source dataset to be considered valid.
