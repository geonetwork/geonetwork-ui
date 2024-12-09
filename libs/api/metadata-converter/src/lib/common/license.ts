import { Constraint } from '@geonetwork-ui/common/domain/model/record'

export function readLicenseFromString(text: string): Constraint {
  const isPddl = /pddl|public domain dedication and licence/i.test(text)
  const isOdbl = /odbl|open database license/i.test(text)
  const isOdcBy = /odc-by|opendatacommons.org\/licenses\/by/i.test(text)
  const isCcBySa =
    /cc-by-sa|creative.*commons.*(by-sa|attribution.*share-alike)/i.test(text)
  const isCcBy = /cc-by|cc by|creative.*commons.*(by|attribution)/i.test(text)
  const isCc0 = /cc.?0|creative.*commons.*(zero|0)/i.test(text)
  const isEtalabV2 = /etalab/i.test(text) && /v2|2\.0/i.test(text)
  const isEtalab = /etalab|open.?licence|licence.?ouverte/i.test(text)

  if (isPddl) {
    return {
      text: 'Open Data Commons PDDL',
      url: new URL('https://opendatacommons.org/licenses/pddl/'),
    }
  } else if (isOdbl) {
    return {
      text: 'Open Data Commons ODbL',
      url: new URL('https://opendatacommons.org/licenses/odbl/'),
    }
  } else if (isOdcBy) {
    return {
      text: 'Open Data Commons ODC-By',
      url: new URL('https://opendatacommons.org/licenses/by/'),
    }
  } else if (isCcBySa) {
    return {
      text: 'Creative Commons CC-BY-SA',
      url: new URL('https://creativecommons.org/licenses/by-sa/4.0/legalcode'),
    }
  } else if (isCcBy) {
    return {
      text: 'Creative Commons CC-BY',
      url: new URL('https://creativecommons.org/licenses/by/4.0/legalcode'),
    }
  } else if (isCc0) {
    return {
      text: 'Creative Commons CC-0',
      url: new URL(
        'https://creativecommons.org/publicdomain/zero/1.0/legalcode'
      ),
    }
  } else if (isEtalabV2) {
    return {
      text: 'Open Licence v2.0 (Etalab)',
      url: new URL(
        'https://www.etalab.gouv.fr/wp-content/uploads/2017/04/ETALAB-Licence-Ouverte-v2.0.pdf'
      ),
    }
  } else if (isEtalab) {
    return {
      text: 'Open Licence (Etalab)',
      url: new URL(
        'https://www.etalab.gouv.fr/wp-content/uploads/2014/05/Licence_Ouverte.pdf'
      ),
    }
  }
  const url = /^https?:\/\//.test(text) ? new URL(text) : undefined
  return {
    text,
    ...(url && { url }),
  }
}
