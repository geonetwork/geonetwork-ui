import { program } from 'commander'

program
  .name('register-es-pipelines')
  .description(
    'Lets you register ElasticSearch pipelines to improve the search experience in GeoNetwork-UI. Trigger a reindexation of the catalog after using.'
  )
program
  .command('register')
  .description('Register pipelines')
  .option('--host <value>', 'ElasticSearch host', 'http://localhost:9200')
  .option('--username <value>', 'ElasticSearch user', '')
  .option('--password <value>', 'ElasticSearch password', '')
  .option(
    '--records-index <value>',
    'Name of the index used by GeoNetwork for records',
    'gn-records'
  )
  .action((options) => {
    const esUrl = options.host.replace(/\/$/, '') // remove trailing slash if any
    const recordsIndex = options.recordsIndex
    const username = options.username
    const password = options.password
    const authHeader =
      options.username && options.password
        ? 'Basic ' + btoa(username + ':' + password)
        : ''
    registerPipelines(esUrl, recordsIndex, authHeader)
  })
program
  .command('clear')
  .description('Clear all registered pipelines')
  .option(
    '--host <value>',
    'ElasticSearch host, default is http://localhost:9090',
    'http://localhost:9200'
  )
  .option('--username <value>', 'ElasticSearch user', '')
  .option('--password <value>', 'ElasticSearch password', '')
  .action((options) => {
    const esUrl = options.host.replace(/\/$/, '') // remove trailing slash if any
    const username = options.username
    const password = options.password
    const authHeader =
      options.username && options.password
        ? 'Basic ' + btoa(username + ':' + password)
        : ''
    clearPipelines(esUrl, authHeader)
  })

program.parse(process.argv)

const VERSION = 102 // increment on changes

const GEONETWORK_UI_PIPELINE = {
  description: 'GeoNetwork-UI pipeline',
  version: VERSION,
  processors: [
    {
      // compute the metadata quality score
      script: {
        lang: 'painless',
        source: `
int total=8;
int totalDataset=8;
int totalService=6;
int totalReuse=8;
int ok=0;
boolean isDataset=false;
boolean isService=false;
boolean isReuse=false;
if (ctx.resourceType != null && ctx.resourceType.size() > 0) {
  if (ctx.resourceType[0]=='dataset'||ctx.resourceType[0]=='series'||ctx.resourceType[0]=='featureCatalog') {
    isDataset = true;
  }
  if (ctx.resourceType[0]=='service') {
    isService = true;
  }
  if (ctx.resourceType[0]=='interactiveMap'||ctx.resourceType[0]=='map'||ctx.resourceType[0]=='map/static'||ctx.resourceType[0]=='map/interactive'||ctx.resourceType[0]=='map-interactive'||ctx.resourceType[0]=='map-static'||ctx.resourceType[0]=='mapDigital'||ctx.resourceType[0]=='staticMap') {
    isReuse = true;
  }
} else {
 isDataset=true;
}
if(ctx.resourceTitleObject != null && ctx.resourceTitleObject.default != null && ctx.resourceTitleObject.default != '') {
  ok++
}
if(ctx.resourceAbstractObject != null && ctx.resourceAbstractObject.default != null && ctx.resourceAbstractObject.default != '') {
  ok++
}
// this checks for single-language Organizations (GN 4.2.2)
if(!isService && ctx.contact != null && ctx.contact.length > 0 && ctx.contact[0].organisation != null && ctx.contact[0].organisation != '') {
  ok++
}
// this checks for multilingual Organizations (GN 4.2.3+)
if(!isService && ctx.contact != null && ctx.contact.length > 0 && ctx.contact[0].organisationObject != null && ctx.contact[0].organisationObject.default != null && ctx.contact[0].organisationObject.default != '') {
  ok++
}
if(ctx.contact != null && ctx.contact.length > 0 && ctx.contact[0].email != null && ctx.contact[0].email != '') {
  ok++
}
if(!isService && ctx.cl_topic != null && ctx.cl_topic.length > 0) {
  ok++
}
if (ctx.allKeywords != null && !ctx.allKeywords.isEmpty()) {
  for (def thesaurus : ctx.allKeywords.values()) {
    if (thesaurus != null && 
        thesaurus.keywords != null && 
        thesaurus.keywords.length > 0) {
      ok++;
      break;
    }
  }
}
if(isDataset && ctx.cl_maintenanceAndUpdateFrequency != null && ctx.cl_maintenanceAndUpdateFrequency.length > 0) {
  ok++
}
if((ctx.MD_LegalConstraintsUseLimitationObject != null && ctx.MD_LegalConstraintsUseLimitationObject.length > 0) ||
   (ctx.MD_LegalConstraintsOtherConstraintsObject != null && ctx.MD_LegalConstraintsOtherConstraintsObject.length > 0)) {
  ok++
}
if(isService && ctx.link != null){
  for (link in ctx.link) {
    if (
      link != null &&
      link.urlObject != null &&
      link.urlObject.default != null &&
      link.urlObject.default.toLowerCase().contains('capabilities')
    ) {
      ok++;
      break;
    }
  }
}
if(isReuse && ctx.recordLink != null){
  for (link in ctx.recordLink) {
    if (
      link != null &&
      link.origin != null &&
      link.origin == 'catalog' &&
      link.type != null &&
      link.type == 'sources' &&
      link.url != null &&
      link.url != ''
    ) {
      ok++;
      break;
    }
  }
}
if(isDataset) {
  total=totalDataset;
}
if(isService) {
  total=totalService;
}
if(isReuse) {
  total=totalReuse;
}
ctx.qualityScore = ok * 100 / total;`,
      },
    },
    {
      // generate human-readable data formats
      script: {
        lang: 'painless',
        source: `
if (!ctx.containsKey('format')) return;
if (ctx.format == null) return;
ctx.originalFormat = ctx.format;
for(int i = ctx.format.length - 1; i >= 0; i--) {
  String format = ctx.format[i].toLowerCase();
  if (format.contains('shp') || format.contains('shapefile')) {
    ctx.format[i] = 'ESRI Shapefile'
  } else if (format.contains('ogc:w') || format.contains('esri:rest') || format.contains('tms')) {
    ctx.format[i] = 'Service'
  } else if (format.contains('pdf')) {
    ctx.format[i] = 'PDF'
  } else if (format.contains('png') || format.contains('jpg') || format.contains('jpeg') || format.contains('bmp')) {
    ctx.format[i] = 'Image'
  } else if (format.contains('excel') || format.contains('xls') || format.contains('vnd.oasis.opendocument.spreadsheet') || format.contains('vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
    ctx.format[i] = 'Excel'
  } else if (format.contains('geopackage') || format.contains('gpkg')) {
    ctx.format[i] = 'Geopackage'
  } else if (format.contains('postgis')) {
    ctx.format[i] = 'PostGIS'
  } else if (format.contains('gml')) {
    ctx.format[i] = 'GML'
  } else if (format.contains('kml')) {
    ctx.format[i] = 'KML'
  } else if (format.contains('xml')) {
    ctx.format[i] = 'XML'
  } else if (format.contains('html')) {
    ctx.format[i] = 'HTML'
  } else if (format.contains('geo+json') || format.contains('geojson')) {
    ctx.format[i] = 'GeoJSON'
  } else if (format.contains('json')) {
    ctx.format[i] = 'JSON'
  } else if (format.contains('csv')) {
    ctx.format[i] = 'CSV'
  } else if (format.contains('rtf')) {
    ctx.format[i] = 'RTF'
  } else if (format.contains('text')) {
    ctx.format[i] = 'Text'
  } else if (format.contains('zip')) {
    ctx.format[i] = 'ZIP'
  } else if (format != null) {
    ctx.format.remove(i);
    // uncomment this to show unrecognized formats
    // ctx.format[i] = 'unknown: ' + ctx.format[i];
  }
}`,
      },
    },
  ],
}

async function registerPipeline(esHost, name, payload, authHeader) {
  console.log(`adding ${name} pipeline...`)

  await fetch(`${esHost}/_ingest/pipeline/${name}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      Authorization: authHeader,
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then((result) => {
      if (result.acknowledged !== true) {
        console.error(result)
        throw new Error('something went wrong')
      }
    })

  console.log(`${name} pipeline was successfully registered!`)
}

async function clearPipeline(esHost, name, authHeader) {
  console.log(`clearing ${name} pipeline...`)

  await fetch(`${esHost}/_ingest/pipeline/${name}`, {
    method: 'DELETE',
    headers: {
      Authorization: authHeader,
    },
  })
    .then((resp) => resp.json())
    .then((result) => {
      if (result.acknowledged !== true) {
        console.error(result)
        throw new Error('something went wrong')
      }
    })

  console.log(`${name} pipeline was successfully cleaned!`)
}

async function setDefaultPipeline(esHost, recordsIndex, name, authHeader) {
  console.log(`setting ${name} as default pipeline...`)

  await fetch(`${esHost}/${recordsIndex}/_settings`, {
    method: 'PUT',
    body: JSON.stringify({ 'index.default_pipeline': name }),
    headers: {
      Authorization: authHeader,
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then((result) => {
      if (result.acknowledged !== true) {
        console.error(result)
        throw new Error('something went wrong')
      }
    })

  console.log(`${name} pipeline was successfully set as default!`)
}

async function registerPipelines(esHost, recordsIndex, authHeader) {
  console.log('querying currently registered pipelines...')

  const pipelines = await fetch(`${esHost}/_ingest/pipeline`, {
    headers: {
      Authorization: authHeader,
    },
  }).then((resp) => resp.json())

  const names = Object.keys(pipelines)
  names.forEach((name) => {
    console.log(`
 > ${name}`)
    console.log(`   ${pipelines[name].description}`)
  })

  console.log('')
  await registerPipeline(
    esHost,
    'geonetwork-ui',
    GEONETWORK_UI_PIPELINE,
    authHeader
  )

  console.log('')
  await setDefaultPipeline(esHost, recordsIndex, 'geonetwork-ui', authHeader)
}

async function clearPipelines(esHost) {
  const pipelines = await fetch(`${esHost}/_ingest/pipeline`).then((resp) =>
    resp.json()
  )

  if (!('geonetwork-ui' in pipelines)) {
    console.log('No geonetwork-ui pipelines found, exiting')
    return
  }

  await clearPipeline(esHost, 'geonetwork-ui')
}
