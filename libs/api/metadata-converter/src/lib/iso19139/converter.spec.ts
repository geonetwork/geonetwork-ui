/* eslint-disable @typescript-eslint/ban-ts-comment */
import { toModel, toXml } from './converter'
import { parseXmlString, xmlToString } from '../xml-utils'
import { GEO2FRANCE_PLU_DATASET_RECORD } from '../fixtures/geo2france.records'
import {
  GEOCAT_CH_DATASET_RECORD,
  GEOCAT_CH_SERVICE_RECORD,
} from '../fixtures/geocat-ch.records'
import { GENERIC_DATASET_RECORD } from '../fixtures/generic.records'
// @ts-ignore
import GEO2FRANCE_PLU_DATASET from '../fixtures/geo2france.iso19139.plu.xml'
// @ts-ignore
import GENERIC_DATASET_PLUS_GEO2FRANCE_DATASET from '../fixtures/generic-dataset+geo2france-plu.iso19139.xml'
// @ts-ignore
import GEOCAT_CH_DATASET from '../fixtures/geocat-ch.iso19139.dataset.xml'
// @ts-ignore
import GEOCAT_CH_SERVICE from '../fixtures/geocat-ch.iso19139.service.xml'
// @ts-ignore
import GENERIC_DATASET from '../fixtures/generic-dataset.iso19139.xml'

// this makes the xml go through the same formatting as the converter
function formatXml(xmlString: string) {
  return xmlToString(parseXmlString(xmlString))
}

describe('ISO19139 converter', () => {
  describe('from XML to model', () => {
    it('produces the corresponding record (geo2france dataset)', () => {
      expect(toModel(GEO2FRANCE_PLU_DATASET)).toStrictEqual(
        GEO2FRANCE_PLU_DATASET_RECORD
      )
    })
    it('produces the corresponding record (geocat.ch dataset)', () => {
      expect(toModel(GEOCAT_CH_DATASET)).toStrictEqual(GEOCAT_CH_DATASET_RECORD)
    })
    it('produces the corresponding record (geocat.ch service)', () => {
      expect(toModel(GEOCAT_CH_SERVICE)).toStrictEqual(GEOCAT_CH_SERVICE_RECORD)
    })
  })

  describe('from model to XML', () => {
    it('produces a valid XML document based on a generic record', () => {
      const ref = xmlToString(parseXmlString(GENERIC_DATASET))
      expect(toXml(GENERIC_DATASET_RECORD)).toStrictEqual(ref)
    })
    it('produces a valid XML document by combining a generic record and a third-party XML', () => {
      const ref = xmlToString(
        parseXmlString(GENERIC_DATASET_PLUS_GEO2FRANCE_DATASET)
      )
      expect(
        toXml(GENERIC_DATASET_RECORD, GEO2FRANCE_PLU_DATASET)
      ).toStrictEqual(ref)
    })
  })

  describe('idempotency', () => {
    describe('with a third-party XML record', () => {
      describe('when converting to a native record and back to XML', () => {
        it('keeps the record unchanged (dataset)', () => {
          const backAndForth = toXml(
            toModel(GEO2FRANCE_PLU_DATASET),
            GEO2FRANCE_PLU_DATASET
          )
          expect(backAndForth).toStrictEqual(formatXml(GEO2FRANCE_PLU_DATASET))
        })
        it('keeps the record unchanged (service)', () => {
          const backAndForth = toXml(
            toModel(GEOCAT_CH_SERVICE),
            GEOCAT_CH_SERVICE
          )
          expect(backAndForth).toStrictEqual(formatXml(GEOCAT_CH_SERVICE))
        })
      })
    })
    describe('with a native record', () => {
      describe('when converting to XML and back', () => {
        it('keeps the record unchanged', () => {
          const backAndForth = toModel(toXml(GENERIC_DATASET_RECORD))
          // unsupported fields need to be filtered out
          expect(backAndForth).toStrictEqual({
            ...GENERIC_DATASET_RECORD,
            ownerOrganization: {
              name: GENERIC_DATASET_RECORD.ownerOrganization.name,
              website: GENERIC_DATASET_RECORD.ownerOrganization.website,
            },
            contacts: GENERIC_DATASET_RECORD.contacts.map((c) => ({
              ...c,
              organization: {
                name: c.organization.name,
                website: c.organization.website,
              },
            })),
          })
        })
      })
    })
  })
})
