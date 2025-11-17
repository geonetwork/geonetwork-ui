# Pipeline developement

## Testing the Pipeline

You can test the pipeline and Elasticsearch results directly in Kibana by following these steps:

### 1. Launch Kibana

```bash
cd support-services
docker compose up kibana
```

### 2. Access Kibana Dev Tools

Navigate to [http://localhost:5601/app/dev_tools#/console](http://localhost:5601/app/dev_tools#/console)

### 3. Register the Pipeline

Before testing, register the pipeline:

```bash
cd tools
node pipelines/register-es-pipelines.js register --host=http://localhost:9200 --records-index=gn-records
```

### 4. Apply the Pipeline

In the Kibana Dev Tools console, execute:

```json
POST /gn-records/_update_by_query?pipeline=geonetwork-ui
{
    "query": {
        "match_all": {}
    }
}
```

### 5. Verify Results

Check e.g. the `qualityScore` value with the following queries:

```json
GET /gn-records/_doc/e27e7006-fdf9-4004-b6c5-af2a5a5c025c
GET /gn-records/_doc/00b22798-ec8e-4500-89e8-90eeeda45919
```
