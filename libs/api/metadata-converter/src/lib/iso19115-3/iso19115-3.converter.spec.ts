/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Iso191153Converter } from './iso19115-3.converter'
import { parseXmlString, xmlToString } from '../xml-utils'
// @ts-ignore
import GENERIC_DATASET from '../fixtures/generic-dataset.iso19115-3.xml'
// @ts-ignore
import GENERIC_DATASET_PLUS_METAWAL_DATASET from '../fixtures/generic-dataset+metawal.iso19115-3.xml'
// @ts-ignore
import METAWAL_DATASET from '../fixtures/metawal.iso19115-3.dataset.xml'
// @ts-ignore
import METAWAL_SERVICE from '../fixtures/metawal.iso19115-3.service.xml'
// @ts-ignore
import SEXTANT_CURRENTS_DATASET from '../fixtures/sextant.iso19115-3.dataset.xml'
// @ts-ignore
import { WALLONIE_SERVICE_NAPITSWALLONIA_RECORD } from '../fixtures/wallonie.records.service+napitswallonia'
// @ts-ignore
import WALLONIE_SERVICE_NAPITSWALLONIA from '../fixtures/wallonie.iso19115-3.service+napitswallonia.xml'
// @ts-ignore
import WALLONIE_REUSE_SPW from '../fixtures/wallonie.iso19115-3.reuse+spw.xml'
// @ts-ignore
import { WALLONIE_REUSE_SPW_RECORD } from '../fixtures/wallonie.records.reuse'

import {
  METAWAL_DATASET_RECORD,
  METAWAL_SERVICE_RECORD,
} from '../fixtures/metawal.records'
import { GENERIC_DATASET_RECORD } from '../fixtures/generic.records'
import { SEXTANT_CURRENTS_DATASET_RECORD } from '../fixtures/sextant.records'

// this makes the xml go through the same formatting as the converter
function formatXml(xmlString: string) {
  return xmlToString(parseXmlString(xmlString))
}

describe('ISO19115-3 converter', () => {
  let converter: Iso191153Converter

  beforeEach(() => {
    converter = new Iso191153Converter()
  })

  describe('from XML to model', () => {
    it('produces the corresponding record (metawal dataset)', async () => {
      const record = await converter.readRecord(METAWAL_DATASET)
      expect(record).toStrictEqual(METAWAL_DATASET_RECORD)
    })
    it('produces the corresponding record (metawal service)', async () => {
      const record = await converter.readRecord(METAWAL_SERVICE)
      expect(record).toStrictEqual(METAWAL_SERVICE_RECORD)
    })
    it('produces the corresponding record (sextant dataset)', async () => {
      const record = await converter.readRecord(SEXTANT_CURRENTS_DATASET)
      expect(record).toStrictEqual(SEXTANT_CURRENTS_DATASET_RECORD)
    })
    it('produces the corresponding record (wallonie napitswallonia service)', async () => {
      const record = await converter.readRecord(WALLONIE_SERVICE_NAPITSWALLONIA)
      expect(record).toStrictEqual(WALLONIE_SERVICE_NAPITSWALLONIA_RECORD)
    })
    it('produces the corresponding record (wallonie spw reuse)', async () => {
      const record = await converter.readRecord(WALLONIE_REUSE_SPW)
      expect(record).toStrictEqual(WALLONIE_REUSE_SPW_RECORD)
    })
    it('produces the corresponding record (generic dataset)', async () => {
      const record = await converter.readRecord(GENERIC_DATASET)
      // exclude unsupported fields
      expect(record).toStrictEqual({
        ...GENERIC_DATASET_RECORD,
        ownerOrganization: {
          name: GENERIC_DATASET_RECORD.ownerOrganization.name,
          website: GENERIC_DATASET_RECORD.ownerOrganization.website,
          translations: GENERIC_DATASET_RECORD.ownerOrganization.translations,
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
        parseXmlString(GENERIC_DATASET_PLUS_METAWAL_DATASET)
      )
      const xml = await converter.writeRecord(
        GENERIC_DATASET_RECORD,
        METAWAL_DATASET
      )
      expect(xml).toStrictEqual(ref)
    })
  })

  describe('idempotency', () => {
    describe('with a third-party XML record', () => {
      describe('when converting to a native record and back to XML', () => {
        it('keeps the record unchanged (dataset)', async () => {
          const backAndForth = await converter.writeRecord(
            await converter.readRecord(METAWAL_DATASET),
            METAWAL_DATASET
          )
          expect(backAndForth).toStrictEqual(formatXml(METAWAL_DATASET))
        })
        it('keeps the record unchanged (service)', async () => {
          const backAndForth = await converter.writeRecord(
            await converter.readRecord(METAWAL_SERVICE),
            METAWAL_SERVICE
          )
          expect(backAndForth).toStrictEqual(formatXml(METAWAL_SERVICE))
        })
        it('keeps the record unchanged (wallonie napitswallonia service)', async () => {
          const backAndForth = await converter.writeRecord(
            await converter.readRecord(WALLONIE_SERVICE_NAPITSWALLONIA),
            WALLONIE_SERVICE_NAPITSWALLONIA
          )
          expect(backAndForth).toStrictEqual(
            formatXml(WALLONIE_SERVICE_NAPITSWALLONIA)
          )
        })
      })
    })
    describe('with a native record', () => {
      describe('when converting to XML and back', () => {
        it('keeps the record unchanged', async () => {
          const backAndForth = await converter.readRecord(
            await converter.writeRecord(GENERIC_DATASET_RECORD)
          )
          expect(backAndForth).toStrictEqual({
            ...GENERIC_DATASET_RECORD,
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
