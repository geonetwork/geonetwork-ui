export const ITEMS_FIXTURE = [
  {
    id: 'S2C_20251029T071221025000Z_38LQH_0511_afbd406add',
    bbox: [
      46.86291158102522, -16.36092517176475, 47.89922475984138,
      -15.357911490883158,
    ],
    type: 'Feature',
    links: [
      {
        rel: 'collection',
        type: 'application/json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/collections/sentinel2-l2a-sen2cor',
      },
      {
        rel: 'parent',
        type: 'application/json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/collections/sentinel2-l2a-sen2cor',
      },
      {
        rel: 'root',
        type: 'application/json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/',
      },
      {
        rel: 'self',
        type: 'application/geo+json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/collections/sentinel2-l2a-sen2cor/items/S2C_20251029T071221025000Z_38LQH_0511_afbd406add',
      },
    ],
    assets: {
      QL: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/S2C_MSIL2A_20251029T071221_N0511_R020_T38LQH_20251029T100609-ql.jpg',
        type: 'text/plain',
        roles: ['thumbnail', 'overview'],
        title: 'Quicklook',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      AOT: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/T38LQH_20251029T071221_AOT_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['gsd:10m', 'data'],
        title: 'Aerosol optical thickness (AOT)',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 142.66166614282923,
              stddev: 8.961817856614603,
              maximum: 234.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 699960.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B01: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/T38LQH_20251029T071221_B01_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:60m', 'data'],
        title: 'Band 1 - Coastal aerosol - 60m',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 1591.2106300383102,
              stddev: 225.95869899049828,
              maximum: 9512.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 699960.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B02: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/T38LQH_20251029T071221_B02_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 2 - Blue - 10m',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 1713.5494946063025,
              stddev: 300.99291272334403,
              maximum: 9235.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 699960.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B03: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/T38LQH_20251029T071221_B03_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 3 - Green - 10m',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2063.9967723303776,
              stddev: 399.1768910785376,
              maximum: 8793.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 699960.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B04: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/T38LQH_20251029T071221_B04_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 4 - Red - 10m',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2558.4008613001047,
              stddev: 625.9331934449615,
              maximum: 8948.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 699960.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B05: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/T38LQH_20251029T071221_B05_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 5 - Vegetation red edge 1 - 20m',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2951.876247420229,
              stddev: 639.8423130787368,
              maximum: 9614.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 699960.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B06: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/T38LQH_20251029T071221_B06_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 6 - Vegetation red edge 2 - 20m',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3259.433204810273,
              stddev: 654.0494748947369,
              maximum: 9424.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 699960.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B07: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/T38LQH_20251029T071221_B07_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 7 - Vegetation red edge 3 - 20m',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3428.7777249333312,
              stddev: 695.1470061212835,
              maximum: 9174.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 699960.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B08: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/T38LQH_20251029T071221_B08_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 8 - NIR - 10m',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3557.1398673269177,
              stddev: 751.1504752798652,
              maximum: 8995.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 699960.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B09: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/T38LQH_20251029T071221_B09_60m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:60m', 'data'],
        title: 'Band 9 - Water vapor - 60m',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [1830, 1830],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3715.20753614022,
              stddev: 743.6936464813383,
              maximum: 16740.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          60.0, 0.0, 699960.0, 0.0, -60.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B11: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/T38LQH_20251029T071221_B11_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 11 - SWIR (1.6) - 20m',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 4293.1699486265015,
              stddev: 1044.9801549524539,
              maximum: 9149.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 699960.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B12: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/T38LQH_20251029T071221_B12_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 12 - SWIR (2.2) - 20m',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3384.9759231579305,
              stddev: 819.7256078575197,
              maximum: 13465.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 699960.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B8A: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/T38LQH_20251029T071221_B08_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 8A - Vegetation red edge 4 - 20m',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3557.1398673269,
              stddev: 751.15047527987,
              maximum: 8995.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 699960.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      SCL: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/T38LQH_20251029T071221_SCL_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['gsd:60m', 'data'],
        title: 'Scene classfication map (SCL)',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 1.0,
            nodata: 0.0,
            offset: 0.0,
            sampling: 'area',
            data_type: 'uint8',
            statistics: {
              mean: 4.9270387359836905,
              stddev: 0.4281182274141967,
              maximum: 10.0,
              minimum: 2.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 699960.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'classification:classes': [
          {
            name: 'no_data',
            value: 0,
            nodata: true,
            percentage: 0.559776,
          },
          {
            name: 'saturated_or_defective',
            value: 1,
            percentage: 0.0,
          },
          {
            name: 'dark_area_pixels',
            value: 2,
            percentage: 0.053571,
          },
          {
            name: 'cloud_shadows',
            value: 3,
            percentage: 0.068882,
          },
          {
            name: 'vegetation',
            value: 4,
            percentage: 12.15067,
          },
          {
            name: 'not_vegetated',
            value: 5,
            percentage: 84.382302,
          },
          {
            name: 'water',
            value: 6,
            percentage: 2.702474,
          },
          {
            name: 'unclassified',
            value: 7,
            percentage: 0.423611,
          },
          {
            name: 'cloud_medium_probability',
            value: 8,
            percentage: 0.141275,
          },
          {
            name: 'cloud_high_probability',
            value: 9,
            percentage: 0.072249,
          },
          {
            name: 'thin_cirrus',
            value: 10,
            percentage: 0.004961,
          },
          {
            name: 'snow',
            value: 11,
            percentage: 0.0,
          },
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      WVP: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/T38LQH_20251029T071221_WVP_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['gsd:10m', 'data'],
        title: 'Water vapour (WVP)',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2044.5724235757787,
              stddev: 289.15161120879196,
              maximum: 3835.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 699960.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'safe-manifest': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/manifest.safe',
        type: 'text/plain',
        roles: ['metadata'],
        title: 'SAFE manifest',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'granule-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/MTD_TL.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'Granule metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'inspire-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/INSPIRE.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'INSPIRE metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'product-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/MTD_MSIL2A.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'Product metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'datastrip-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/MTD_DS.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'Datastrip metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [46.86291158102522, -16.36092517176475],
          [47.89922475984138, -16.36092517176475],
          [47.89922475984138, -15.357911490883158],
          [46.86291158102522, -15.357911490883158],
          [46.86291158102522, -16.36092517176475],
        ],
      ],
    },
    collection: 'sentinel2-l2a-sen2cor',
    properties: {
      created: '2025-10-29T12:19:13.514349Z',
      datetime: '2025-10-29T07:12:21.025000Z',
      's2:mgrs_tile': '38LQH',
      'eo:snow_cover': 0.0,
      'eo:cloud_cover': 0.22,
      'sat:orbit_state': 'descending',
      'processing:level': 'L2',
      'processing:version': '05.11',
      'production:origins': {
        in_ts: {
          ids: ['S2C_MSIL2A_20251029T071221_N0511_R020_T38LQH_20251029T100609'],
          endpoint: 'https://stac.dataspace.copernicus.eu/v1',
          collection: 'sentinel-2-l2a',
        },
      },
      'production:version': '0.2.1',
      'sat:absolute_orbit': 5996,
      'sat:relative_orbit': 20,
      'processing:datetime': '2025-10-29T10:06:09.000000Z',
      'processing:facility': 'ESA',
      'processing:software': {
        eometadatatool: '251021130925+dirty',
      },
      's2:water_percentage': 2.702474,
      's2:vegetation_percentage': 12.15067,
      's2:thin_cirrus_percentage': 0.004961,
      's2:cloud_shadow_percentage': 0.068882,
      's2:nodata_pixel_percentage': 0.559776,
      's2:unclassified_percentage': 0.423611,
      's2:high_proba_clouds_percentage': 0.072249,
      's2:medium_proba_clouds_percentage': 0.141275,
      'sat:platform_international_designator': '2024-157A',
    },
    stac_version: '1.1.0',
    stac_extensions: [
      'https://stac-extensions.github.io/eo/v1.1.0/schema.json',
      'https://stac-extensions.github.io/sat/v1.0.0/schema.json',
      'https://stac-extensions.github.io/processing/v1.2.0/schema.json',
      'https://stac-extensions.github.io/sentinel-2/v1.0.0/schema.json',
      'https://forge.inrae.fr/teledec/stac-extensions/schemas/-/raw/main/production/v1.1.0/schema.json',
      'https://stac-extensions.github.io/raster/v1.1.0/schema.json',
      'https://stac-extensions.github.io/projection/v2.0.0/schema.json',
      'https://stac-extensions.github.io/classification/v2.0.0/schema.json',
    ],
  },
  {
    id: 'S2C_20251029T071221025000Z_38LPH_0511_badb671b26',
    bbox: [
      45.93177460997931, -16.367164183137394, 46.96413305405615,
      -15.36802063786074,
    ],
    type: 'Feature',
    links: [
      {
        rel: 'collection',
        type: 'application/json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/collections/sentinel2-l2a-sen2cor',
      },
      {
        rel: 'parent',
        type: 'application/json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/collections/sentinel2-l2a-sen2cor',
      },
      {
        rel: 'root',
        type: 'application/json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/',
      },
      {
        rel: 'self',
        type: 'application/geo+json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/collections/sentinel2-l2a-sen2cor/items/S2C_20251029T071221025000Z_38LPH_0511_badb671b26',
      },
    ],
    assets: {
      QL: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/S2C_MSIL2A_20251029T071221_N0511_R020_T38LPH_20251029T100609-ql.jpg',
        type: 'text/plain',
        roles: ['thumbnail', 'overview'],
        title: 'Quicklook',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      AOT: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/T38LPH_20251029T071221_AOT_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['gsd:10m', 'data'],
        title: 'Aerosol optical thickness (AOT)',
        'proj:bbox': [600000.0, 8190220.0, 709800.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 128.5875811249324,
              stddev: 7.340447442000589,
              maximum: 150.0,
              minimum: 112.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [600000.0, 8190220.0],
              [709800.0, 8190220.0],
              [709800.0, 8300020.0],
              [600000.0, 8300020.0],
              [600000.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 600000.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B01: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/T38LPH_20251029T071221_B01_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:60m', 'data'],
        title: 'Band 1 - Coastal aerosol - 60m',
        'proj:bbox': [600000.0, 8190220.0, 709800.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 1682.9326916576529,
              stddev: 221.9788521317938,
              maximum: 8769.0,
              minimum: 918.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [600000.0, 8190220.0],
              [709800.0, 8190220.0],
              [709800.0, 8300020.0],
              [600000.0, 8300020.0],
              [600000.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 600000.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B02: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/T38LPH_20251029T071221_B02_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 2 - Blue - 10m',
        'proj:bbox': [600000.0, 8190220.0, 709800.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 1764.8414768117902,
              stddev: 288.1392893107071,
              maximum: 8680.0,
              minimum: 1014.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [600000.0, 8190220.0],
              [709800.0, 8190220.0],
              [709800.0, 8300020.0],
              [600000.0, 8300020.0],
              [600000.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 600000.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B03: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/T38LPH_20251029T071221_B03_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 3 - Green - 10m',
        'proj:bbox': [600000.0, 8190220.0, 709800.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2009.6587429015683,
              stddev: 404.15161723309956,
              maximum: 8412.0,
              minimum: 1054.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [600000.0, 8190220.0],
              [709800.0, 8190220.0],
              [709800.0, 8300020.0],
              [600000.0, 8300020.0],
              [600000.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 600000.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B04: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/T38LPH_20251029T071221_B04_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 4 - Red - 10m',
        'proj:bbox': [600000.0, 8190220.0, 709800.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2313.6449685640887,
              stddev: 669.6088168169688,
              maximum: 8336.0,
              minimum: 1068.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [600000.0, 8190220.0],
              [709800.0, 8190220.0],
              [709800.0, 8300020.0],
              [600000.0, 8300020.0],
              [600000.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 600000.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B05: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/T38LPH_20251029T071221_B05_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 5 - Vegetation red edge 1 - 20m',
        'proj:bbox': [600000.0, 8190220.0, 709800.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2607.0498833829097,
              stddev: 784.2658902236108,
              maximum: 9056.0,
              minimum: 1094.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [600000.0, 8190220.0],
              [709800.0, 8190220.0],
              [709800.0, 8300020.0],
              [600000.0, 8300020.0],
              [600000.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 600000.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B06: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/T38LPH_20251029T071221_B06_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 6 - Vegetation red edge 2 - 20m',
        'proj:bbox': [600000.0, 8190220.0, 709800.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2816.5339119118444,
              stddev: 891.411575599373,
              maximum: 8779.0,
              minimum: 1061.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [600000.0, 8190220.0],
              [709800.0, 8190220.0],
              [709800.0, 8300020.0],
              [600000.0, 8300020.0],
              [600000.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 600000.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B07: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/T38LPH_20251029T071221_B07_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 7 - Vegetation red edge 3 - 20m',
        'proj:bbox': [600000.0, 8190220.0, 709800.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2941.0435032449973,
              stddev: 964.7855772467033,
              maximum: 8484.0,
              minimum: 1057.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [600000.0, 8190220.0],
              [709800.0, 8190220.0],
              [709800.0, 8300020.0],
              [600000.0, 8300020.0],
              [600000.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 600000.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B08: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/T38LPH_20251029T071221_B08_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 8 - NIR - 10m',
        'proj:bbox': [600000.0, 8190220.0, 709800.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3010.241988912926,
              stddev: 1019.087585655456,
              maximum: 9132.0,
              minimum: 1075.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [600000.0, 8190220.0],
              [709800.0, 8190220.0],
              [709800.0, 8300020.0],
              [600000.0, 8300020.0],
              [600000.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 600000.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B09: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/T38LPH_20251029T071221_B09_60m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:60m', 'data'],
        title: 'Band 9 - Water vapor - 60m',
        'proj:bbox': [600000.0, 8190220.0, 709800.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [1830, 1830],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3150.12326710017,
              stddev: 1076.249264362862,
              maximum: 16656.0,
              minimum: 1098.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [600000.0, 8190220.0],
              [709800.0, 8190220.0],
              [709800.0, 8300020.0],
              [600000.0, 8300020.0],
              [600000.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          60.0, 0.0, 600000.0, 0.0, -60.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B11: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/T38LPH_20251029T071221_B11_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 11 - SWIR (1.6) - 20m',
        'proj:bbox': [600000.0, 8190220.0, 709800.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3692.2623969037318,
              stddev: 1461.725859275039,
              maximum: 12845.0,
              minimum: 1083.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [600000.0, 8190220.0],
              [709800.0, 8190220.0],
              [709800.0, 8300020.0],
              [600000.0, 8300020.0],
              [600000.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 600000.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B12: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/T38LPH_20251029T071221_B12_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 12 - SWIR (2.2) - 20m',
        'proj:bbox': [600000.0, 8190220.0, 709800.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3017.1984941184423,
              stddev: 1125.3662944881432,
              maximum: 14078.0,
              minimum: 1067.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [600000.0, 8190220.0],
              [709800.0, 8190220.0],
              [709800.0, 8300020.0],
              [600000.0, 8300020.0],
              [600000.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 600000.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B8A: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/T38LPH_20251029T071221_B08_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 8A - Vegetation red edge 4 - 20m',
        'proj:bbox': [600000.0, 8190220.0, 709800.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3010.2419889129,
              stddev: 1019.0875856555,
              maximum: 9132.0,
              minimum: 1075.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [600000.0, 8190220.0],
              [709800.0, 8190220.0],
              [709800.0, 8300020.0],
              [600000.0, 8300020.0],
              [600000.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 600000.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      SCL: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/T38LPH_20251029T071221_SCL_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['gsd:60m', 'data'],
        title: 'Scene classfication map (SCL)',
        'proj:bbox': [600000.0, 8190220.0, 709800.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 1.0,
            nodata: 0.0,
            offset: 0.0,
            sampling: 'area',
            data_type: 'uint8',
            statistics: {
              mean: 5.1746721200648995,
              stddev: 0.5671028646774404,
              maximum: 10.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [600000.0, 8190220.0],
              [709800.0, 8190220.0],
              [709800.0, 8300020.0],
              [600000.0, 8300020.0],
              [600000.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 600000.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'classification:classes': [
          {
            name: 'no_data',
            value: 0,
            nodata: true,
            percentage: 0.0,
          },
          {
            name: 'saturated_or_defective',
            value: 1,
            percentage: 0.0,
          },
          {
            name: 'dark_area_pixels',
            value: 2,
            percentage: 0.027385,
          },
          {
            name: 'cloud_shadows',
            value: 3,
            percentage: 0.233878,
          },
          {
            name: 'vegetation',
            value: 4,
            percentage: 7.148719,
          },
          {
            name: 'not_vegetated',
            value: 5,
            percentage: 69.286644,
          },
          {
            name: 'water',
            value: 6,
            percentage: 22.485101,
          },
          {
            name: 'unclassified',
            value: 7,
            percentage: 0.582938,
          },
          {
            name: 'cloud_medium_probability',
            value: 8,
            percentage: 0.20638,
          },
          {
            name: 'cloud_high_probability',
            value: 9,
            percentage: 0.028152,
          },
          {
            name: 'thin_cirrus',
            value: 10,
            percentage: 0.000806,
          },
          {
            name: 'snow',
            value: 11,
            percentage: 0.0,
          },
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      WVP: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/T38LPH_20251029T071221_WVP_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['gsd:10m', 'data'],
        title: 'Water vapour (WVP)',
        'proj:bbox': [600000.0, 8190220.0, 709800.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2419.7749966197944,
              stddev: 213.9367791412723,
              maximum: 4936.0,
              minimum: 503.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [600000.0, 8190220.0],
              [709800.0, 8190220.0],
              [709800.0, 8300020.0],
              [600000.0, 8300020.0],
              [600000.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 600000.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'safe-manifest': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/manifest.safe',
        type: 'text/plain',
        roles: ['metadata'],
        title: 'SAFE manifest',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'granule-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/MTD_TL.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'Granule metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'inspire-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/INSPIRE.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'INSPIRE metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'product-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/MTD_MSIL2A.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'Product metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'datastrip-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/MTD_DS.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'Datastrip metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [45.93177460997931, -16.367164183137394],
          [46.96413305405615, -16.367164183137394],
          [46.96413305405615, -15.36802063786074],
          [45.93177460997931, -15.36802063786074],
          [45.93177460997931, -16.367164183137394],
        ],
      ],
    },
    collection: 'sentinel2-l2a-sen2cor',
    properties: {
      created: '2025-10-29T12:34:58.970497Z',
      datetime: '2025-10-29T07:12:21.025000Z',
      's2:mgrs_tile': '38LPH',
      'eo:snow_cover': 0.0,
      'eo:cloud_cover': 0.24,
      'sat:orbit_state': 'descending',
      'processing:level': 'L2',
      'processing:version': '05.11',
      'production:origins': {
        in_ts: {
          ids: ['S2C_MSIL2A_20251029T071221_N0511_R020_T38LPH_20251029T100609'],
          endpoint: 'https://stac.dataspace.copernicus.eu/v1',
          collection: 'sentinel-2-l2a',
        },
      },
      'production:version': '0.2.1',
      'sat:absolute_orbit': 5996,
      'sat:relative_orbit': 20,
      'processing:datetime': '2025-10-29T10:06:09.000000Z',
      'processing:facility': 'ESA',
      'processing:software': {
        eometadatatool: '251021130925+dirty',
      },
      's2:water_percentage': 22.485101,
      's2:vegetation_percentage': 7.148719,
      's2:thin_cirrus_percentage': 0.000806,
      's2:cloud_shadow_percentage': 0.233878,
      's2:nodata_pixel_percentage': 0.0,
      's2:unclassified_percentage': 0.582938,
      's2:high_proba_clouds_percentage': 0.028152,
      's2:medium_proba_clouds_percentage': 0.20638,
      'sat:platform_international_designator': '2024-157A',
    },
    stac_version: '1.1.0',
    stac_extensions: [
      'https://stac-extensions.github.io/eo/v1.1.0/schema.json',
      'https://stac-extensions.github.io/sat/v1.0.0/schema.json',
      'https://stac-extensions.github.io/processing/v1.2.0/schema.json',
      'https://stac-extensions.github.io/sentinel-2/v1.0.0/schema.json',
      'https://forge.inrae.fr/teledec/stac-extensions/schemas/-/raw/main/production/v1.1.0/schema.json',
      'https://stac-extensions.github.io/raster/v1.1.0/schema.json',
      'https://stac-extensions.github.io/projection/v2.0.0/schema.json',
      'https://stac-extensions.github.io/classification/v2.0.0/schema.json',
    ],
  },
  {
    id: 'S2C_20251029T071221025000Z_38LNH_0511_13e4dcc359',
    bbox: [
      44.99981272158049, -16.36924585985854, 46.02791140498133,
      -15.374248072492415,
    ],
    type: 'Feature',
    links: [
      {
        rel: 'collection',
        type: 'application/json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/collections/sentinel2-l2a-sen2cor',
      },
      {
        rel: 'parent',
        type: 'application/json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/collections/sentinel2-l2a-sen2cor',
      },
      {
        rel: 'root',
        type: 'application/json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/',
      },
      {
        rel: 'self',
        type: 'application/geo+json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/collections/sentinel2-l2a-sen2cor/items/S2C_20251029T071221025000Z_38LNH_0511_13e4dcc359',
      },
    ],
    assets: {
      QL: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LNH_0511_13e4dcc359/S2C_MSIL2A_20251029T071221_N0511_R020_T38LNH_20251029T100609-ql.jpg',
        type: 'text/plain',
        roles: ['thumbnail', 'overview'],
        title: 'Quicklook',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      AOT: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LNH_0511_13e4dcc359/T38LNH_20251029T071221_AOT_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['gsd:10m', 'data'],
        title: 'Aerosol optical thickness (AOT)',
        'proj:bbox': [499980.0, 8190220.0, 609780.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 139.64844649021865,
              stddev: 14.336707489448909,
              maximum: 174.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [499980.0, 8190220.0],
              [609780.0, 8190220.0],
              [609780.0, 8300020.0],
              [499980.0, 8300020.0],
              [499980.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 499980.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B01: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LNH_0511_13e4dcc359/T38LNH_20251029T071221_B01_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:60m', 'data'],
        title: 'Band 1 - Coastal aerosol - 60m',
        'proj:bbox': [499980.0, 8190220.0, 609780.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2500.444369685623,
              stddev: 2504.908623719793,
              maximum: 19641.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [499980.0, 8190220.0],
              [609780.0, 8190220.0],
              [609780.0, 8300020.0],
              [499980.0, 8300020.0],
              [499980.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 499980.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B02: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LNH_0511_13e4dcc359/T38LNH_20251029T071221_B02_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 2 - Blue - 10m',
        'proj:bbox': [499980.0, 8190220.0, 609780.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2461.026703974885,
              stddev: 2400.7765186538595,
              maximum: 19264.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [499980.0, 8190220.0],
              [609780.0, 8190220.0],
              [609780.0, 8300020.0],
              [499980.0, 8300020.0],
              [499980.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 499980.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B03: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LNH_0511_13e4dcc359/T38LNH_20251029T071221_B03_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 3 - Green - 10m',
        'proj:bbox': [499980.0, 8190220.0, 609780.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2473.555054010841,
              stddev: 2218.6763346211364,
              maximum: 18384.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [499980.0, 8190220.0],
              [609780.0, 8190220.0],
              [609780.0, 8300020.0],
              [499980.0, 8300020.0],
              [499980.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 499980.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B04: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LNH_0511_13e4dcc359/T38LNH_20251029T071221_B04_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 4 - Red - 10m',
        'proj:bbox': [499980.0, 8190220.0, 609780.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2513.1455437050327,
              stddev: 2195.1926208913205,
              maximum: 17776.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [499980.0, 8190220.0],
              [609780.0, 8190220.0],
              [609780.0, 8300020.0],
              [499980.0, 8300020.0],
              [499980.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 499980.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B05: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LNH_0511_13e4dcc359/T38LNH_20251029T071221_B05_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 5 - Vegetation red edge 1 - 20m',
        'proj:bbox': [499980.0, 8190220.0, 609780.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2750.24533946617,
              stddev: 2359.6599043004935,
              maximum: 17645.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [499980.0, 8190220.0],
              [609780.0, 8190220.0],
              [609780.0, 8300020.0],
              [499980.0, 8300020.0],
              [499980.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 499980.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B06: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LNH_0511_13e4dcc359/T38LNH_20251029T071221_B06_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 6 - Vegetation red edge 2 - 20m',
        'proj:bbox': [499980.0, 8190220.0, 609780.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2871.557084657219,
              stddev: 2303.471641087824,
              maximum: 17506.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [499980.0, 8190220.0],
              [609780.0, 8190220.0],
              [609780.0, 8300020.0],
              [499980.0, 8300020.0],
              [499980.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 499980.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B07: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LNH_0511_13e4dcc359/T38LNH_20251029T071221_B07_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 7 - Vegetation red edge 3 - 20m',
        'proj:bbox': [499980.0, 8190220.0, 609780.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2923.6028379853424,
              stddev: 2254.808284718407,
              maximum: 17231.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [499980.0, 8190220.0],
              [609780.0, 8190220.0],
              [609780.0, 8300020.0],
              [499980.0, 8300020.0],
              [499980.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 499980.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B08: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LNH_0511_13e4dcc359/T38LNH_20251029T071221_B08_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 8 - NIR - 10m',
        'proj:bbox': [499980.0, 8190220.0, 609780.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2972.1721714207724,
              stddev: 2306.0938208884586,
              maximum: 17104.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [499980.0, 8190220.0],
              [609780.0, 8190220.0],
              [609780.0, 8300020.0],
              [499980.0, 8300020.0],
              [499980.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 499980.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B09: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LNH_0511_13e4dcc359/T38LNH_20251029T071221_B09_60m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:60m', 'data'],
        title: 'Band 9 - Water vapor - 60m',
        'proj:bbox': [499980.0, 8190220.0, 609780.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [1830, 1830],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3658.378171641791,
              stddev: 3778.1862552286484,
              maximum: 17036.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [499980.0, 8190220.0],
              [609780.0, 8190220.0],
              [609780.0, 8300020.0],
              [499980.0, 8300020.0],
              [499980.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          60.0, 0.0, 499980.0, 0.0, -60.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B11: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LNH_0511_13e4dcc359/T38LNH_20251029T071221_B11_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 11 - SWIR (1.6) - 20m',
        'proj:bbox': [499980.0, 8190220.0, 609780.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3124.6418406534494,
              stddev: 2070.7590289754967,
              maximum: 11237.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [499980.0, 8190220.0],
              [609780.0, 8190220.0],
              [609780.0, 8300020.0],
              [499980.0, 8300020.0],
              [499980.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 499980.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B12: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LNH_0511_13e4dcc359/T38LNH_20251029T071221_B12_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 12 - SWIR (2.2) - 20m',
        'proj:bbox': [499980.0, 8190220.0, 609780.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2621.4891457982008,
              stddev: 1675.6683575131347,
              maximum: 13038.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [499980.0, 8190220.0],
              [609780.0, 8190220.0],
              [609780.0, 8300020.0],
              [499980.0, 8300020.0],
              [499980.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 499980.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B8A: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LNH_0511_13e4dcc359/T38LNH_20251029T071221_B08_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 8A - Vegetation red edge 4 - 20m',
        'proj:bbox': [499980.0, 8190220.0, 609780.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2972.1721714208,
              stddev: 2306.0938208885,
              maximum: 17104.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [499980.0, 8190220.0],
              [609780.0, 8190220.0],
              [609780.0, 8300020.0],
              [499980.0, 8300020.0],
              [499980.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 499980.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      SCL: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LNH_0511_13e4dcc359/T38LNH_20251029T071221_SCL_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['gsd:60m', 'data'],
        title: 'Scene classfication map (SCL)',
        'proj:bbox': [499980.0, 8190220.0, 609780.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 1.0,
            nodata: 0.0,
            offset: 0.0,
            sampling: 'area',
            data_type: 'uint8',
            statistics: {
              mean: 5.870929053395218,
              stddev: 1.3032169536987388,
              maximum: 10.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [499980.0, 8190220.0],
              [609780.0, 8190220.0],
              [609780.0, 8300020.0],
              [499980.0, 8300020.0],
              [499980.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 499980.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'classification:classes': [
          {
            name: 'no_data',
            value: 0,
            nodata: true,
            percentage: 13.214193,
          },
          {
            name: 'saturated_or_defective',
            value: 1,
            percentage: 0.0,
          },
          {
            name: 'dark_area_pixels',
            value: 2,
            percentage: 0.033558,
          },
          {
            name: 'cloud_shadows',
            value: 3,
            percentage: 1.066562,
          },
          {
            name: 'vegetation',
            value: 4,
            percentage: 8.483611,
          },
          {
            name: 'not_vegetated',
            value: 5,
            percentage: 28.963143,
          },
          {
            name: 'water',
            value: 6,
            percentage: 47.737524,
          },
          {
            name: 'unclassified',
            value: 7,
            percentage: 0.862099,
          },
          {
            name: 'cloud_medium_probability',
            value: 8,
            percentage: 3.378384,
          },
          {
            name: 'cloud_high_probability',
            value: 9,
            percentage: 9.468456,
          },
          {
            name: 'thin_cirrus',
            value: 10,
            percentage: 0.006667,
          },
          {
            name: 'snow',
            value: 11,
            percentage: 0.0,
          },
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      WVP: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LNH_0511_13e4dcc359/T38LNH_20251029T071221_WVP_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['gsd:10m', 'data'],
        title: 'Water vapour (WVP)',
        'proj:bbox': [499980.0, 8190220.0, 609780.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2637.659859766147,
              stddev: 188.55727079631484,
              maximum: 4819.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [499980.0, 8190220.0],
              [609780.0, 8190220.0],
              [609780.0, 8300020.0],
              [499980.0, 8300020.0],
              [499980.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 499980.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'safe-manifest': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LNH_0511_13e4dcc359/manifest.safe',
        type: 'text/plain',
        roles: ['metadata'],
        title: 'SAFE manifest',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'granule-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LNH_0511_13e4dcc359/MTD_TL.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'Granule metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'inspire-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LNH_0511_13e4dcc359/INSPIRE.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'INSPIRE metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'product-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LNH_0511_13e4dcc359/MTD_MSIL2A.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'Product metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'datastrip-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LNH_0511_13e4dcc359/MTD_DS.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'Datastrip metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [44.99981272158049, -16.36924585985854],
          [46.02791140498133, -16.36924585985854],
          [46.02791140498133, -15.374248072492415],
          [44.99981272158049, -15.374248072492415],
          [44.99981272158049, -16.36924585985854],
        ],
      ],
    },
    collection: 'sentinel2-l2a-sen2cor',
    properties: {
      created: '2025-10-29T12:27:42.854777Z',
      datetime: '2025-10-29T07:12:21.025000Z',
      's2:mgrs_tile': '38LNH',
      'eo:snow_cover': 0.0,
      'eo:cloud_cover': 12.85,
      'sat:orbit_state': 'descending',
      'processing:level': 'L2',
      'processing:version': '05.11',
      'production:origins': {
        in_ts: {
          ids: ['S2C_MSIL2A_20251029T071221_N0511_R020_T38LNH_20251029T100609'],
          endpoint: 'https://stac.dataspace.copernicus.eu/v1',
          collection: 'sentinel-2-l2a',
        },
      },
      'production:version': '0.2.1',
      'sat:absolute_orbit': 5996,
      'sat:relative_orbit': 20,
      'processing:datetime': '2025-10-29T10:06:09.000000Z',
      'processing:facility': 'ESA',
      'processing:software': {
        eometadatatool: '251021130925+dirty',
      },
      's2:water_percentage': 47.737524,
      's2:vegetation_percentage': 8.483611,
      's2:thin_cirrus_percentage': 0.006667,
      's2:cloud_shadow_percentage': 1.066562,
      's2:nodata_pixel_percentage': 13.214193,
      's2:unclassified_percentage': 0.862099,
      's2:high_proba_clouds_percentage': 9.468456,
      's2:medium_proba_clouds_percentage': 3.378384,
      'sat:platform_international_designator': '2024-157A',
    },
    stac_version: '1.1.0',
    stac_extensions: [
      'https://stac-extensions.github.io/eo/v1.1.0/schema.json',
      'https://stac-extensions.github.io/sat/v1.0.0/schema.json',
      'https://stac-extensions.github.io/processing/v1.2.0/schema.json',
      'https://stac-extensions.github.io/sentinel-2/v1.0.0/schema.json',
      'https://forge.inrae.fr/teledec/stac-extensions/schemas/-/raw/main/production/v1.1.0/schema.json',
      'https://stac-extensions.github.io/raster/v1.1.0/schema.json',
      'https://stac-extensions.github.io/projection/v2.0.0/schema.json',
      'https://stac-extensions.github.io/classification/v2.0.0/schema.json',
    ],
  },
  {
    id: 'S2A_20251028T070241024000Z_38LQH_0511_6680041339',
    bbox: [
      46.86291158102522, -16.36092517176475, 47.89922475984138,
      -15.357911490883158,
    ],
    type: 'Feature',
    links: [
      {
        rel: 'collection',
        type: 'application/json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/collections/sentinel2-l2a-sen2cor',
      },
      {
        rel: 'parent',
        type: 'application/json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/collections/sentinel2-l2a-sen2cor',
      },
      {
        rel: 'root',
        type: 'application/json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/',
      },
      {
        rel: 'self',
        type: 'application/geo+json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/collections/sentinel2-l2a-sen2cor/items/S2A_20251028T070241024000Z_38LQH_0511_6680041339',
      },
    ],
    assets: {
      QL: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251028T070241024000Z_38LQH_0511_6680041339/S2A_MSIL2A_20251028T070241_N0511_R120_T38LQH_20251028T083459-ql.jpg',
        type: 'text/plain',
        roles: ['thumbnail', 'overview'],
        title: 'Quicklook',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      AOT: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251028T070241024000Z_38LQH_0511_6680041339/T38LQH_20251028T070241_AOT_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['gsd:10m', 'data'],
        title: 'Aerosol optical thickness (AOT)',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 79.45248388042204,
              stddev: 4.106796986890615,
              maximum: 84.0,
              minimum: 70.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 699960.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B01: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251028T070241024000Z_38LQH_0511_6680041339/T38LQH_20251028T070241_B01_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:60m', 'data'],
        title: 'Band 1 - Coastal aerosol - 60m',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 1734.9063575770892,
              stddev: 201.91906710184878,
              maximum: 5990.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 699960.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B02: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251028T070241024000Z_38LQH_0511_6680041339/T38LQH_20251028T070241_B02_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 2 - Blue - 10m',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 1895.4821506949525,
              stddev: 298.01069585838076,
              maximum: 6068.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 699960.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B03: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251028T070241024000Z_38LQH_0511_6680041339/T38LQH_20251028T070241_B03_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 3 - Green - 10m',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2330.552268821529,
              stddev: 398.70171498910827,
              maximum: 6113.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 699960.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B04: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251028T070241024000Z_38LQH_0511_6680041339/T38LQH_20251028T070241_B04_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 4 - Red - 10m',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2989.642797090324,
              stddev: 630.5071869866367,
              maximum: 6449.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 699960.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B05: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251028T070241024000Z_38LQH_0511_6680041339/T38LQH_20251028T070241_B05_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 5 - Vegetation red edge 1 - 20m',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3463.414406191815,
              stddev: 655.2205223716097,
              maximum: 6803.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 699960.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B06: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251028T070241024000Z_38LQH_0511_6680041339/T38LQH_20251028T070241_B06_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 6 - Vegetation red edge 2 - 20m',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3813.143415382368,
              stddev: 683.9426211412073,
              maximum: 6859.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 699960.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B07: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251028T070241024000Z_38LQH_0511_6680041339/T38LQH_20251028T070241_B07_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 7 - Vegetation red edge 3 - 20m',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 4041.4517918400115,
              stddev: 734.8457005328396,
              maximum: 7314.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 699960.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B08: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251028T070241024000Z_38LQH_0511_6680041339/T38LQH_20251028T070241_B08_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 8 - NIR - 10m',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 4217.853502486107,
              stddev: 772.0530332972431,
              maximum: 7624.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 699960.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B09: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251028T070241024000Z_38LQH_0511_6680041339/T38LQH_20251028T070241_B09_60m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:60m', 'data'],
        title: 'Band 9 - Water vapor - 60m',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [1830, 1830],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 4215.964207134999,
              stddev: 1170.3489891564998,
              maximum: 16374.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          60.0, 0.0, 699960.0, 0.0, -60.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B11: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251028T070241024000Z_38LQH_0511_6680041339/T38LQH_20251028T070241_B11_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 11 - SWIR (1.6) - 20m',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 5264.452418324512,
              stddev: 954.1410606385948,
              maximum: 8265.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 699960.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B12: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251028T070241024000Z_38LQH_0511_6680041339/T38LQH_20251028T070241_B12_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 12 - SWIR (2.2) - 20m',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 4006.396357930078,
              stddev: 777.7589095120182,
              maximum: 7010.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 699960.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B8A: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251028T070241024000Z_38LQH_0511_6680041339/T38LQH_20251028T070241_B08_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 8A - Vegetation red edge 4 - 20m',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 4217.8535024861,
              stddev: 772.05303329724,
              maximum: 7624.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 699960.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      SCL: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251028T070241024000Z_38LQH_0511_6680041339/T38LQH_20251028T070241_SCL_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['gsd:60m', 'data'],
        title: 'Scene classfication map (SCL)',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 1.0,
            nodata: 0.0,
            offset: 0.0,
            sampling: 'area',
            data_type: 'uint8',
            statistics: {
              mean: 4.978943128135643,
              stddev: 0.4390108422334969,
              maximum: 11.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 699960.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'classification:classes': [
          {
            name: 'no_data',
            value: 0,
            nodata: true,
            percentage: 76.702416,
          },
          {
            name: 'saturated_or_defective',
            value: 1,
            percentage: 0.0,
          },
          {
            name: 'dark_area_pixels',
            value: 2,
            percentage: 0.04053,
          },
          {
            name: 'cloud_shadows',
            value: 3,
            percentage: 0.075649,
          },
          {
            name: 'vegetation',
            value: 4,
            percentage: 6.760134,
          },
          {
            name: 'not_vegetated',
            value: 5,
            percentage: 91.632116,
          },
          {
            name: 'water',
            value: 6,
            percentage: 0.918325,
          },
          {
            name: 'unclassified',
            value: 7,
            percentage: 0.083923,
          },
          {
            name: 'cloud_medium_probability',
            value: 8,
            percentage: 0.042396,
          },
          {
            name: 'cloud_high_probability',
            value: 9,
            percentage: 0.007448,
          },
          {
            name: 'thin_cirrus',
            value: 10,
            percentage: 0.439481,
          },
          {
            name: 'snow',
            value: 11,
            percentage: 0.0,
          },
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      WVP: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251028T070241024000Z_38LQH_0511_6680041339/T38LQH_20251028T070241_WVP_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['gsd:10m', 'data'],
        title: 'Water vapour (WVP)',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 1901.3474632110697,
              stddev: 222.64236673931057,
              maximum: 3767.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 699960.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'safe-manifest': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251028T070241024000Z_38LQH_0511_6680041339/manifest.safe',
        type: 'text/plain',
        roles: ['metadata'],
        title: 'SAFE manifest',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'granule-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251028T070241024000Z_38LQH_0511_6680041339/MTD_TL.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'Granule metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'inspire-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251028T070241024000Z_38LQH_0511_6680041339/INSPIRE.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'INSPIRE metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'product-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251028T070241024000Z_38LQH_0511_6680041339/MTD_MSIL2A.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'Product metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'datastrip-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251028T070241024000Z_38LQH_0511_6680041339/MTD_DS.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'Datastrip metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [46.86291158102522, -16.36092517176475],
          [47.89922475984138, -16.36092517176475],
          [47.89922475984138, -15.357911490883158],
          [46.86291158102522, -15.357911490883158],
          [46.86291158102522, -16.36092517176475],
        ],
      ],
    },
    collection: 'sentinel2-l2a-sen2cor',
    properties: {
      created: '2025-10-28T12:11:05.276451Z',
      datetime: '2025-10-28T07:02:41.024000Z',
      's2:mgrs_tile': '38LQH',
      'eo:snow_cover': 0.0,
      'eo:cloud_cover': 0.49,
      'sat:orbit_state': 'descending',
      'processing:level': 'L2',
      'processing:version': '05.11',
      'production:origins': {
        in_ts: {
          ids: ['S2A_MSIL2A_20251028T070241_N0511_R120_T38LQH_20251028T083459'],
          endpoint: 'https://stac.dataspace.copernicus.eu/v1',
          collection: 'sentinel-2-l2a',
        },
      },
      'production:version': '0.2.1',
      'sat:absolute_orbit': 54057,
      'sat:relative_orbit': 120,
      'processing:datetime': '2025-10-28T08:34:59.000000Z',
      'processing:facility': 'ESA',
      'processing:software': {
        eometadatatool: '251021130925+dirty',
      },
      's2:water_percentage': 0.918325,
      's2:vegetation_percentage': 6.760134,
      's2:thin_cirrus_percentage': 0.439481,
      's2:cloud_shadow_percentage': 0.075649,
      's2:nodata_pixel_percentage': 76.702416,
      's2:unclassified_percentage': 0.083923,
      's2:high_proba_clouds_percentage': 0.007448,
      's2:medium_proba_clouds_percentage': 0.042396,
      'sat:platform_international_designator': '2015-028A',
    },
    stac_version: '1.1.0',
    stac_extensions: [
      'https://stac-extensions.github.io/eo/v1.1.0/schema.json',
      'https://stac-extensions.github.io/sat/v1.0.0/schema.json',
      'https://stac-extensions.github.io/processing/v1.2.0/schema.json',
      'https://stac-extensions.github.io/sentinel-2/v1.0.0/schema.json',
      'https://forge.inrae.fr/teledec/stac-extensions/schemas/-/raw/main/production/v1.1.0/schema.json',
      'https://stac-extensions.github.io/raster/v1.1.0/schema.json',
      'https://stac-extensions.github.io/projection/v2.0.0/schema.json',
      'https://stac-extensions.github.io/classification/v2.0.0/schema.json',
    ],
  },
  {
    id: 'S2B_20251027T072159024000Z_38LNH_0511_a43ff26891',
    bbox: [
      44.99981272158049, -16.36924585985854, 46.02791140498133,
      -15.374248072492415,
    ],
    type: 'Feature',
    links: [
      {
        rel: 'collection',
        type: 'application/json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/collections/sentinel2-l2a-sen2cor',
      },
      {
        rel: 'parent',
        type: 'application/json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/collections/sentinel2-l2a-sen2cor',
      },
      {
        rel: 'root',
        type: 'application/json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/',
      },
      {
        rel: 'self',
        type: 'application/geo+json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/collections/sentinel2-l2a-sen2cor/items/S2B_20251027T072159024000Z_38LNH_0511_a43ff26891',
      },
    ],
    assets: {
      QL: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251027T072159024000Z_38LNH_0511_a43ff26891/S2B_MSIL2A_20251027T072159_N0511_R063_T38LNH_20251027T104708-ql.jpg',
        type: 'text/plain',
        roles: ['thumbnail', 'overview'],
        title: 'Quicklook',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      AOT: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251027T072159024000Z_38LNH_0511_a43ff26891/T38LNH_20251027T072159_AOT_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['gsd:10m', 'data'],
        title: 'Aerosol optical thickness (AOT)',
        'proj:bbox': [499980.0, 8190220.0, 609780.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 126.14459051514267,
              stddev: 7.781273930107721,
              maximum: 144.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [499980.0, 8190220.0],
              [609780.0, 8190220.0],
              [609780.0, 8300020.0],
              [499980.0, 8300020.0],
              [499980.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 499980.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B01: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251027T072159024000Z_38LNH_0511_a43ff26891/T38LNH_20251027T072159_B01_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:60m', 'data'],
        title: 'Band 1 - Coastal aerosol - 60m',
        'proj:bbox': [499980.0, 8190220.0, 609780.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2146.634237076857,
              stddev: 388.95630146250784,
              maximum: 5568.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [499980.0, 8190220.0],
              [609780.0, 8190220.0],
              [609780.0, 8300020.0],
              [499980.0, 8300020.0],
              [499980.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 499980.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B02: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251027T072159024000Z_38LNH_0511_a43ff26891/T38LNH_20251027T072159_B02_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 2 - Blue - 10m',
        'proj:bbox': [499980.0, 8190220.0, 609780.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2250.833836034949,
              stddev: 427.50191632444125,
              maximum: 5794.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [499980.0, 8190220.0],
              [609780.0, 8190220.0],
              [609780.0, 8300020.0],
              [499980.0, 8300020.0],
              [499980.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 499980.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B03: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251027T072159024000Z_38LNH_0511_a43ff26891/T38LNH_20251027T072159_B03_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 3 - Green - 10m',
        'proj:bbox': [499980.0, 8190220.0, 609780.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2261.9933238608714,
              stddev: 386.0998292186912,
              maximum: 5832.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [499980.0, 8190220.0],
              [609780.0, 8190220.0],
              [609780.0, 8300020.0],
              [499980.0, 8300020.0],
              [499980.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 499980.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B04: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251027T072159024000Z_38LNH_0511_a43ff26891/T38LNH_20251027T072159_B04_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 4 - Red - 10m',
        'proj:bbox': [499980.0, 8190220.0, 609780.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2293.4008875739646,
              stddev: 355.13850769643955,
              maximum: 6090.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [499980.0, 8190220.0],
              [609780.0, 8190220.0],
              [609780.0, 8300020.0],
              [499980.0, 8300020.0],
              [499980.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 499980.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B05: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251027T072159024000Z_38LNH_0511_a43ff26891/T38LNH_20251027T072159_B05_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 5 - Vegetation red edge 1 - 20m',
        'proj:bbox': [499980.0, 8190220.0, 609780.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2420.2799929977436,
              stddev: 333.9130970795318,
              maximum: 6503.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [499980.0, 8190220.0],
              [609780.0, 8190220.0],
              [609780.0, 8300020.0],
              [499980.0, 8300020.0],
              [499980.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 499980.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B06: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251027T072159024000Z_38LNH_0511_a43ff26891/T38LNH_20251027T072159_B06_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 6 - Vegetation red edge 2 - 20m',
        'proj:bbox': [499980.0, 8190220.0, 609780.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2472.2532288181746,
              stddev: 386.5368800918828,
              maximum: 6472.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [499980.0, 8190220.0],
              [609780.0, 8190220.0],
              [609780.0, 8300020.0],
              [499980.0, 8300020.0],
              [499980.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 499980.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B07: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251027T072159024000Z_38LNH_0511_a43ff26891/T38LNH_20251027T072159_B07_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 7 - Vegetation red edge 3 - 20m',
        'proj:bbox': [499980.0, 8190220.0, 609780.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2547.9293092380417,
              stddev: 452.5862290961134,
              maximum: 6742.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [499980.0, 8190220.0],
              [609780.0, 8190220.0],
              [609780.0, 8300020.0],
              [499980.0, 8300020.0],
              [499980.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 499980.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B08: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251027T072159024000Z_38LNH_0511_a43ff26891/T38LNH_20251027T072159_B08_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 8 - NIR - 10m',
        'proj:bbox': [499980.0, 8190220.0, 609780.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2536.738559420967,
              stddev: 514.4999125489709,
              maximum: 6691.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [499980.0, 8190220.0],
              [609780.0, 8190220.0],
              [609780.0, 8300020.0],
              [499980.0, 8300020.0],
              [499980.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 499980.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B09: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251027T072159024000Z_38LNH_0511_a43ff26891/T38LNH_20251027T072159_B09_60m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:60m', 'data'],
        title: 'Band 9 - Water vapor - 60m',
        'proj:bbox': [499980.0, 8190220.0, 609780.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [1830, 1830],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2453.9885126634213,
              stddev: 686.1378363438702,
              maximum: 12764.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [499980.0, 8190220.0],
              [609780.0, 8190220.0],
              [609780.0, 8300020.0],
              [499980.0, 8300020.0],
              [499980.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          60.0, 0.0, 499980.0, 0.0, -60.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B11: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251027T072159024000Z_38LNH_0511_a43ff26891/T38LNH_20251027T072159_B11_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 11 - SWIR (1.6) - 20m',
        'proj:bbox': [499980.0, 8190220.0, 609780.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2767.418505545826,
              stddev: 851.9356067190424,
              maximum: 8307.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [499980.0, 8190220.0],
              [609780.0, 8190220.0],
              [609780.0, 8300020.0],
              [499980.0, 8300020.0],
              [499980.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 499980.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B12: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251027T072159024000Z_38LNH_0511_a43ff26891/T38LNH_20251027T072159_B12_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 12 - SWIR (2.2) - 20m',
        'proj:bbox': [499980.0, 8190220.0, 609780.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2489.128385740971,
              stddev: 624.7152708986218,
              maximum: 8437.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [499980.0, 8190220.0],
              [609780.0, 8190220.0],
              [609780.0, 8300020.0],
              [499980.0, 8300020.0],
              [499980.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 499980.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B8A: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251027T072159024000Z_38LNH_0511_a43ff26891/T38LNH_20251027T072159_B08_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 8A - Vegetation red edge 4 - 20m',
        'proj:bbox': [499980.0, 8190220.0, 609780.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2536.738559421,
              stddev: 514.49991254897,
              maximum: 6691.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [499980.0, 8190220.0],
              [609780.0, 8190220.0],
              [609780.0, 8300020.0],
              [499980.0, 8300020.0],
              [499980.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 499980.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      SCL: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251027T072159024000Z_38LNH_0511_a43ff26891/T38LNH_20251027T072159_SCL_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['gsd:60m', 'data'],
        title: 'Scene classfication map (SCL)',
        'proj:bbox': [499980.0, 8190220.0, 609780.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 1.0,
            nodata: 0.0,
            offset: 0.0,
            sampling: 'area',
            data_type: 'uint8',
            statistics: {
              mean: 5.8613047711781885,
              stddev: 0.8949301385465187,
              maximum: 10.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [499980.0, 8190220.0],
              [609780.0, 8190220.0],
              [609780.0, 8300020.0],
              [499980.0, 8300020.0],
              [499980.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 499980.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'classification:classes': [
          {
            name: 'no_data',
            value: 0,
            nodata: true,
            percentage: 56.723529,
          },
          {
            name: 'saturated_or_defective',
            value: 1,
            percentage: 0.0,
          },
          {
            name: 'dark_area_pixels',
            value: 2,
            percentage: 0.013263,
          },
          {
            name: 'cloud_shadows',
            value: 3,
            percentage: 0.04531,
          },
          {
            name: 'vegetation',
            value: 4,
            percentage: 5.704119,
          },
          {
            name: 'not_vegetated',
            value: 5,
            percentage: 21.265531,
          },
          {
            name: 'water',
            value: 6,
            percentage: 61.635047,
          },
          {
            name: 'unclassified',
            value: 7,
            percentage: 0.629206,
          },
          {
            name: 'cloud_medium_probability',
            value: 8,
            percentage: 10.662953,
          },
          {
            name: 'cloud_high_probability',
            value: 9,
            percentage: 0.044029,
          },
          {
            name: 'thin_cirrus',
            value: 10,
            percentage: 0.000544,
          },
          {
            name: 'snow',
            value: 11,
            percentage: 0.0,
          },
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      WVP: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251027T072159024000Z_38LNH_0511_a43ff26891/T38LNH_20251027T072159_WVP_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['gsd:10m', 'data'],
        title: 'Water vapour (WVP)',
        'proj:bbox': [499980.0, 8190220.0, 609780.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2557.295043334307,
              stddev: 176.9278406919885,
              maximum: 3767.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [499980.0, 8190220.0],
              [609780.0, 8190220.0],
              [609780.0, 8300020.0],
              [499980.0, 8300020.0],
              [499980.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 499980.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'safe-manifest': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251027T072159024000Z_38LNH_0511_a43ff26891/manifest.safe',
        type: 'text/plain',
        roles: ['metadata'],
        title: 'SAFE manifest',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'granule-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251027T072159024000Z_38LNH_0511_a43ff26891/MTD_TL.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'Granule metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'inspire-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251027T072159024000Z_38LNH_0511_a43ff26891/INSPIRE.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'INSPIRE metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'product-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251027T072159024000Z_38LNH_0511_a43ff26891/MTD_MSIL2A.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'Product metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'datastrip-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251027T072159024000Z_38LNH_0511_a43ff26891/MTD_DS.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'Datastrip metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [44.99981272158049, -16.36924585985854],
          [46.02791140498133, -16.36924585985854],
          [46.02791140498133, -15.374248072492415],
          [44.99981272158049, -15.374248072492415],
          [44.99981272158049, -16.36924585985854],
        ],
      ],
    },
    collection: 'sentinel2-l2a-sen2cor',
    properties: {
      created: '2025-10-27T12:12:48.448587Z',
      datetime: '2025-10-27T07:21:59.024000Z',
      's2:mgrs_tile': '38LNH',
      'eo:snow_cover': 0.0,
      'eo:cloud_cover': 10.71,
      'sat:orbit_state': 'descending',
      'processing:level': 'L2',
      'processing:version': '05.11',
      'production:origins': {
        in_ts: {
          ids: ['S2B_MSIL2A_20251027T072159_N0511_R063_T38LNH_20251027T104708'],
          endpoint: 'https://stac.dataspace.copernicus.eu/v1',
          collection: 'sentinel-2-l2a',
        },
      },
      'production:version': '0.2.1',
      'sat:absolute_orbit': 45134,
      'sat:relative_orbit': 63,
      'processing:datetime': '2025-10-27T10:47:08.000000Z',
      'processing:facility': 'ESA',
      'processing:software': {
        eometadatatool: '251021130925+dirty',
      },
      's2:water_percentage': 61.635047,
      's2:vegetation_percentage': 5.704119,
      's2:thin_cirrus_percentage': 0.000544,
      's2:cloud_shadow_percentage': 0.04531,
      's2:nodata_pixel_percentage': 56.723529,
      's2:unclassified_percentage': 0.629206,
      's2:high_proba_clouds_percentage': 0.044029,
      's2:medium_proba_clouds_percentage': 10.662953,
      'sat:platform_international_designator': '2017-013A',
    },
    stac_version: '1.1.0',
    stac_extensions: [
      'https://stac-extensions.github.io/eo/v1.1.0/schema.json',
      'https://stac-extensions.github.io/sat/v1.0.0/schema.json',
      'https://stac-extensions.github.io/processing/v1.2.0/schema.json',
      'https://stac-extensions.github.io/sentinel-2/v1.0.0/schema.json',
      'https://forge.inrae.fr/teledec/stac-extensions/schemas/-/raw/main/production/v1.1.0/schema.json',
      'https://stac-extensions.github.io/raster/v1.1.0/schema.json',
      'https://stac-extensions.github.io/projection/v2.0.0/schema.json',
      'https://stac-extensions.github.io/classification/v2.0.0/schema.json',
    ],
  },
  {
    id: 'S2A_20251026T074031024000Z_37MCT_0511_204a05c2af',
    bbox: [
      37.20081091274068, -2.8023718310552685, 38.1890210486567,
      -1.8083796234845473,
    ],
    type: 'Feature',
    links: [
      {
        rel: 'collection',
        type: 'application/json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/collections/sentinel2-l2a-sen2cor',
      },
      {
        rel: 'parent',
        type: 'application/json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/collections/sentinel2-l2a-sen2cor',
      },
      {
        rel: 'root',
        type: 'application/json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/',
      },
      {
        rel: 'self',
        type: 'application/geo+json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/collections/sentinel2-l2a-sen2cor/items/S2A_20251026T074031024000Z_37MCT_0511_204a05c2af',
      },
    ],
    assets: {
      QL: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCT_0511_204a05c2af/S2A_MSIL2A_20251026T074031_N0511_R092_T37MCT_20251026T110318-ql.jpg',
        type: 'text/plain',
        roles: ['thumbnail', 'overview'],
        title: 'Quicklook',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      AOT: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCT_0511_204a05c2af/T37MCT_20251026T074031_AOT_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['gsd:10m', 'data'],
        title: 'Aerosol optical thickness (AOT)',
        'proj:bbox': [300000.0, 9690220.0, 409800.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 260.8868814223905,
              stddev: 27.662086518916905,
              maximum: 321.0,
              minimum: 178.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9690220.0],
              [409800.0, 9690220.0],
              [409800.0, 9800020.0],
              [300000.0, 9800020.0],
              [300000.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 300000.0, 0.0, -10.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B01: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCT_0511_204a05c2af/T37MCT_20251026T074031_B01_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:60m', 'data'],
        title: 'Band 1 - Coastal aerosol - 60m',
        'proj:bbox': [300000.0, 9690220.0, 409800.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 1883.846217550027,
              stddev: 1559.2880708259122,
              maximum: 18275.0,
              minimum: 695.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9690220.0],
              [409800.0, 9690220.0],
              [409800.0, 9800020.0],
              [300000.0, 9800020.0],
              [300000.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 300000.0, 0.0, -20.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B02: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCT_0511_204a05c2af/T37MCT_20251026T074031_B02_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 2 - Blue - 10m',
        'proj:bbox': [300000.0, 9690220.0, 409800.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 1959.5392864386154,
              stddev: 1466.1594697322264,
              maximum: 17996.0,
              minimum: 938.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9690220.0],
              [409800.0, 9690220.0],
              [409800.0, 9800020.0],
              [300000.0, 9800020.0],
              [300000.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 300000.0, 0.0, -10.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B03: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCT_0511_204a05c2af/T37MCT_20251026T074031_B03_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 3 - Green - 10m',
        'proj:bbox': [300000.0, 9690220.0, 409800.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2199.727775148729,
              stddev: 1322.190646843116,
              maximum: 16705.0,
              minimum: 950.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9690220.0],
              [409800.0, 9690220.0],
              [409800.0, 9800020.0],
              [300000.0, 9800020.0],
              [300000.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 300000.0, 0.0, -10.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B04: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCT_0511_204a05c2af/T37MCT_20251026T074031_B04_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 4 - Red - 10m',
        'proj:bbox': [300000.0, 9690220.0, 409800.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2639.8236124256355,
              stddev: 1239.097493838398,
              maximum: 16173.0,
              minimum: 954.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9690220.0],
              [409800.0, 9690220.0],
              [409800.0, 9800020.0],
              [300000.0, 9800020.0],
              [300000.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 300000.0, 0.0, -10.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B05: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCT_0511_204a05c2af/T37MCT_20251026T074031_B05_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 5 - Vegetation red edge 1 - 20m',
        'proj:bbox': [300000.0, 9690220.0, 409800.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2962.3334065711197,
              stddev: 1284.7676378024207,
              maximum: 17617.0,
              minimum: 1011.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9690220.0],
              [409800.0, 9690220.0],
              [409800.0, 9800020.0],
              [300000.0, 9800020.0],
              [300000.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 300000.0, 0.0, -20.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B06: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCT_0511_204a05c2af/T37MCT_20251026T074031_B06_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 6 - Vegetation red edge 2 - 20m',
        'proj:bbox': [300000.0, 9690220.0, 409800.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3161.8757351946997,
              stddev: 1191.524869186536,
              maximum: 16525.0,
              minimum: 1047.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9690220.0],
              [409800.0, 9690220.0],
              [409800.0, 9800020.0],
              [300000.0, 9800020.0],
              [300000.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 300000.0, 0.0, -20.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B07: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCT_0511_204a05c2af/T37MCT_20251026T074031_B07_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 7 - Vegetation red edge 3 - 20m',
        'proj:bbox': [300000.0, 9690220.0, 409800.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3322.170818685776,
              stddev: 1143.7211152400348,
              maximum: 15431.0,
              minimum: 1062.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9690220.0],
              [409800.0, 9690220.0],
              [409800.0, 9800020.0],
              [300000.0, 9800020.0],
              [300000.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 300000.0, 0.0, -20.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B08: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCT_0511_204a05c2af/T37MCT_20251026T074031_B08_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 8 - NIR - 10m',
        'proj:bbox': [300000.0, 9690220.0, 409800.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3362.8799942536507,
              stddev: 1139.7129408928263,
              maximum: 15526.0,
              minimum: 1047.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9690220.0],
              [409800.0, 9690220.0],
              [409800.0, 9800020.0],
              [300000.0, 9800020.0],
              [300000.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 300000.0, 0.0, -10.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B09: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCT_0511_204a05c2af/T37MCT_20251026T074031_B09_60m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:60m', 'data'],
        title: 'Band 9 - Water vapor - 60m',
        'proj:bbox': [300000.0, 9690220.0, 409800.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [1830, 1830],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3836.341564806163,
              stddev: 2179.3017262667004,
              maximum: 17713.0,
              minimum: 1079.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9690220.0],
              [409800.0, 9690220.0],
              [409800.0, 9800020.0],
              [300000.0, 9800020.0],
              [300000.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          60.0, 0.0, 300000.0, 0.0, -60.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B11: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCT_0511_204a05c2af/T37MCT_20251026T074031_B11_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 11 - SWIR (1.6) - 20m',
        'proj:bbox': [300000.0, 9690220.0, 409800.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 4234.1220761222285,
              stddev: 1049.838364466783,
              maximum: 12170.0,
              minimum: 1043.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9690220.0],
              [409800.0, 9690220.0],
              [409800.0, 9800020.0],
              [300000.0, 9800020.0],
              [300000.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 300000.0, 0.0, -20.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B12: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCT_0511_204a05c2af/T37MCT_20251026T074031_B12_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 12 - SWIR (2.2) - 20m',
        'proj:bbox': [300000.0, 9690220.0, 409800.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3516.0222079502432,
              stddev: 905.2186114407361,
              maximum: 10420.0,
              minimum: 1065.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9690220.0],
              [409800.0, 9690220.0],
              [409800.0, 9800020.0],
              [300000.0, 9800020.0],
              [300000.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 300000.0, 0.0, -20.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B8A: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCT_0511_204a05c2af/T37MCT_20251026T074031_B08_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 8A - Vegetation red edge 4 - 20m',
        'proj:bbox': [300000.0, 9690220.0, 409800.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3362.8799942537,
              stddev: 1139.7129408928,
              maximum: 15526.0,
              minimum: 1047.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9690220.0],
              [409800.0, 9690220.0],
              [409800.0, 9800020.0],
              [300000.0, 9800020.0],
              [300000.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 300000.0, 0.0, -10.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      SCL: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCT_0511_204a05c2af/T37MCT_20251026T074031_SCL_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['gsd:60m', 'data'],
        title: 'Scene classfication map (SCL)',
        'proj:bbox': [300000.0, 9690220.0, 409800.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 1.0,
            nodata: 0.0,
            offset: 0.0,
            sampling: 'area',
            data_type: 'uint8',
            statistics: {
              mean: 5.154973972417523,
              stddev: 1.1091513761802503,
              maximum: 11.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9690220.0],
              [409800.0, 9690220.0],
              [409800.0, 9800020.0],
              [300000.0, 9800020.0],
              [300000.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 300000.0, 0.0, -20.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'classification:classes': [
          {
            name: 'no_data',
            value: 0,
            nodata: true,
            percentage: 0.0,
          },
          {
            name: 'saturated_or_defective',
            value: 1,
            percentage: 0.0,
          },
          {
            name: 'dark_area_pixels',
            value: 2,
            percentage: 0.043225,
          },
          {
            name: 'cloud_shadows',
            value: 3,
            percentage: 5.256283,
          },
          {
            name: 'vegetation',
            value: 4,
            percentage: 3.163626,
          },
          {
            name: 'not_vegetated',
            value: 5,
            percentage: 83.036512,
          },
          {
            name: 'water',
            value: 6,
            percentage: 0.012505,
          },
          {
            name: 'unclassified',
            value: 7,
            percentage: 0.674998,
          },
          {
            name: 'cloud_medium_probability',
            value: 8,
            percentage: 3.792721,
          },
          {
            name: 'cloud_high_probability',
            value: 9,
            percentage: 4.009482,
          },
          {
            name: 'thin_cirrus',
            value: 10,
            percentage: 0.01065,
          },
          {
            name: 'snow',
            value: 11,
            percentage: 0.0,
          },
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      WVP: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCT_0511_204a05c2af/T37MCT_20251026T074031_WVP_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['gsd:10m', 'data'],
        title: 'Water vapour (WVP)',
        'proj:bbox': [300000.0, 9690220.0, 409800.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2175.974699161709,
              stddev: 195.67831953079101,
              maximum: 4794.0,
              minimum: 794.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9690220.0],
              [409800.0, 9690220.0],
              [409800.0, 9800020.0],
              [300000.0, 9800020.0],
              [300000.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 300000.0, 0.0, -10.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'safe-manifest': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCT_0511_204a05c2af/manifest.safe',
        type: 'text/plain',
        roles: ['metadata'],
        title: 'SAFE manifest',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'granule-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCT_0511_204a05c2af/MTD_TL.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'Granule metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'inspire-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCT_0511_204a05c2af/INSPIRE.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'INSPIRE metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'product-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCT_0511_204a05c2af/MTD_MSIL2A.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'Product metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'datastrip-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCT_0511_204a05c2af/MTD_DS.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'Datastrip metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [37.20081091274068, -2.8023718310552685],
          [38.1890210486567, -2.8023718310552685],
          [38.1890210486567, -1.8083796234845473],
          [37.20081091274068, -1.8083796234845473],
          [37.20081091274068, -2.8023718310552685],
        ],
      ],
    },
    collection: 'sentinel2-l2a-sen2cor',
    properties: {
      created: '2025-10-26T16:18:33.619808Z',
      datetime: '2025-10-26T07:40:31.024000Z',
      's2:mgrs_tile': '37MCT',
      'eo:snow_cover': 0.0,
      'eo:cloud_cover': 7.81,
      'sat:orbit_state': 'descending',
      'processing:level': 'L2',
      'processing:version': '05.11',
      'production:origins': {
        in_ts: {
          ids: ['S2A_MSIL2A_20251026T074031_N0511_R092_T37MCT_20251026T110318'],
          endpoint: 'https://stac.dataspace.copernicus.eu/v1',
          collection: 'sentinel-2-l2a',
        },
      },
      'production:version': '0.2.1',
      'sat:absolute_orbit': 54029,
      'sat:relative_orbit': 92,
      'processing:datetime': '2025-10-26T11:03:18.000000Z',
      'processing:facility': 'ESA',
      'processing:software': {
        eometadatatool: '251021130925+dirty',
      },
      's2:water_percentage': 0.012505,
      's2:vegetation_percentage': 3.163626,
      's2:thin_cirrus_percentage': 0.01065,
      's2:cloud_shadow_percentage': 5.256283,
      's2:nodata_pixel_percentage': 0.0,
      's2:unclassified_percentage': 0.674998,
      's2:high_proba_clouds_percentage': 4.009482,
      's2:medium_proba_clouds_percentage': 3.792721,
      'sat:platform_international_designator': '2015-028A',
    },
    stac_version: '1.1.0',
    stac_extensions: [
      'https://stac-extensions.github.io/eo/v1.1.0/schema.json',
      'https://stac-extensions.github.io/sat/v1.0.0/schema.json',
      'https://stac-extensions.github.io/processing/v1.2.0/schema.json',
      'https://stac-extensions.github.io/sentinel-2/v1.0.0/schema.json',
      'https://forge.inrae.fr/teledec/stac-extensions/schemas/-/raw/main/production/v1.1.0/schema.json',
      'https://stac-extensions.github.io/raster/v1.1.0/schema.json',
      'https://stac-extensions.github.io/projection/v2.0.0/schema.json',
      'https://stac-extensions.github.io/classification/v2.0.0/schema.json',
    ],
  },
  {
    id: 'S2A_20251026T074031024000Z_37MCS_0511_50f546b423',
    bbox: [
      37.19920595120899, -3.7071632150939333, 38.18851847180446,
      -2.7128288679416928,
    ],
    type: 'Feature',
    links: [
      {
        rel: 'collection',
        type: 'application/json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/collections/sentinel2-l2a-sen2cor',
      },
      {
        rel: 'parent',
        type: 'application/json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/collections/sentinel2-l2a-sen2cor',
      },
      {
        rel: 'root',
        type: 'application/json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/',
      },
      {
        rel: 'self',
        type: 'application/geo+json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/collections/sentinel2-l2a-sen2cor/items/S2A_20251026T074031024000Z_37MCS_0511_50f546b423',
      },
    ],
    assets: {
      QL: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCS_0511_50f546b423/S2A_MSIL2A_20251026T074031_N0511_R092_T37MCS_20251026T110318-ql.jpg',
        type: 'text/plain',
        roles: ['thumbnail', 'overview'],
        title: 'Quicklook',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      AOT: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCS_0511_50f546b423/T37MCS_20251026T074031_AOT_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['gsd:10m', 'data'],
        title: 'Aerosol optical thickness (AOT)',
        'proj:bbox': [300000.0, 9590200.0, 409800.0, 9700000.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 221.69813700756842,
              stddev: 35.736868452558575,
              maximum: 387.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9590200.0],
              [409800.0, 9590200.0],
              [409800.0, 9700000.0],
              [300000.0, 9700000.0],
              [300000.0, 9590200.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 300000.0, 0.0, -10.0, 9700000.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B01: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCS_0511_50f546b423/T37MCS_20251026T074031_B01_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:60m', 'data'],
        title: 'Band 1 - Coastal aerosol - 60m',
        'proj:bbox': [300000.0, 9590200.0, 409800.0, 9700000.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2215.5905654885287,
              stddev: 2470.7081593824164,
              maximum: 20817.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9590200.0],
              [409800.0, 9590200.0],
              [409800.0, 9700000.0],
              [300000.0, 9700000.0],
              [300000.0, 9590200.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 300000.0, 0.0, -20.0, 9700000.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B02: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCS_0511_50f546b423/T37MCS_20251026T074031_B02_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 2 - Blue - 10m',
        'proj:bbox': [300000.0, 9590200.0, 409800.0, 9700000.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2240.5689942581957,
              stddev: 2292.135232288664,
              maximum: 20814.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9590200.0],
              [409800.0, 9590200.0],
              [409800.0, 9700000.0],
              [300000.0, 9700000.0],
              [300000.0, 9590200.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 300000.0, 0.0, -10.0, 9700000.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B03: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCS_0511_50f546b423/T37MCS_20251026T074031_B03_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 3 - Green - 10m',
        'proj:bbox': [300000.0, 9590200.0, 409800.0, 9700000.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2403.036533627343,
              stddev: 2079.8744252032566,
              maximum: 19296.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9590200.0],
              [409800.0, 9590200.0],
              [409800.0, 9700000.0],
              [300000.0, 9700000.0],
              [300000.0, 9590200.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 300000.0, 0.0, -10.0, 9700000.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B04: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCS_0511_50f546b423/T37MCS_20251026T074031_B04_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 4 - Red - 10m',
        'proj:bbox': [300000.0, 9590200.0, 409800.0, 9700000.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2660.2504409171074,
              stddev: 1949.7862581665404,
              maximum: 18454.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9590200.0],
              [409800.0, 9590200.0],
              [409800.0, 9700000.0],
              [300000.0, 9700000.0],
              [300000.0, 9590200.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 300000.0, 0.0, -10.0, 9700000.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B05: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCS_0511_50f546b423/T37MCS_20251026T074031_B05_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 5 - Vegetation red edge 1 - 20m',
        'proj:bbox': [300000.0, 9590200.0, 409800.0, 9700000.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2989.3309552994297,
              stddev: 2014.7844512210531,
              maximum: 18078.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9590200.0],
              [409800.0, 9590200.0],
              [409800.0, 9700000.0],
              [300000.0, 9700000.0],
              [300000.0, 9590200.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 300000.0, 0.0, -20.0, 9700000.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B06: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCS_0511_50f546b423/T37MCS_20251026T074031_B06_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 6 - Vegetation red edge 2 - 20m',
        'proj:bbox': [300000.0, 9590200.0, 409800.0, 9700000.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3300.285031524183,
              stddev: 1835.555982867782,
              maximum: 17851.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9590200.0],
              [409800.0, 9590200.0],
              [409800.0, 9700000.0],
              [300000.0, 9700000.0],
              [300000.0, 9590200.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 300000.0, 0.0, -20.0, 9700000.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B07: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCS_0511_50f546b423/T37MCS_20251026T074031_B07_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 7 - Vegetation red edge 3 - 20m',
        'proj:bbox': [300000.0, 9590200.0, 409800.0, 9700000.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3462.7521690061367,
              stddev: 1758.8312327911444,
              maximum: 17694.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9590200.0],
              [409800.0, 9590200.0],
              [409800.0, 9700000.0],
              [300000.0, 9700000.0],
              [300000.0, 9590200.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 300000.0, 0.0, -20.0, 9700000.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B08: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCS_0511_50f546b423/T37MCS_20251026T074031_B08_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 8 - NIR - 10m',
        'proj:bbox': [300000.0, 9590200.0, 409800.0, 9700000.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3491.419716719877,
              stddev: 1722.951431819054,
              maximum: 17496.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9590200.0],
              [409800.0, 9590200.0],
              [409800.0, 9700000.0],
              [300000.0, 9700000.0],
              [300000.0, 9590200.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 300000.0, 0.0, -10.0, 9700000.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B09: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCS_0511_50f546b423/T37MCS_20251026T074031_B09_60m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:60m', 'data'],
        title: 'Band 9 - Water vapor - 60m',
        'proj:bbox': [300000.0, 9590200.0, 409800.0, 9700000.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [1830, 1830],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 4122.1318967747075,
              stddev: 3122.0660417313497,
              maximum: 17473.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9590200.0],
              [409800.0, 9590200.0],
              [409800.0, 9700000.0],
              [300000.0, 9700000.0],
              [300000.0, 9590200.0],
            ],
          ],
        },
        'proj:transform': [
          60.0, 0.0, 300000.0, 0.0, -60.0, 9700000.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B11: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCS_0511_50f546b423/T37MCS_20251026T074031_B11_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 11 - SWIR (1.6) - 20m',
        'proj:bbox': [300000.0, 9590200.0, 409800.0, 9700000.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3756.2206701940036,
              stddev: 1216.4699584548662,
              maximum: 11528.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9590200.0],
              [409800.0, 9590200.0],
              [409800.0, 9700000.0],
              [300000.0, 9700000.0],
              [300000.0, 9590200.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 300000.0, 0.0, -20.0, 9700000.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B12: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCS_0511_50f546b423/T37MCS_20251026T074031_B12_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 12 - SWIR (2.2) - 20m',
        'proj:bbox': [300000.0, 9590200.0, 409800.0, 9700000.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3046.3730437925956,
              stddev: 1014.1696300875942,
              maximum: 10446.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9590200.0],
              [409800.0, 9590200.0],
              [409800.0, 9700000.0],
              [300000.0, 9700000.0],
              [300000.0, 9590200.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 300000.0, 0.0, -20.0, 9700000.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B8A: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCS_0511_50f546b423/T37MCS_20251026T074031_B08_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 8A - Vegetation red edge 4 - 20m',
        'proj:bbox': [300000.0, 9590200.0, 409800.0, 9700000.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3491.4197167199,
              stddev: 1722.9514318191,
              maximum: 17496.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9590200.0],
              [409800.0, 9590200.0],
              [409800.0, 9700000.0],
              [300000.0, 9700000.0],
              [300000.0, 9590200.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 300000.0, 0.0, -10.0, 9700000.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      SCL: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCS_0511_50f546b423/T37MCS_20251026T074031_SCL_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['gsd:60m', 'data'],
        title: 'Scene classfication map (SCL)',
        'proj:bbox': [300000.0, 9590200.0, 409800.0, 9700000.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 1.0,
            nodata: 0.0,
            offset: 0.0,
            sampling: 'area',
            data_type: 'uint8',
            statistics: {
              mean: 5.253695928304284,
              stddev: 1.3676480737637966,
              maximum: 12.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9590200.0],
              [409800.0, 9590200.0],
              [409800.0, 9700000.0],
              [300000.0, 9700000.0],
              [300000.0, 9590200.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 300000.0, 0.0, -20.0, 9700000.0, 0.0, 0.0, 1.0,
        ],
        'classification:classes': [
          {
            name: 'no_data',
            value: 0,
            nodata: true,
            percentage: 4.319548,
          },
          {
            name: 'saturated_or_defective',
            value: 1,
            percentage: 0.0,
          },
          {
            name: 'dark_area_pixels',
            value: 2,
            percentage: 0.231069,
          },
          {
            name: 'cloud_shadows',
            value: 3,
            percentage: 1.479767,
          },
          {
            name: 'vegetation',
            value: 4,
            percentage: 16.212821,
          },
          {
            name: 'not_vegetated',
            value: 5,
            percentage: 68.89115,
          },
          {
            name: 'water',
            value: 6,
            percentage: 0.68151,
          },
          {
            name: 'unclassified',
            value: 7,
            percentage: 1.650718,
          },
          {
            name: 'cloud_medium_probability',
            value: 8,
            percentage: 2.482618,
          },
          {
            name: 'cloud_high_probability',
            value: 9,
            percentage: 7.830084,
          },
          {
            name: 'thin_cirrus',
            value: 10,
            percentage: 0.494896,
          },
          {
            name: 'snow',
            value: 11,
            percentage: 0.045374,
          },
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      WVP: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCS_0511_50f546b423/T37MCS_20251026T074031_WVP_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['gsd:10m', 'data'],
        title: 'Water vapour (WVP)',
        'proj:bbox': [300000.0, 9590200.0, 409800.0, 9700000.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2000.2474817859475,
              stddev: 407.91956887702486,
              maximum: 4035.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9590200.0],
              [409800.0, 9590200.0],
              [409800.0, 9700000.0],
              [300000.0, 9700000.0],
              [300000.0, 9590200.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 300000.0, 0.0, -10.0, 9700000.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'safe-manifest': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCS_0511_50f546b423/manifest.safe',
        type: 'text/plain',
        roles: ['metadata'],
        title: 'SAFE manifest',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'granule-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCS_0511_50f546b423/MTD_TL.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'Granule metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'inspire-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCS_0511_50f546b423/INSPIRE.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'INSPIRE metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'product-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCS_0511_50f546b423/MTD_MSIL2A.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'Product metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'datastrip-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MCS_0511_50f546b423/MTD_DS.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'Datastrip metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [37.19920595120899, -3.7071632150939333],
          [38.18851847180446, -3.7071632150939333],
          [38.18851847180446, -2.7128288679416928],
          [37.19920595120899, -2.7128288679416928],
          [37.19920595120899, -3.7071632150939333],
        ],
      ],
    },
    collection: 'sentinel2-l2a-sen2cor',
    properties: {
      created: '2025-10-26T16:18:34.354633Z',
      datetime: '2025-10-26T07:40:31.024000Z',
      's2:mgrs_tile': '37MCS',
      'eo:snow_cover': 0.045374,
      'eo:cloud_cover': 10.81,
      'sat:orbit_state': 'descending',
      'processing:level': 'L2',
      'processing:version': '05.11',
      'production:origins': {
        in_ts: {
          ids: ['S2A_MSIL2A_20251026T074031_N0511_R092_T37MCS_20251026T110318'],
          endpoint: 'https://stac.dataspace.copernicus.eu/v1',
          collection: 'sentinel-2-l2a',
        },
      },
      'production:version': '0.2.1',
      'sat:absolute_orbit': 54029,
      'sat:relative_orbit': 92,
      'processing:datetime': '2025-10-26T11:03:18.000000Z',
      'processing:facility': 'ESA',
      'processing:software': {
        eometadatatool: '251021130925+dirty',
      },
      's2:water_percentage': 0.68151,
      's2:vegetation_percentage': 16.212821,
      's2:thin_cirrus_percentage': 0.494896,
      's2:cloud_shadow_percentage': 1.479767,
      's2:nodata_pixel_percentage': 4.319548,
      's2:unclassified_percentage': 1.650718,
      's2:high_proba_clouds_percentage': 7.830084,
      's2:medium_proba_clouds_percentage': 2.482618,
      'sat:platform_international_designator': '2015-028A',
    },
    stac_version: '1.1.0',
    stac_extensions: [
      'https://stac-extensions.github.io/eo/v1.1.0/schema.json',
      'https://stac-extensions.github.io/sat/v1.0.0/schema.json',
      'https://stac-extensions.github.io/processing/v1.2.0/schema.json',
      'https://stac-extensions.github.io/sentinel-2/v1.0.0/schema.json',
      'https://forge.inrae.fr/teledec/stac-extensions/schemas/-/raw/main/production/v1.1.0/schema.json',
      'https://stac-extensions.github.io/raster/v1.1.0/schema.json',
      'https://stac-extensions.github.io/projection/v2.0.0/schema.json',
      'https://stac-extensions.github.io/classification/v2.0.0/schema.json',
    ],
  },
  {
    id: 'S2A_20251026T074031024000Z_37MBT_0511_a6c095451a',
    bbox: [
      36.301595907941675, -2.8013980816997632, 37.28994983349999,
      -1.8072602246729041,
    ],
    type: 'Feature',
    links: [
      {
        rel: 'collection',
        type: 'application/json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/collections/sentinel2-l2a-sen2cor',
      },
      {
        rel: 'parent',
        type: 'application/json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/collections/sentinel2-l2a-sen2cor',
      },
      {
        rel: 'root',
        type: 'application/json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/',
      },
      {
        rel: 'self',
        type: 'application/geo+json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/collections/sentinel2-l2a-sen2cor/items/S2A_20251026T074031024000Z_37MBT_0511_a6c095451a',
      },
    ],
    assets: {
      QL: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MBT_0511_a6c095451a/S2A_MSIL2A_20251026T074031_N0511_R092_T37MBT_20251026T110318-ql.jpg',
        type: 'text/plain',
        roles: ['thumbnail', 'overview'],
        title: 'Quicklook',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      AOT: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MBT_0511_a6c095451a/T37MBT_20251026T074031_AOT_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['gsd:10m', 'data'],
        title: 'Aerosol optical thickness (AOT)',
        'proj:bbox': [199980.0, 9690220.0, 309780.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 273.0671900351541,
              stddev: 20.48989580115326,
              maximum: 333.0,
              minimum: 194.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [199980.0, 9690220.0],
              [309780.0, 9690220.0],
              [309780.0, 9800020.0],
              [199980.0, 9800020.0],
              [199980.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 199980.0, 0.0, -10.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B01: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MBT_0511_a6c095451a/T37MBT_20251026T074031_B01_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:60m', 'data'],
        title: 'Band 1 - Coastal aerosol - 60m',
        'proj:bbox': [199980.0, 9690220.0, 309780.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2148.034418942672,
              stddev: 2003.8424818466235,
              maximum: 20274.0,
              minimum: 408.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [199980.0, 9690220.0],
              [309780.0, 9690220.0],
              [309780.0, 9800020.0],
              [199980.0, 9800020.0],
              [199980.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 199980.0, 0.0, -20.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B02: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MBT_0511_a6c095451a/T37MBT_20251026T074031_B02_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 2 - Blue - 10m',
        'proj:bbox': [199980.0, 9690220.0, 309780.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2201.962555773391,
              stddev: 1854.2019323192278,
              maximum: 20399.0,
              minimum: 934.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [199980.0, 9690220.0],
              [309780.0, 9690220.0],
              [309780.0, 9800020.0],
              [199980.0, 9800020.0],
              [199980.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 199980.0, 0.0, -10.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B03: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MBT_0511_a6c095451a/T37MBT_20251026T074031_B03_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 3 - Green - 10m',
        'proj:bbox': [199980.0, 9690220.0, 309780.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2422.516808071931,
              stddev: 1667.2548997362007,
              maximum: 19331.0,
              minimum: 988.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [199980.0, 9690220.0],
              [309780.0, 9690220.0],
              [309780.0, 9800020.0],
              [199980.0, 9800020.0],
              [199980.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 199980.0, 0.0, -10.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B04: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MBT_0511_a6c095451a/T37MBT_20251026T074031_B04_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 4 - Red - 10m',
        'proj:bbox': [199980.0, 9690220.0, 309780.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2775.2831260140615,
              stddev: 1552.0256301263112,
              maximum: 18611.0,
              minimum: 960.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [199980.0, 9690220.0],
              [309780.0, 9690220.0],
              [309780.0, 9800020.0],
              [199980.0, 9800020.0],
              [199980.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 199980.0, 0.0, -10.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B05: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MBT_0511_a6c095451a/T37MBT_20251026T074031_B05_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 5 - Vegetation red edge 1 - 20m',
        'proj:bbox': [199980.0, 9690220.0, 309780.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3111.1647258653325,
              stddev: 1605.4236324828114,
              maximum: 18443.0,
              minimum: 1023.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [199980.0, 9690220.0],
              [309780.0, 9690220.0],
              [309780.0, 9800020.0],
              [199980.0, 9800020.0],
              [199980.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 199980.0, 0.0, -20.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B06: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MBT_0511_a6c095451a/T37MBT_20251026T074031_B06_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 6 - Vegetation red edge 2 - 20m',
        'proj:bbox': [199980.0, 9690220.0, 309780.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3331.6522698080043,
              stddev: 1481.1526402016589,
              maximum: 18198.0,
              minimum: 1025.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [199980.0, 9690220.0],
              [309780.0, 9690220.0],
              [309780.0, 9800020.0],
              [199980.0, 9800020.0],
              [199980.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 199980.0, 0.0, -20.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B07: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MBT_0511_a6c095451a/T37MBT_20251026T074031_B07_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 7 - Vegetation red edge 3 - 20m',
        'proj:bbox': [199980.0, 9690220.0, 309780.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3486.7057784613303,
              stddev: 1411.369003285596,
              maximum: 17479.0,
              minimum: 1031.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [199980.0, 9690220.0],
              [309780.0, 9690220.0],
              [309780.0, 9800020.0],
              [199980.0, 9800020.0],
              [199980.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 199980.0, 0.0, -20.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B08: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MBT_0511_a6c095451a/T37MBT_20251026T074031_B08_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 8 - NIR - 10m',
        'proj:bbox': [199980.0, 9690220.0, 309780.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3536.6836803677666,
              stddev: 1401.3410193251473,
              maximum: 17800.0,
              minimum: 1038.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [199980.0, 9690220.0],
              [309780.0, 9690220.0],
              [309780.0, 9800020.0],
              [199980.0, 9800020.0],
              [199980.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 199980.0, 0.0, -10.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B09: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MBT_0511_a6c095451a/T37MBT_20251026T074031_B09_60m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:60m', 'data'],
        title: 'Band 9 - Water vapor - 60m',
        'proj:bbox': [199980.0, 9690220.0, 309780.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [1830, 1830],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 4107.994522415667,
              stddev: 2630.414393825349,
              maximum: 17816.0,
              minimum: 958.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [199980.0, 9690220.0],
              [309780.0, 9690220.0],
              [309780.0, 9800020.0],
              [199980.0, 9800020.0],
              [199980.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          60.0, 0.0, 199980.0, 0.0, -60.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B11: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MBT_0511_a6c095451a/T37MBT_20251026T074031_B11_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 11 - SWIR (1.6) - 20m',
        'proj:bbox': [199980.0, 9690220.0, 309780.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 4387.74933240941,
              stddev: 1116.1143889451678,
              maximum: 11816.0,
              minimum: 1024.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [199980.0, 9690220.0],
              [309780.0, 9690220.0],
              [309780.0, 9800020.0],
              [199980.0, 9800020.0],
              [199980.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 199980.0, 0.0, -20.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B12: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MBT_0511_a6c095451a/T37MBT_20251026T074031_B12_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 12 - SWIR (2.2) - 20m',
        'proj:bbox': [199980.0, 9690220.0, 309780.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3665.266309491617,
              stddev: 973.9993531516616,
              maximum: 10463.0,
              minimum: 1055.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [199980.0, 9690220.0],
              [309780.0, 9690220.0],
              [309780.0, 9800020.0],
              [199980.0, 9800020.0],
              [199980.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 199980.0, 0.0, -20.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B8A: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MBT_0511_a6c095451a/T37MBT_20251026T074031_B08_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 8A - Vegetation red edge 4 - 20m',
        'proj:bbox': [199980.0, 9690220.0, 309780.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3536.6836803678,
              stddev: 1401.3410193251,
              maximum: 17800.0,
              minimum: 1038.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [199980.0, 9690220.0],
              [309780.0, 9690220.0],
              [309780.0, 9800020.0],
              [199980.0, 9800020.0],
              [199980.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 199980.0, 0.0, -10.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      SCL: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MBT_0511_a6c095451a/T37MBT_20251026T074031_SCL_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['gsd:60m', 'data'],
        title: 'Scene classfication map (SCL)',
        'proj:bbox': [199980.0, 9690220.0, 309780.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 1.0,
            nodata: 0.0,
            offset: 0.0,
            sampling: 'area',
            data_type: 'uint8',
            statistics: {
              mean: 5.223296376419686,
              stddev: 1.2256401972976683,
              maximum: 10.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [199980.0, 9690220.0],
              [309780.0, 9690220.0],
              [309780.0, 9800020.0],
              [199980.0, 9800020.0],
              [199980.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 199980.0, 0.0, -20.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'classification:classes': [
          {
            name: 'no_data',
            value: 0,
            nodata: true,
            percentage: 0.0,
          },
          {
            name: 'saturated_or_defective',
            value: 1,
            percentage: 0.0,
          },
          {
            name: 'dark_area_pixels',
            value: 2,
            percentage: 0.068985,
          },
          {
            name: 'cloud_shadows',
            value: 3,
            percentage: 5.806026,
          },
          {
            name: 'vegetation',
            value: 4,
            percentage: 2.347414,
          },
          {
            name: 'not_vegetated',
            value: 5,
            percentage: 81.410027,
          },
          {
            name: 'water',
            value: 6,
            percentage: 0.021659,
          },
          {
            name: 'unclassified',
            value: 7,
            percentage: 0.362617,
          },
          {
            name: 'cloud_medium_probability',
            value: 8,
            percentage: 4.534275,
          },
          {
            name: 'cloud_high_probability',
            value: 9,
            percentage: 5.446525,
          },
          {
            name: 'thin_cirrus',
            value: 10,
            percentage: 0.002475,
          },
          {
            name: 'snow',
            value: 11,
            percentage: 0.0,
          },
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      WVP: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MBT_0511_a6c095451a/T37MBT_20251026T074031_WVP_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['gsd:10m', 'data'],
        title: 'Water vapour (WVP)',
        'proj:bbox': [199980.0, 9690220.0, 309780.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 1909.6408869659276,
              stddev: 266.9872086087252,
              maximum: 5084.0,
              minimum: 305.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [199980.0, 9690220.0],
              [309780.0, 9690220.0],
              [309780.0, 9800020.0],
              [199980.0, 9800020.0],
              [199980.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 199980.0, 0.0, -10.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'safe-manifest': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MBT_0511_a6c095451a/manifest.safe',
        type: 'text/plain',
        roles: ['metadata'],
        title: 'SAFE manifest',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'granule-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MBT_0511_a6c095451a/MTD_TL.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'Granule metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'inspire-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MBT_0511_a6c095451a/INSPIRE.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'INSPIRE metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'product-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MBT_0511_a6c095451a/MTD_MSIL2A.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'Product metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'datastrip-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2A_20251026T074031024000Z_37MBT_0511_a6c095451a/MTD_DS.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'Datastrip metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [36.301595907941675, -2.8013980816997632],
          [37.28994983349999, -2.8013980816997632],
          [37.28994983349999, -1.8072602246729041],
          [36.301595907941675, -1.8072602246729041],
          [36.301595907941675, -2.8013980816997632],
        ],
      ],
    },
    collection: 'sentinel2-l2a-sen2cor',
    properties: {
      created: '2025-10-26T16:18:42.860457Z',
      datetime: '2025-10-26T07:40:31.024000Z',
      's2:mgrs_tile': '37MBT',
      'eo:snow_cover': 0.0,
      'eo:cloud_cover': 9.98,
      'sat:orbit_state': 'descending',
      'processing:level': 'L2',
      'processing:version': '05.11',
      'production:origins': {
        in_ts: {
          ids: ['S2A_MSIL2A_20251026T074031_N0511_R092_T37MBT_20251026T110318'],
          endpoint: 'https://stac.dataspace.copernicus.eu/v1',
          collection: 'sentinel-2-l2a',
        },
      },
      'production:version': '0.2.1',
      'sat:absolute_orbit': 54029,
      'sat:relative_orbit': 92,
      'processing:datetime': '2025-10-26T11:03:18.000000Z',
      'processing:facility': 'ESA',
      'processing:software': {
        eometadatatool: '251021130925+dirty',
      },
      's2:water_percentage': 0.021659,
      's2:vegetation_percentage': 2.347414,
      's2:thin_cirrus_percentage': 0.002475,
      's2:cloud_shadow_percentage': 5.806026,
      's2:nodata_pixel_percentage': 0.0,
      's2:unclassified_percentage': 0.362617,
      's2:high_proba_clouds_percentage': 5.446525,
      's2:medium_proba_clouds_percentage': 4.534275,
      'sat:platform_international_designator': '2015-028A',
    },
    stac_version: '1.1.0',
    stac_extensions: [
      'https://stac-extensions.github.io/eo/v1.1.0/schema.json',
      'https://stac-extensions.github.io/sat/v1.0.0/schema.json',
      'https://stac-extensions.github.io/processing/v1.2.0/schema.json',
      'https://stac-extensions.github.io/sentinel-2/v1.0.0/schema.json',
      'https://forge.inrae.fr/teledec/stac-extensions/schemas/-/raw/main/production/v1.1.0/schema.json',
      'https://stac-extensions.github.io/raster/v1.1.0/schema.json',
      'https://stac-extensions.github.io/projection/v2.0.0/schema.json',
      'https://stac-extensions.github.io/classification/v2.0.0/schema.json',
    ],
  },
  {
    id: 'S2B_20251026T072909024000Z_37MCT_0511_cb06f7c989',
    bbox: [
      37.20081091274068, -2.8023718310552685, 38.1890210486567,
      -1.8083796234845473,
    ],
    type: 'Feature',
    links: [
      {
        rel: 'collection',
        type: 'application/json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/collections/sentinel2-l2a-sen2cor',
      },
      {
        rel: 'parent',
        type: 'application/json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/collections/sentinel2-l2a-sen2cor',
      },
      {
        rel: 'root',
        type: 'application/json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/',
      },
      {
        rel: 'self',
        type: 'application/geo+json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/collections/sentinel2-l2a-sen2cor/items/S2B_20251026T072909024000Z_37MCT_0511_cb06f7c989',
      },
    ],
    assets: {
      QL: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCT_0511_cb06f7c989/S2B_MSIL2A_20251026T072909_N0511_R049_T37MCT_20251026T092830-ql.jpg',
        type: 'text/plain',
        roles: ['thumbnail', 'overview'],
        title: 'Quicklook',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      AOT: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCT_0511_cb06f7c989/T37MCT_20251026T072909_AOT_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['gsd:10m', 'data'],
        title: 'Aerosol optical thickness (AOT)',
        'proj:bbox': [300000.0, 9690220.0, 409800.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 214.73830450808052,
              stddev: 8.615095037586704,
              maximum: 233.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9690220.0],
              [409800.0, 9690220.0],
              [409800.0, 9800020.0],
              [300000.0, 9800020.0],
              [300000.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 300000.0, 0.0, -10.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B01: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCT_0511_cb06f7c989/T37MCT_20251026T072909_B01_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:60m', 'data'],
        title: 'Band 1 - Coastal aerosol - 60m',
        'proj:bbox': [300000.0, 9690220.0, 409800.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 1661.3240635641316,
              stddev: 94.2459709580746,
              maximum: 2054.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9690220.0],
              [409800.0, 9690220.0],
              [409800.0, 9800020.0],
              [300000.0, 9800020.0],
              [300000.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 300000.0, 0.0, -20.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B02: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCT_0511_cb06f7c989/T37MCT_20251026T072909_B02_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 2 - Blue - 10m',
        'proj:bbox': [300000.0, 9690220.0, 409800.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 1816.8998018681007,
              stddev: 176.12989453255852,
              maximum: 3002.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9690220.0],
              [409800.0, 9690220.0],
              [409800.0, 9800020.0],
              [300000.0, 9800020.0],
              [300000.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 300000.0, 0.0, -10.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B03: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCT_0511_cb06f7c989/T37MCT_20251026T072909_B03_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 3 - Green - 10m',
        'proj:bbox': [300000.0, 9690220.0, 409800.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2108.736201528446,
              stddev: 228.93580092533045,
              maximum: 3412.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9690220.0],
              [409800.0, 9690220.0],
              [409800.0, 9800020.0],
              [300000.0, 9800020.0],
              [300000.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 300000.0, 0.0, -10.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B04: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCT_0511_cb06f7c989/T37MCT_20251026T072909_B04_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 4 - Red - 10m',
        'proj:bbox': [300000.0, 9690220.0, 409800.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2747.29428409734,
              stddev: 381.630378614317,
              maximum: 4136.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9690220.0],
              [409800.0, 9690220.0],
              [409800.0, 9800020.0],
              [300000.0, 9800020.0],
              [300000.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 300000.0, 0.0, -10.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B05: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCT_0511_cb06f7c989/T37MCT_20251026T072909_B05_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 5 - Vegetation red edge 1 - 20m',
        'proj:bbox': [300000.0, 9690220.0, 409800.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3100.704922644163,
              stddev: 442.93772440071814,
              maximum: 4340.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9690220.0],
              [409800.0, 9690220.0],
              [409800.0, 9800020.0],
              [300000.0, 9800020.0],
              [300000.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 300000.0, 0.0, -20.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B06: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCT_0511_cb06f7c989/T37MCT_20251026T072909_B06_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 6 - Vegetation red edge 2 - 20m',
        'proj:bbox': [300000.0, 9690220.0, 409800.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3266.419127988748,
              stddev: 444.7988997077632,
              maximum: 4626.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9690220.0],
              [409800.0, 9690220.0],
              [409800.0, 9800020.0],
              [300000.0, 9800020.0],
              [300000.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 300000.0, 0.0, -20.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B07: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCT_0511_cb06f7c989/T37MCT_20251026T072909_B07_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 7 - Vegetation red edge 3 - 20m',
        'proj:bbox': [300000.0, 9690220.0, 409800.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3505.8514656144307,
              stddev: 438.48065121374833,
              maximum: 5020.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9690220.0],
              [409800.0, 9690220.0],
              [409800.0, 9800020.0],
              [300000.0, 9800020.0],
              [300000.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 300000.0, 0.0, -20.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B08: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCT_0511_cb06f7c989/T37MCT_20251026T072909_B08_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 8 - NIR - 10m',
        'proj:bbox': [300000.0, 9690220.0, 409800.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3575.1966101694916,
              stddev: 410.3624259925306,
              maximum: 5396.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9690220.0],
              [409800.0, 9690220.0],
              [409800.0, 9800020.0],
              [300000.0, 9800020.0],
              [300000.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 300000.0, 0.0, -10.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B09: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCT_0511_cb06f7c989/T37MCT_20251026T072909_B09_60m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:60m', 'data'],
        title: 'Band 9 - Water vapor - 60m',
        'proj:bbox': [300000.0, 9690220.0, 409800.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [1830, 1830],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3667.0652503793626,
              stddev: 778.4654277140571,
              maximum: 5284.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9690220.0],
              [409800.0, 9690220.0],
              [409800.0, 9800020.0],
              [300000.0, 9800020.0],
              [300000.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          60.0, 0.0, 300000.0, 0.0, -60.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B11: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCT_0511_cb06f7c989/T37MCT_20251026T072909_B11_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 11 - SWIR (1.6) - 20m',
        'proj:bbox': [300000.0, 9690220.0, 409800.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 4995.607986501687,
              stddev: 644.4711235696045,
              maximum: 6459.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9690220.0],
              [409800.0, 9690220.0],
              [409800.0, 9800020.0],
              [300000.0, 9800020.0],
              [300000.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 300000.0, 0.0, -20.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B12: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCT_0511_cb06f7c989/T37MCT_20251026T072909_B12_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 12 - SWIR (2.2) - 20m',
        'proj:bbox': [300000.0, 9690220.0, 409800.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 4195.195786516854,
              stddev: 646.9369228705824,
              maximum: 5991.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9690220.0],
              [409800.0, 9690220.0],
              [409800.0, 9800020.0],
              [300000.0, 9800020.0],
              [300000.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 300000.0, 0.0, -20.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B8A: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCT_0511_cb06f7c989/T37MCT_20251026T072909_B08_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 8A - Vegetation red edge 4 - 20m',
        'proj:bbox': [300000.0, 9690220.0, 409800.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3575.1966101695,
              stddev: 410.36242599253,
              maximum: 5396.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9690220.0],
              [409800.0, 9690220.0],
              [409800.0, 9800020.0],
              [300000.0, 9800020.0],
              [300000.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 300000.0, 0.0, -10.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      SCL: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCT_0511_cb06f7c989/T37MCT_20251026T072909_SCL_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['gsd:60m', 'data'],
        title: 'Scene classfication map (SCL)',
        'proj:bbox': [300000.0, 9690220.0, 409800.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 1.0,
            nodata: 0.0,
            offset: 0.0,
            sampling: 'area',
            data_type: 'uint8',
            statistics: {
              mean: 4.9892229154849685,
              stddev: 0.1558014709551707,
              maximum: 6.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9690220.0],
              [409800.0, 9690220.0],
              [409800.0, 9800020.0],
              [300000.0, 9800020.0],
              [300000.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 300000.0, 0.0, -20.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'classification:classes': [
          {
            name: 'no_data',
            value: 0,
            nodata: true,
            percentage: 96.922719,
          },
          {
            name: 'saturated_or_defective',
            value: 1,
            percentage: 0.0,
          },
          {
            name: 'dark_area_pixels',
            value: 2,
            percentage: 0.000216,
          },
          {
            name: 'cloud_shadows',
            value: 3,
            percentage: 0.0,
          },
          {
            name: 'vegetation',
            value: 4,
            percentage: 0.56604,
          },
          {
            name: 'not_vegetated',
            value: 5,
            percentage: 99.400967,
          },
          {
            name: 'water',
            value: 6,
            percentage: 0.004528,
          },
          {
            name: 'unclassified',
            value: 7,
            percentage: 0.02814,
          },
          {
            name: 'cloud_medium_probability',
            value: 8,
            percentage: 0.0,
          },
          {
            name: 'cloud_high_probability',
            value: 9,
            percentage: 0.0,
          },
          {
            name: 'thin_cirrus',
            value: 10,
            percentage: 0.000108,
          },
          {
            name: 'snow',
            value: 11,
            percentage: 0.0,
          },
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      WVP: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCT_0511_cb06f7c989/T37MCT_20251026T072909_WVP_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['gsd:10m', 'data'],
        title: 'Water vapour (WVP)',
        'proj:bbox': [300000.0, 9690220.0, 409800.0, 9800020.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2415.218475488807,
              stddev: 167.29265919731392,
              maximum: 3295.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9690220.0],
              [409800.0, 9690220.0],
              [409800.0, 9800020.0],
              [300000.0, 9800020.0],
              [300000.0, 9690220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 300000.0, 0.0, -10.0, 9800020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'safe-manifest': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCT_0511_cb06f7c989/manifest.safe',
        type: 'text/plain',
        roles: ['metadata'],
        title: 'SAFE manifest',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'granule-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCT_0511_cb06f7c989/MTD_TL.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'Granule metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'inspire-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCT_0511_cb06f7c989/INSPIRE.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'INSPIRE metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'product-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCT_0511_cb06f7c989/MTD_MSIL2A.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'Product metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'datastrip-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCT_0511_cb06f7c989/MTD_DS.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'Datastrip metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [37.20081091274068, -2.8023718310552685],
          [38.1890210486567, -2.8023718310552685],
          [38.1890210486567, -1.8083796234845473],
          [37.20081091274068, -1.8083796234845473],
          [37.20081091274068, -2.8023718310552685],
        ],
      ],
    },
    collection: 'sentinel2-l2a-sen2cor',
    properties: {
      created: '2025-10-26T12:08:05.635802Z',
      datetime: '2025-10-26T07:29:09.024000Z',
      's2:mgrs_tile': '37MCT',
      'eo:snow_cover': 0.0,
      'eo:cloud_cover': 0.0,
      'sat:orbit_state': 'descending',
      'processing:level': 'L2',
      'processing:version': '05.11',
      'production:origins': {
        in_ts: {
          ids: ['S2B_MSIL2A_20251026T072909_N0511_R049_T37MCT_20251026T092830'],
          endpoint: 'https://stac.dataspace.copernicus.eu/v1',
          collection: 'sentinel-2-l2a',
        },
      },
      'production:version': '0.2.1',
      'sat:absolute_orbit': 45120,
      'sat:relative_orbit': 49,
      'processing:datetime': '2025-10-26T09:28:30.000000Z',
      'processing:facility': 'ESA',
      'processing:software': {
        eometadatatool: '251021130925+dirty',
      },
      's2:water_percentage': 0.004528,
      's2:vegetation_percentage': 0.56604,
      's2:thin_cirrus_percentage': 0.000108,
      's2:cloud_shadow_percentage': 0.0,
      's2:nodata_pixel_percentage': 96.922719,
      's2:unclassified_percentage': 0.02814,
      's2:high_proba_clouds_percentage': 0.0,
      's2:medium_proba_clouds_percentage': 0.0,
      'sat:platform_international_designator': '2017-013A',
    },
    stac_version: '1.1.0',
    stac_extensions: [
      'https://stac-extensions.github.io/eo/v1.1.0/schema.json',
      'https://stac-extensions.github.io/sat/v1.0.0/schema.json',
      'https://stac-extensions.github.io/processing/v1.2.0/schema.json',
      'https://stac-extensions.github.io/sentinel-2/v1.0.0/schema.json',
      'https://forge.inrae.fr/teledec/stac-extensions/schemas/-/raw/main/production/v1.1.0/schema.json',
      'https://stac-extensions.github.io/raster/v1.1.0/schema.json',
      'https://stac-extensions.github.io/projection/v2.0.0/schema.json',
      'https://stac-extensions.github.io/classification/v2.0.0/schema.json',
    ],
  },
  {
    id: 'S2B_20251026T072909024000Z_37MCS_0511_f42897f7b7',
    bbox: [
      37.19920595120899, -3.7071632150939333, 38.18851847180446,
      -2.7128288679416928,
    ],
    type: 'Feature',
    links: [
      {
        rel: 'collection',
        type: 'application/json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/collections/sentinel2-l2a-sen2cor',
      },
      {
        rel: 'parent',
        type: 'application/json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/collections/sentinel2-l2a-sen2cor',
      },
      {
        rel: 'root',
        type: 'application/json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/',
      },
      {
        rel: 'self',
        type: 'application/geo+json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/collections/sentinel2-l2a-sen2cor/items/S2B_20251026T072909024000Z_37MCS_0511_f42897f7b7',
      },
    ],
    assets: {
      QL: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCS_0511_f42897f7b7/S2B_MSIL2A_20251026T072909_N0511_R049_T37MCS_20251026T092830-ql.jpg',
        type: 'text/plain',
        roles: ['thumbnail', 'overview'],
        title: 'Quicklook',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      AOT: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCS_0511_f42897f7b7/T37MCS_20251026T072909_AOT_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['gsd:10m', 'data'],
        title: 'Aerosol optical thickness (AOT)',
        'proj:bbox': [300000.0, 9590200.0, 409800.0, 9700000.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 194.57762706324561,
              stddev: 8.761697545037931,
              maximum: 216.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9590200.0],
              [409800.0, 9590200.0],
              [409800.0, 9700000.0],
              [300000.0, 9700000.0],
              [300000.0, 9590200.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 300000.0, 0.0, -10.0, 9700000.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B01: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCS_0511_f42897f7b7/T37MCS_20251026T072909_B01_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:60m', 'data'],
        title: 'Band 1 - Coastal aerosol - 60m',
        'proj:bbox': [300000.0, 9590200.0, 409800.0, 9700000.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 1697.0513459417507,
              stddev: 106.99183914661421,
              maximum: 5998.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9590200.0],
              [409800.0, 9590200.0],
              [409800.0, 9700000.0],
              [300000.0, 9700000.0],
              [300000.0, 9590200.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 300000.0, 0.0, -20.0, 9700000.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B02: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCS_0511_f42897f7b7/T37MCS_20251026T072909_B02_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 2 - Blue - 10m',
        'proj:bbox': [300000.0, 9590200.0, 409800.0, 9700000.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 1861.2071443151663,
              stddev: 149.73058406225155,
              maximum: 5841.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9590200.0],
              [409800.0, 9590200.0],
              [409800.0, 9700000.0],
              [300000.0, 9700000.0],
              [300000.0, 9590200.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 300000.0, 0.0, -10.0, 9700000.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B03: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCS_0511_f42897f7b7/T37MCS_20251026T072909_B03_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 3 - Green - 10m',
        'proj:bbox': [300000.0, 9590200.0, 409800.0, 9700000.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2091.6634968573994,
              stddev: 178.87538630417228,
              maximum: 5943.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9590200.0],
              [409800.0, 9590200.0],
              [409800.0, 9700000.0],
              [300000.0, 9700000.0],
              [300000.0, 9590200.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 300000.0, 0.0, -10.0, 9700000.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B04: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCS_0511_f42897f7b7/T37MCS_20251026T072909_B04_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 4 - Red - 10m',
        'proj:bbox': [300000.0, 9590200.0, 409800.0, 9700000.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2623.258330274481,
              stddev: 284.30144384535504,
              maximum: 6302.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9590200.0],
              [409800.0, 9590200.0],
              [409800.0, 9700000.0],
              [300000.0, 9700000.0],
              [300000.0, 9590200.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 300000.0, 0.0, -10.0, 9700000.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B05: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCS_0511_f42897f7b7/T37MCS_20251026T072909_B05_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 5 - Vegetation red edge 1 - 20m',
        'proj:bbox': [300000.0, 9590200.0, 409800.0, 9700000.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2971.602640371608,
              stddev: 302.47649095968086,
              maximum: 6809.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9590200.0],
              [409800.0, 9590200.0],
              [409800.0, 9700000.0],
              [300000.0, 9700000.0],
              [300000.0, 9590200.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 300000.0, 0.0, -20.0, 9700000.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B06: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCS_0511_f42897f7b7/T37MCS_20251026T072909_B06_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 6 - Vegetation red edge 2 - 20m',
        'proj:bbox': [300000.0, 9590200.0, 409800.0, 9700000.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3145.1398353439845,
              stddev: 293.2181729295304,
              maximum: 6724.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9590200.0],
              [409800.0, 9590200.0],
              [409800.0, 9700000.0],
              [300000.0, 9700000.0],
              [300000.0, 9590200.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 300000.0, 0.0, -20.0, 9700000.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B07: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCS_0511_f42897f7b7/T37MCS_20251026T072909_B07_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 7 - Vegetation red edge 3 - 20m',
        'proj:bbox': [300000.0, 9590200.0, 409800.0, 9700000.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3380.911400146783,
              stddev: 304.7744239621301,
              maximum: 6851.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9590200.0],
              [409800.0, 9590200.0],
              [409800.0, 9700000.0],
              [300000.0, 9700000.0],
              [300000.0, 9590200.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 300000.0, 0.0, -20.0, 9700000.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B08: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCS_0511_f42897f7b7/T37MCS_20251026T072909_B08_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 8 - NIR - 10m',
        'proj:bbox': [300000.0, 9590200.0, 409800.0, 9700000.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3475.9307221542226,
              stddev: 310.41601666362914,
              maximum: 7129.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9590200.0],
              [409800.0, 9590200.0],
              [409800.0, 9700000.0],
              [300000.0, 9700000.0],
              [300000.0, 9590200.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 300000.0, 0.0, -10.0, 9700000.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B09: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCS_0511_f42897f7b7/T37MCS_20251026T072909_B09_60m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:60m', 'data'],
        title: 'Band 9 - Water vapor - 60m',
        'proj:bbox': [300000.0, 9590200.0, 409800.0, 9700000.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [1830, 1830],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3656.759041058642,
              stddev: 493.6109465977888,
              maximum: 13180.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9590200.0],
              [409800.0, 9590200.0],
              [409800.0, 9700000.0],
              [300000.0, 9700000.0],
              [300000.0, 9590200.0],
            ],
          ],
        },
        'proj:transform': [
          60.0, 0.0, 300000.0, 0.0, -60.0, 9700000.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B11: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCS_0511_f42897f7b7/T37MCS_20251026T072909_B11_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 11 - SWIR (1.6) - 20m',
        'proj:bbox': [300000.0, 9590200.0, 409800.0, 9700000.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 4926.676731866341,
              stddev: 515.471470223385,
              maximum: 7404.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9590200.0],
              [409800.0, 9590200.0],
              [409800.0, 9700000.0],
              [300000.0, 9700000.0],
              [300000.0, 9590200.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 300000.0, 0.0, -20.0, 9700000.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B12: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCS_0511_f42897f7b7/T37MCS_20251026T072909_B12_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 12 - SWIR (2.2) - 20m',
        'proj:bbox': [300000.0, 9590200.0, 409800.0, 9700000.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3951.4296308369326,
              stddev: 434.81857225039914,
              maximum: 6074.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9590200.0],
              [409800.0, 9590200.0],
              [409800.0, 9700000.0],
              [300000.0, 9700000.0],
              [300000.0, 9590200.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 300000.0, 0.0, -20.0, 9700000.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B8A: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCS_0511_f42897f7b7/T37MCS_20251026T072909_B08_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 8A - Vegetation red edge 4 - 20m',
        'proj:bbox': [300000.0, 9590200.0, 409800.0, 9700000.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3475.9307221542,
              stddev: 310.41601666363,
              maximum: 7129.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9590200.0],
              [409800.0, 9590200.0],
              [409800.0, 9700000.0],
              [300000.0, 9700000.0],
              [300000.0, 9590200.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 300000.0, 0.0, -10.0, 9700000.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      SCL: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCS_0511_f42897f7b7/T37MCS_20251026T072909_SCL_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['gsd:60m', 'data'],
        title: 'Scene classfication map (SCL)',
        'proj:bbox': [300000.0, 9590200.0, 409800.0, 9700000.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 1.0,
            nodata: 0.0,
            offset: 0.0,
            sampling: 'area',
            data_type: 'uint8',
            statistics: {
              mean: 4.992851599199379,
              stddev: 0.1379308468128421,
              maximum: 9.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9590200.0],
              [409800.0, 9590200.0],
              [409800.0, 9700000.0],
              [300000.0, 9700000.0],
              [300000.0, 9590200.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 300000.0, 0.0, -20.0, 9700000.0, 0.0, 0.0, 1.0,
        ],
        'classification:classes': [
          {
            name: 'no_data',
            value: 0,
            nodata: true,
            percentage: 79.097474,
          },
          {
            name: 'saturated_or_defective',
            value: 1,
            percentage: 0.0,
          },
          {
            name: 'dark_area_pixels',
            value: 2,
            percentage: 0.005159,
          },
          {
            name: 'cloud_shadows',
            value: 3,
            percentage: 0.07573,
          },
          {
            name: 'vegetation',
            value: 4,
            percentage: 0.649504,
          },
          {
            name: 'not_vegetated',
            value: 5,
            percentage: 99.157071,
          },
          {
            name: 'water',
            value: 6,
            percentage: 0.000048,
          },
          {
            name: 'unclassified',
            value: 7,
            percentage: 0.068793,
          },
          {
            name: 'cloud_medium_probability',
            value: 8,
            percentage: 0.038492,
          },
          {
            name: 'cloud_high_probability',
            value: 9,
            percentage: 0.00519,
          },
          {
            name: 'thin_cirrus',
            value: 10,
            percentage: 0.000016,
          },
          {
            name: 'snow',
            value: 11,
            percentage: 0.0,
          },
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      WVP: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCS_0511_f42897f7b7/T37MCS_20251026T072909_WVP_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['gsd:10m', 'data'],
        title: 'Water vapour (WVP)',
        'proj:bbox': [300000.0, 9590200.0, 409800.0, 9700000.0],
        'proj:code': 'EPSG:32737',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2181.5292243597596,
              stddev: 184.8641476529379,
              maximum: 2903.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [300000.0, 9590200.0],
              [409800.0, 9590200.0],
              [409800.0, 9700000.0],
              [300000.0, 9700000.0],
              [300000.0, 9590200.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 300000.0, 0.0, -10.0, 9700000.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'safe-manifest': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCS_0511_f42897f7b7/manifest.safe',
        type: 'text/plain',
        roles: ['metadata'],
        title: 'SAFE manifest',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'granule-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCS_0511_f42897f7b7/MTD_TL.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'Granule metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'inspire-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCS_0511_f42897f7b7/INSPIRE.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'INSPIRE metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'product-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCS_0511_f42897f7b7/MTD_MSIL2A.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'Product metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'datastrip-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2B_20251026T072909024000Z_37MCS_0511_f42897f7b7/MTD_DS.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'Datastrip metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [37.19920595120899, -3.7071632150939333],
          [38.18851847180446, -3.7071632150939333],
          [38.18851847180446, -2.7128288679416928],
          [37.19920595120899, -2.7128288679416928],
          [37.19920595120899, -3.7071632150939333],
        ],
      ],
    },
    collection: 'sentinel2-l2a-sen2cor',
    properties: {
      created: '2025-10-26T12:10:10.548639Z',
      datetime: '2025-10-26T07:29:09.024000Z',
      's2:mgrs_tile': '37MCS',
      'eo:snow_cover': 0.0,
      'eo:cloud_cover': 0.04,
      'sat:orbit_state': 'descending',
      'processing:level': 'L2',
      'processing:version': '05.11',
      'production:origins': {
        in_ts: {
          ids: ['S2B_MSIL2A_20251026T072909_N0511_R049_T37MCS_20251026T092830'],
          endpoint: 'https://stac.dataspace.copernicus.eu/v1',
          collection: 'sentinel-2-l2a',
        },
      },
      'production:version': '0.2.1',
      'sat:absolute_orbit': 45120,
      'sat:relative_orbit': 49,
      'processing:datetime': '2025-10-26T09:28:30.000000Z',
      'processing:facility': 'ESA',
      'processing:software': {
        eometadatatool: '251021130925+dirty',
      },
      's2:water_percentage': 0.000048,
      's2:vegetation_percentage': 0.649504,
      's2:thin_cirrus_percentage': 0.000016,
      's2:cloud_shadow_percentage': 0.07573,
      's2:nodata_pixel_percentage': 79.097474,
      's2:unclassified_percentage': 0.068793,
      's2:high_proba_clouds_percentage': 0.00519,
      's2:medium_proba_clouds_percentage': 0.038492,
      'sat:platform_international_designator': '2017-013A',
    },
    stac_version: '1.1.0',
    stac_extensions: [
      'https://stac-extensions.github.io/eo/v1.1.0/schema.json',
      'https://stac-extensions.github.io/sat/v1.0.0/schema.json',
      'https://stac-extensions.github.io/processing/v1.2.0/schema.json',
      'https://stac-extensions.github.io/sentinel-2/v1.0.0/schema.json',
      'https://forge.inrae.fr/teledec/stac-extensions/schemas/-/raw/main/production/v1.1.0/schema.json',
      'https://stac-extensions.github.io/raster/v1.1.0/schema.json',
      'https://stac-extensions.github.io/projection/v2.0.0/schema.json',
      'https://stac-extensions.github.io/classification/v2.0.0/schema.json',
    ],
  },
  {
    id: 'S2C_20251029T071221025000Z_38LQH_0511_afbd406add',
    bbox: [
      46.86291158102522, -16.36092517176475, 47.89922475984138,
      -15.357911490883158,
    ],
    type: 'Feature',
    links: [
      {
        rel: 'collection',
        type: 'application/json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/collections/sentinel2-l2a-sen2cor',
      },
      {
        rel: 'parent',
        type: 'application/json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/collections/sentinel2-l2a-sen2cor',
      },
      {
        rel: 'root',
        type: 'application/json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/',
      },
      {
        rel: 'self',
        type: 'application/geo+json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/collections/sentinel2-l2a-sen2cor/items/S2C_20251029T071221025000Z_38LQH_0511_afbd406add',
      },
    ],
    assets: {
      QL: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/S2C_MSIL2A_20251029T071221_N0511_R020_T38LQH_20251029T100609-ql.jpg',
        type: 'text/plain',
        roles: ['thumbnail', 'overview'],
        title: 'Quicklook',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      AOT: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/T38LQH_20251029T071221_AOT_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['gsd:10m', 'data'],
        title: 'Aerosol optical thickness (AOT)',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 142.66166614282923,
              stddev: 8.961817856614603,
              maximum: 234.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 699960.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B01: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/T38LQH_20251029T071221_B01_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:60m', 'data'],
        title: 'Band 1 - Coastal aerosol - 60m',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 1591.2106300383102,
              stddev: 225.95869899049828,
              maximum: 9512.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 699960.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B02: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/T38LQH_20251029T071221_B02_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 2 - Blue - 10m',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 1713.5494946063025,
              stddev: 300.99291272334403,
              maximum: 9235.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 699960.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B03: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/T38LQH_20251029T071221_B03_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 3 - Green - 10m',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2063.9967723303776,
              stddev: 399.1768910785376,
              maximum: 8793.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 699960.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B04: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/T38LQH_20251029T071221_B04_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 4 - Red - 10m',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2558.4008613001047,
              stddev: 625.9331934449615,
              maximum: 8948.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 699960.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B05: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/T38LQH_20251029T071221_B05_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 5 - Vegetation red edge 1 - 20m',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2951.876247420229,
              stddev: 639.8423130787368,
              maximum: 9614.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 699960.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B06: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/T38LQH_20251029T071221_B06_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 6 - Vegetation red edge 2 - 20m',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3259.433204810273,
              stddev: 654.0494748947369,
              maximum: 9424.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 699960.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B07: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/T38LQH_20251029T071221_B07_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 7 - Vegetation red edge 3 - 20m',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3428.7777249333312,
              stddev: 695.1470061212835,
              maximum: 9174.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 699960.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B08: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/T38LQH_20251029T071221_B08_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 8 - NIR - 10m',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3557.1398673269177,
              stddev: 751.1504752798652,
              maximum: 8995.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 699960.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B09: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/T38LQH_20251029T071221_B09_60m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:60m', 'data'],
        title: 'Band 9 - Water vapor - 60m',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [1830, 1830],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3715.20753614022,
              stddev: 743.6936464813383,
              maximum: 16740.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          60.0, 0.0, 699960.0, 0.0, -60.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B11: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/T38LQH_20251029T071221_B11_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 11 - SWIR (1.6) - 20m',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 4293.1699486265015,
              stddev: 1044.9801549524539,
              maximum: 9149.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 699960.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B12: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/T38LQH_20251029T071221_B12_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 12 - SWIR (2.2) - 20m',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3384.9759231579305,
              stddev: 819.7256078575197,
              maximum: 13465.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 699960.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B8A: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/T38LQH_20251029T071221_B08_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 8A - Vegetation red edge 4 - 20m',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3557.1398673269,
              stddev: 751.15047527987,
              maximum: 8995.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 699960.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      SCL: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/T38LQH_20251029T071221_SCL_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['gsd:60m', 'data'],
        title: 'Scene classfication map (SCL)',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 1.0,
            nodata: 0.0,
            offset: 0.0,
            sampling: 'area',
            data_type: 'uint8',
            statistics: {
              mean: 4.9270387359836905,
              stddev: 0.4281182274141967,
              maximum: 10.0,
              minimum: 2.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 699960.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'classification:classes': [
          {
            name: 'no_data',
            value: 0,
            nodata: true,
            percentage: 0.559776,
          },
          {
            name: 'saturated_or_defective',
            value: 1,
            percentage: 0.0,
          },
          {
            name: 'dark_area_pixels',
            value: 2,
            percentage: 0.053571,
          },
          {
            name: 'cloud_shadows',
            value: 3,
            percentage: 0.068882,
          },
          {
            name: 'vegetation',
            value: 4,
            percentage: 12.15067,
          },
          {
            name: 'not_vegetated',
            value: 5,
            percentage: 84.382302,
          },
          {
            name: 'water',
            value: 6,
            percentage: 2.702474,
          },
          {
            name: 'unclassified',
            value: 7,
            percentage: 0.423611,
          },
          {
            name: 'cloud_medium_probability',
            value: 8,
            percentage: 0.141275,
          },
          {
            name: 'cloud_high_probability',
            value: 9,
            percentage: 0.072249,
          },
          {
            name: 'thin_cirrus',
            value: 10,
            percentage: 0.004961,
          },
          {
            name: 'snow',
            value: 11,
            percentage: 0.0,
          },
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      WVP: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/T38LQH_20251029T071221_WVP_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['gsd:10m', 'data'],
        title: 'Water vapour (WVP)',
        'proj:bbox': [699960.0, 8190220.0, 809760.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2044.5724235757787,
              stddev: 289.15161120879196,
              maximum: 3835.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [699960.0, 8190220.0],
              [809760.0, 8190220.0],
              [809760.0, 8300020.0],
              [699960.0, 8300020.0],
              [699960.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 699960.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'safe-manifest': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/manifest.safe',
        type: 'text/plain',
        roles: ['metadata'],
        title: 'SAFE manifest',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'granule-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/MTD_TL.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'Granule metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'inspire-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/INSPIRE.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'INSPIRE metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'product-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/MTD_MSIL2A.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'Product metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'datastrip-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LQH_0511_afbd406add/MTD_DS.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'Datastrip metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [46.86291158102522, -16.36092517176475],
          [47.89922475984138, -16.36092517176475],
          [47.89922475984138, -15.357911490883158],
          [46.86291158102522, -15.357911490883158],
          [46.86291158102522, -16.36092517176475],
        ],
      ],
    },
    collection: 'sentinel2-l2a-sen2cor',
    properties: {
      created: '2025-10-29T12:19:13.514349Z',
      datetime: '2025-10-29T07:12:21.025000Z',
      's2:mgrs_tile': '38LQH',
      'eo:snow_cover': 0.0,
      'eo:cloud_cover': 0.22,
      'sat:orbit_state': 'descending',
      'processing:level': 'L2',
      'processing:version': '05.11',
      'production:origins': {
        in_ts: {
          ids: ['S2C_MSIL2A_20251029T071221_N0511_R020_T38LQH_20251029T100609'],
          endpoint: 'https://stac.dataspace.copernicus.eu/v1',
          collection: 'sentinel-2-l2a',
        },
      },
      'production:version': '0.2.1',
      'sat:absolute_orbit': 5996,
      'sat:relative_orbit': 20,
      'processing:datetime': '2025-10-29T10:06:09.000000Z',
      'processing:facility': 'ESA',
      'processing:software': {
        eometadatatool: '251021130925+dirty',
      },
      's2:water_percentage': 2.702474,
      's2:vegetation_percentage': 12.15067,
      's2:thin_cirrus_percentage': 0.004961,
      's2:cloud_shadow_percentage': 0.068882,
      's2:nodata_pixel_percentage': 0.559776,
      's2:unclassified_percentage': 0.423611,
      's2:high_proba_clouds_percentage': 0.072249,
      's2:medium_proba_clouds_percentage': 0.141275,
      'sat:platform_international_designator': '2024-157A',
    },
    stac_version: '1.1.0',
    stac_extensions: [
      'https://stac-extensions.github.io/eo/v1.1.0/schema.json',
      'https://stac-extensions.github.io/sat/v1.0.0/schema.json',
      'https://stac-extensions.github.io/processing/v1.2.0/schema.json',
      'https://stac-extensions.github.io/sentinel-2/v1.0.0/schema.json',
      'https://forge.inrae.fr/teledec/stac-extensions/schemas/-/raw/main/production/v1.1.0/schema.json',
      'https://stac-extensions.github.io/raster/v1.1.0/schema.json',
      'https://stac-extensions.github.io/projection/v2.0.0/schema.json',
      'https://stac-extensions.github.io/classification/v2.0.0/schema.json',
    ],
  },
  {
    id: 'S2C_20251029T071221025000Z_38LPH_0511_badb671b26',
    bbox: [
      45.93177460997931, -16.367164183137394, 46.96413305405615,
      -15.36802063786074,
    ],
    type: 'Feature',
    links: [
      {
        rel: 'collection',
        type: 'application/json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/collections/sentinel2-l2a-sen2cor',
      },
      {
        rel: 'parent',
        type: 'application/json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/collections/sentinel2-l2a-sen2cor',
      },
      {
        rel: 'root',
        type: 'application/json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/',
      },
      {
        rel: 'self',
        type: 'application/geo+json',
        href: 'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/collections/sentinel2-l2a-sen2cor/items/S2C_20251029T071221025000Z_38LPH_0511_badb671b26',
      },
    ],
    assets: {
      QL: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/S2C_MSIL2A_20251029T071221_N0511_R020_T38LPH_20251029T100609-ql.jpg',
        type: 'text/plain',
        roles: ['thumbnail', 'overview'],
        title: 'Quicklook',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      AOT: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/T38LPH_20251029T071221_AOT_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['gsd:10m', 'data'],
        title: 'Aerosol optical thickness (AOT)',
        'proj:bbox': [600000.0, 8190220.0, 709800.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 128.5875811249324,
              stddev: 7.340447442000589,
              maximum: 150.0,
              minimum: 112.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [600000.0, 8190220.0],
              [709800.0, 8190220.0],
              [709800.0, 8300020.0],
              [600000.0, 8300020.0],
              [600000.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 600000.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B01: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/T38LPH_20251029T071221_B01_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:60m', 'data'],
        title: 'Band 1 - Coastal aerosol - 60m',
        'proj:bbox': [600000.0, 8190220.0, 709800.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 1682.9326916576529,
              stddev: 221.9788521317938,
              maximum: 8769.0,
              minimum: 918.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [600000.0, 8190220.0],
              [709800.0, 8190220.0],
              [709800.0, 8300020.0],
              [600000.0, 8300020.0],
              [600000.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 600000.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B02: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/T38LPH_20251029T071221_B02_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 2 - Blue - 10m',
        'proj:bbox': [600000.0, 8190220.0, 709800.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 1764.8414768117902,
              stddev: 288.1392893107071,
              maximum: 8680.0,
              minimum: 1014.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [600000.0, 8190220.0],
              [709800.0, 8190220.0],
              [709800.0, 8300020.0],
              [600000.0, 8300020.0],
              [600000.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 600000.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B03: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/T38LPH_20251029T071221_B03_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 3 - Green - 10m',
        'proj:bbox': [600000.0, 8190220.0, 709800.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2009.6587429015683,
              stddev: 404.15161723309956,
              maximum: 8412.0,
              minimum: 1054.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [600000.0, 8190220.0],
              [709800.0, 8190220.0],
              [709800.0, 8300020.0],
              [600000.0, 8300020.0],
              [600000.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 600000.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B04: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/T38LPH_20251029T071221_B04_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 4 - Red - 10m',
        'proj:bbox': [600000.0, 8190220.0, 709800.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2313.6449685640887,
              stddev: 669.6088168169688,
              maximum: 8336.0,
              minimum: 1068.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [600000.0, 8190220.0],
              [709800.0, 8190220.0],
              [709800.0, 8300020.0],
              [600000.0, 8300020.0],
              [600000.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 600000.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B05: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/T38LPH_20251029T071221_B05_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 5 - Vegetation red edge 1 - 20m',
        'proj:bbox': [600000.0, 8190220.0, 709800.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2607.0498833829097,
              stddev: 784.2658902236108,
              maximum: 9056.0,
              minimum: 1094.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [600000.0, 8190220.0],
              [709800.0, 8190220.0],
              [709800.0, 8300020.0],
              [600000.0, 8300020.0],
              [600000.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 600000.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B06: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/T38LPH_20251029T071221_B06_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 6 - Vegetation red edge 2 - 20m',
        'proj:bbox': [600000.0, 8190220.0, 709800.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2816.5339119118444,
              stddev: 891.411575599373,
              maximum: 8779.0,
              minimum: 1061.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [600000.0, 8190220.0],
              [709800.0, 8190220.0],
              [709800.0, 8300020.0],
              [600000.0, 8300020.0],
              [600000.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 600000.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B07: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/T38LPH_20251029T071221_B07_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 7 - Vegetation red edge 3 - 20m',
        'proj:bbox': [600000.0, 8190220.0, 709800.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2941.0435032449973,
              stddev: 964.7855772467033,
              maximum: 8484.0,
              minimum: 1057.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [600000.0, 8190220.0],
              [709800.0, 8190220.0],
              [709800.0, 8300020.0],
              [600000.0, 8300020.0],
              [600000.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 600000.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B08: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/T38LPH_20251029T071221_B08_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:10m', 'data'],
        title: 'Band 8 - NIR - 10m',
        'proj:bbox': [600000.0, 8190220.0, 709800.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3010.241988912926,
              stddev: 1019.087585655456,
              maximum: 9132.0,
              minimum: 1075.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [600000.0, 8190220.0],
              [709800.0, 8190220.0],
              [709800.0, 8300020.0],
              [600000.0, 8300020.0],
              [600000.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 600000.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B09: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/T38LPH_20251029T071221_B09_60m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:60m', 'data'],
        title: 'Band 9 - Water vapor - 60m',
        'proj:bbox': [600000.0, 8190220.0, 709800.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [1830, 1830],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3150.12326710017,
              stddev: 1076.249264362862,
              maximum: 16656.0,
              minimum: 1098.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [600000.0, 8190220.0],
              [709800.0, 8190220.0],
              [709800.0, 8300020.0],
              [600000.0, 8300020.0],
              [600000.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          60.0, 0.0, 600000.0, 0.0, -60.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B11: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/T38LPH_20251029T071221_B11_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 11 - SWIR (1.6) - 20m',
        'proj:bbox': [600000.0, 8190220.0, 709800.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3692.2623969037318,
              stddev: 1461.725859275039,
              maximum: 12845.0,
              minimum: 1083.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [600000.0, 8190220.0],
              [709800.0, 8190220.0],
              [709800.0, 8300020.0],
              [600000.0, 8300020.0],
              [600000.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 600000.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B12: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/T38LPH_20251029T071221_B12_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 12 - SWIR (2.2) - 20m',
        'proj:bbox': [600000.0, 8190220.0, 709800.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3017.1984941184423,
              stddev: 1125.3662944881432,
              maximum: 14078.0,
              minimum: 1067.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [600000.0, 8190220.0],
              [709800.0, 8190220.0],
              [709800.0, 8300020.0],
              [600000.0, 8300020.0],
              [600000.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 600000.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      B8A: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/T38LPH_20251029T071221_B08_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['reflectance', 'gsd:20m', 'data'],
        title: 'Band 8A - Vegetation red edge 4 - 20m',
        'proj:bbox': [600000.0, 8190220.0, 709800.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 3010.2419889129,
              stddev: 1019.0875856555,
              maximum: 9132.0,
              minimum: 1075.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [600000.0, 8190220.0],
              [709800.0, 8190220.0],
              [709800.0, 8300020.0],
              [600000.0, 8300020.0],
              [600000.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 600000.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      SCL: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/T38LPH_20251029T071221_SCL_20m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['gsd:60m', 'data'],
        title: 'Scene classfication map (SCL)',
        'proj:bbox': [600000.0, 8190220.0, 709800.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [5490, 5490],
        'raster:bands': [
          {
            scale: 1.0,
            nodata: 0.0,
            offset: 0.0,
            sampling: 'area',
            data_type: 'uint8',
            statistics: {
              mean: 5.1746721200648995,
              stddev: 0.5671028646774404,
              maximum: 10.0,
              minimum: 1.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [600000.0, 8190220.0],
              [709800.0, 8190220.0],
              [709800.0, 8300020.0],
              [600000.0, 8300020.0],
              [600000.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          20.0, 0.0, 600000.0, 0.0, -20.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'classification:classes': [
          {
            name: 'no_data',
            value: 0,
            nodata: true,
            percentage: 0.0,
          },
          {
            name: 'saturated_or_defective',
            value: 1,
            percentage: 0.0,
          },
          {
            name: 'dark_area_pixels',
            value: 2,
            percentage: 0.027385,
          },
          {
            name: 'cloud_shadows',
            value: 3,
            percentage: 0.233878,
          },
          {
            name: 'vegetation',
            value: 4,
            percentage: 7.148719,
          },
          {
            name: 'not_vegetated',
            value: 5,
            percentage: 69.286644,
          },
          {
            name: 'water',
            value: 6,
            percentage: 22.485101,
          },
          {
            name: 'unclassified',
            value: 7,
            percentage: 0.582938,
          },
          {
            name: 'cloud_medium_probability',
            value: 8,
            percentage: 0.20638,
          },
          {
            name: 'cloud_high_probability',
            value: 9,
            percentage: 0.028152,
          },
          {
            name: 'thin_cirrus',
            value: 10,
            percentage: 0.000806,
          },
          {
            name: 'snow',
            value: 11,
            percentage: 0.0,
          },
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      WVP: {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/T38LPH_20251029T071221_WVP_10m.tif',
        type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        roles: ['gsd:10m', 'data'],
        title: 'Water vapour (WVP)',
        'proj:bbox': [600000.0, 8190220.0, 709800.0, 8300020.0],
        'proj:code': 'EPSG:32738',
        'proj:shape': [10980, 10980],
        'raster:bands': [
          {
            scale: 0.0001,
            nodata: 0.0,
            offset: -0.1,
            sampling: 'area',
            data_type: 'uint16',
            statistics: {
              mean: 2419.7749966197944,
              stddev: 213.9367791412723,
              maximum: 4936.0,
              minimum: 503.0,
            },
          },
        ],
        'proj:geometry': {
          type: 'Polygon',
          coordinates: [
            [
              [600000.0, 8190220.0],
              [709800.0, 8190220.0],
              [709800.0, 8300020.0],
              [600000.0, 8300020.0],
              [600000.0, 8190220.0],
            ],
          ],
        },
        'proj:transform': [
          10.0, 0.0, 600000.0, 0.0, -10.0, 8300020.0, 0.0, 0.0, 1.0,
        ],
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'safe-manifest': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/manifest.safe',
        type: 'text/plain',
        roles: ['metadata'],
        title: 'SAFE manifest',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'granule-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/MTD_TL.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'Granule metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'inspire-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/INSPIRE.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'INSPIRE metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'product-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/MTD_MSIL2A.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'Product metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
      'datastrip-metadata': {
        href: 'https://s3-data.meso.umontpellier.fr/sm1-gdc-sen2cor/sentinel2-l2a-sen2cor/S2C_20251029T071221025000Z_38LPH_0511_badb671b26/MTD_DS.xml',
        type: 'application/xml',
        roles: ['metadata'],
        title: 'Datastrip metadata',
        'production:definition_sha': '9003113a037d573583142879d7d7e59820c48518',
        'production:implementation_sha':
          '437cba2cc776d619317ab54cf01173d3ea484454',
      },
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [45.93177460997931, -16.367164183137394],
          [46.96413305405615, -16.367164183137394],
          [46.96413305405615, -15.36802063786074],
          [45.93177460997931, -15.36802063786074],
          [45.93177460997931, -16.367164183137394],
        ],
      ],
    },
    collection: 'sentinel2-l2a-sen2cor',
    properties: {
      created: '2025-10-29T12:34:58.970497Z',
      datetime: '2025-10-29T07:12:21.025000Z',
      's2:mgrs_tile': '38LPH',
      'eo:snow_cover': 0.0,
      'eo:cloud_cover': 0.24,
      'sat:orbit_state': 'descending',
      'processing:level': 'L2',
      'processing:version': '05.11',
      'production:origins': {
        in_ts: {
          ids: ['S2C_MSIL2A_20251029T071221_N0511_R020_T38LPH_20251029T100609'],
          endpoint: 'https://stac.dataspace.copernicus.eu/v1',
          collection: 'sentinel-2-l2a',
        },
      },
      'production:version': '0.2.1',
      'sat:absolute_orbit': 5996,
      'sat:relative_orbit': 20,
      'processing:datetime': '2025-10-29T10:06:09.000000Z',
      'processing:facility': 'ESA',
      'processing:software': {
        eometadatatool: '251021130925+dirty',
      },
      's2:water_percentage': 22.485101,
      's2:vegetation_percentage': 7.148719,
      's2:thin_cirrus_percentage': 0.000806,
      's2:cloud_shadow_percentage': 0.233878,
      's2:nodata_pixel_percentage': 0.0,
      's2:unclassified_percentage': 0.582938,
      's2:high_proba_clouds_percentage': 0.028152,
      's2:medium_proba_clouds_percentage': 0.20638,
      'sat:platform_international_designator': '2024-157A',
    },
    stac_version: '1.1.0',
    stac_extensions: [
      'https://stac-extensions.github.io/eo/v1.1.0/schema.json',
      'https://stac-extensions.github.io/sat/v1.0.0/schema.json',
      'https://stac-extensions.github.io/processing/v1.2.0/schema.json',
      'https://stac-extensions.github.io/sentinel-2/v1.0.0/schema.json',
      'https://forge.inrae.fr/teledec/stac-extensions/schemas/-/raw/main/production/v1.1.0/schema.json',
      'https://stac-extensions.github.io/raster/v1.1.0/schema.json',
      'https://stac-extensions.github.io/projection/v2.0.0/schema.json',
      'https://stac-extensions.github.io/classification/v2.0.0/schema.json',
    ],
  },
]
