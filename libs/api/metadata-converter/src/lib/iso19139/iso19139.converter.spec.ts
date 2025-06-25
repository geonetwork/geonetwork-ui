/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Iso19139Converter } from './iso19139.converter'
import { parseXmlString, xmlToString } from '../xml-utils'
import { GEO2FRANCE_PLU_DATASET_RECORD } from '../fixtures/geo2france.records'
import { GEO2FRANCE_REUSE_ONGULES_RECORD } from '../fixtures/geo2france.records.reuse+ongules'
import { GEO2FRANCE_REUSE_ROILAYE_RECORD } from '../fixtures/geo2france.records.reuse+roilaye'
import { GEORHENA_REUSE_SOLAIRE_RECORD } from '../fixtures/georhena.records'
import {
  GEOCAT_CH_DATASET_RECORD,
  GEOCAT_CH_SERVICE_RECORD,
} from '../fixtures/geocat-ch.records'
import { GENERIC_DATASET_RECORD } from '../fixtures/generic.records'
import {
  METADATA_FOR_I18N_DATASET_RECORD,
  METADATA_FOR_I18N_NO_OTHERLANGUAGE,
} from '../fixtures/metadata-for-i18n.records'
import METADATA_FOR_I18N_XML from '../fixtures/metadata-for-i18n.dataset.xml'
import METADATA_FOR_I18N_NO_OTHERLANGUAGE_XML from '../fixtures/metadata-for-i18n-no-otherlanguage.dataset.xml'
// @ts-ignore
import GEO2FRANCE_PLU_DATASET from '../fixtures/geo2france.iso19139.plu.xml'
// @ts-ignore
import { GEO2FRANCE_SERVICE_EAUXUSEES_RECORD } from '../fixtures/geo2france.records.service+eaux-usees'
// @ts-ignore
import GEO2FRANCE_SERVICE_EAUXUSEES from '../fixtures/geo2france.iso19139.service+eaux-usees.xml'
// @ts-ignore
import GEO2FRANCE_REUSE_ONGULES from '../fixtures/geo2france.iso19139.reuse+ongules.xml'
// @ts-ignore
import GEO2FRANCE_REUSE_ONGULES_DUMMY from '../fixtures/geo2france.iso19139.reuse+ongules_dummy.xml'
// @ts-ignore
import GEO2FRANCE_REUSE_ROILAYE from '../fixtures/geo2france.iso19139.reuse+roilaye.xml'
// @ts-ignore
import GEORHENA_REUSE_SOLAIRE from '../fixtures/georhena.iso19139.reuse+solaire.xml'
// @ts-ignore
import GENERIC_DATASET_PLUS_GEO2FRANCE_DATASET from '../fixtures/generic-dataset+geo2france-plu.iso19139.xml'
// @ts-ignore
import GEOCAT_CH_DATASET from '../fixtures/geocat-ch.iso19139.dataset.xml'
// @ts-ignore
import GEOCAT_CH_SERVICE from '../fixtures/geocat-ch.iso19139.service.xml'
// @ts-ignore
import GENERIC_DATASET from '../fixtures/generic-dataset.iso19139.xml'
import { ReuseRecord } from '@geonetwork-ui/common/domain/model/record'

// this makes the xml go through the same formatting as the converter
function formatXml(xmlString: string) {
  return xmlToString(parseXmlString(xmlString))
}

describe('ISO19139 converter', () => {
  let converter: Iso19139Converter

  beforeEach(() => {
    converter = new Iso19139Converter()
  })

  describe('from XML to model', () => {
    it('produces the corresponding record (geo2france dataset)', async () => {
      const record = await converter.readRecord(GEO2FRANCE_PLU_DATASET)
      expect(record).toStrictEqual(GEO2FRANCE_PLU_DATASET_RECORD)
    })
    it('produces the corresponding record (geo2france service traitement des eaux usées)', async () => {
      const record = await converter.readRecord(GEO2FRANCE_SERVICE_EAUXUSEES)
      expect(record).toStrictEqual(GEO2FRANCE_SERVICE_EAUXUSEES_RECORD)
    })
    it('produces the corresponding record (geo2france reuse ongulets interactivemap)', async () => {
      const record = await converter.readRecord(GEO2FRANCE_REUSE_ONGULES)
      expect(record).toStrictEqual(GEO2FRANCE_REUSE_ONGULES_RECORD)
    })
    it('produces the corresponding record (geo2france reuse roilaye map)', async () => {
      const record = await converter.readRecord(GEO2FRANCE_REUSE_ROILAYE)
      expect(record).toStrictEqual(GEO2FRANCE_REUSE_ROILAYE_RECORD)
    })
    it('produces the corresponding record (georhena reuse solaire staticmap)', async () => {
      const record = await converter.readRecord(GEORHENA_REUSE_SOLAIRE)
      expect(record).toStrictEqual(GEORHENA_REUSE_SOLAIRE_RECORD)
    })
    it('produces the corresponding record (geocat.ch dataset)', async () => {
      const record = await converter.readRecord(GEOCAT_CH_DATASET)
      expect(record).toStrictEqual(GEOCAT_CH_DATASET_RECORD)
    })
    it('produces the corresponding record (geocat.ch service)', async () => {
      const record = await converter.readRecord(GEOCAT_CH_SERVICE)
      expect(record).toStrictEqual(GEOCAT_CH_SERVICE_RECORD)
    })
  })

  describe('from model to XML', () => {
    it('produces a valid XML document based on a generic record', async () => {
      // parse and output xml to guarantee identical formatting
      const ref = xmlToString(parseXmlString(GENERIC_DATASET))
      const xml = await converter.writeRecord(GENERIC_DATASET_RECORD)
      expect(xml).toStrictEqual(ref)
    })
    it('produces a valid XML document by combining a generic record and a third-party XML', async () => {
      // parse and output xml to guarantee identical formatting
      const ref = xmlToString(
        parseXmlString(GENERIC_DATASET_PLUS_GEO2FRANCE_DATASET)
      )
      const xml = await converter.writeRecord(
        GENERIC_DATASET_RECORD,
        GEO2FRANCE_PLU_DATASET
      )
      expect(xml).toStrictEqual(ref)
    })
    it('produces a valid XML document for third-party XML when record reuseType has been updated from "map" to "application"', async () => {
      const recordChanged: ReuseRecord = {
        ...GEO2FRANCE_REUSE_ONGULES_RECORD, // reuseType is 'map' here
        ...{ reuseType: 'application' },
      }
      // parse and output xml to guarantee identical formatting
      const ref = xmlToString(parseXmlString(GEO2FRANCE_REUSE_ONGULES_DUMMY))
      const xml = await converter.writeRecord(
        recordChanged,
        GEO2FRANCE_REUSE_ONGULES
      )
      expect(xml).toStrictEqual(ref)
    })
    it('produces a valid XML document when otherlanguages are removed', async () => {
      const recordChanged: ReuseRecord = METADATA_FOR_I18N_NO_OTHERLANGUAGE
      // parse and output xml to guarantee identical formatting
      const ref = xmlToString(
        parseXmlString(METADATA_FOR_I18N_NO_OTHERLANGUAGE_XML)
      )
      const xml = await converter.writeRecord(
        recordChanged,
        METADATA_FOR_I18N_XML
      )
      expect(xml).toStrictEqual(ref)
    })
  })

  describe('idempotency', () => {
    describe('with a third-party XML record', () => {
      describe('when converting to a native record and back to XML', () => {
        it('keeps the record unchanged (dataset)', async () => {
          const backAndForth = await converter.writeRecord(
            await converter.readRecord(GEO2FRANCE_PLU_DATASET),
            GEO2FRANCE_PLU_DATASET
          )
          expect(backAndForth).toStrictEqual(formatXml(GEO2FRANCE_PLU_DATASET))
        })
        it('keeps the record unchanged (geo2france service traitement des eaux usées)', async () => {
          const backAndForth = await converter.writeRecord(
            await converter.readRecord(GEO2FRANCE_SERVICE_EAUXUSEES),
            GEO2FRANCE_SERVICE_EAUXUSEES
          )
          expect(backAndForth).toStrictEqual(
            formatXml(GEO2FRANCE_SERVICE_EAUXUSEES)
          )
        })
        it('keeps the record unchanged (geo2france reuse ongulets interactivemap)', async () => {
          const backAndForth = await converter.writeRecord(
            await converter.readRecord(GEO2FRANCE_REUSE_ONGULES),
            GEO2FRANCE_REUSE_ONGULES
          )
          expect(backAndForth).toStrictEqual(
            formatXml(GEO2FRANCE_REUSE_ONGULES)
          )
        })
        it('keeps the record unchanged (geo2france reuse roilaye map)', async () => {
          const backAndForth = await converter.writeRecord(
            await converter.readRecord(GEO2FRANCE_REUSE_ROILAYE),
            GEO2FRANCE_REUSE_ROILAYE
          )
          expect(backAndForth).toStrictEqual(
            formatXml(GEO2FRANCE_REUSE_ROILAYE)
          )
        })
        it('keeps the record unchanged (georhena reuse solaire staticmap)', async () => {
          const backAndForth = await converter.writeRecord(
            await converter.readRecord(GEORHENA_REUSE_SOLAIRE),
            GEORHENA_REUSE_SOLAIRE
          )
          expect(backAndForth).toStrictEqual(formatXml(GEORHENA_REUSE_SOLAIRE))
        })
        it('keeps the record unchanged (service)', async () => {
          const backAndForth = await converter.writeRecord(
            await converter.readRecord(GEOCAT_CH_SERVICE),
            GEOCAT_CH_SERVICE
          )
          expect(backAndForth).toStrictEqual(formatXml(GEOCAT_CH_SERVICE))
        })
      })
    })
    describe('with a native record', () => {
      describe('when converting to XML and back', () => {
        it('keeps the record unchanged', async () => {
          const backAndForth = await converter.readRecord(
            await converter.writeRecord(GENERIC_DATASET_RECORD)
          )
          // unsupported fields need to be filtered out
          const { recordPublished, recordCreated, ...withoutDates } =
            GENERIC_DATASET_RECORD
          expect(backAndForth).toStrictEqual({
            ...withoutDates,
            ownerOrganization: {
              name: GENERIC_DATASET_RECORD.ownerOrganization.name,
              website: GENERIC_DATASET_RECORD.ownerOrganization.website,
              translations:
                GENERIC_DATASET_RECORD.ownerOrganization.translations,
            },
            contacts: GENERIC_DATASET_RECORD.contacts.map((c) => ({
              ...c,
              organization: {
                name: c.organization.name,
                website: c.organization.website,
                translations: c.organization.translations,
              },
            })),
            contactsForResource: GENERIC_DATASET_RECORD.contactsForResource.map(
              (c) => ({
                ...c,
                organization: {
                  name: c.organization.name,
                  website: c.organization.website,
                  translations: c.organization.translations,
                },
              })
            ),
          })
        })
      })
    })
  })
})
