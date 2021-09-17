import { Injectable } from '@angular/core'
import { MetadataLink, MetadataRecord } from '@geonetwork-ui/util/shared'

export enum LinkUsage {
  DOWNLOAD = 'download',
  MAP = 'map',
}

/**
 * Evaluates the priority for a given link.
 * Higher return value means this link will be preferred above others
 * -1 means this link will not be used
 */
type LinkPrioritizer = (link: MetadataLink) => number

@Injectable({
  providedIn: 'root',
})
export class DatasetFinderService {
  protected getLinkPriorityByUsage: Record<LinkUsage, LinkPrioritizer> = {
    [LinkUsage.DOWNLOAD]: (link) => {
      if ('name' in link && link.name.match(/\.csv/i)) return 3
      if ('name' in link && link.name.match(/\.(?:geo)?json/i)) return 2
      if ('name' in link && link.name.match(/\.xlsx?/i)) return 1
      if ('protocol' in link && link.protocol === 'OGC:WFS') return 0
      return -1
    },
    [LinkUsage.MAP]: (link) => {
      if ('protocol' in link && link.protocol === 'OGC:WMTS') return 6
      if ('protocol' in link && link.protocol === 'OGC:WMS') return 5
      if ('protocol' in link && link.protocol === 'OGC:WFS') return 4
      return this.getLinkPriorityByUsage[LinkUsage.DOWNLOAD](link) // fallback on download priorities
    },
  }

  /**
   * Returns all *distinct* links, in the preferred format/protocol as
   * evaluated by the functions in `getLinkPriorityByUsage`
   * Distinct links are links with different names
   */
  getDistinctLinksByUsage(
    record: MetadataRecord,
    usage: LinkUsage
  ): MetadataLink[] {
    if (!('links' in record)) return []
    const getFilenameWithoutExtension = (filename: string) => {
      const matches = filename.match(/^(.*)\.\w+$/)
      return (matches && matches[1]) || filename
    }
    const linksByName = record.links.reduce((prev, curr) => {
      const name =
        'name' in curr ? getFilenameWithoutExtension(curr.name) : undefined
      const existingLinks = name in prev ? prev[name] : []
      return {
        ...prev,
        [name]: [...existingLinks, curr],
      }
    }, {})
    const prioritizer = this.getLinkPriorityByUsage[usage]
    return (
      Object.keys(linksByName)
        .map(
          (name) =>
            // this selects the link with the highest priority
            linksByName[name].sort(
              (linkA, linkB) => prioritizer(linkB) - prioritizer(linkA)
            )[0]
        )
        // exclude link not compatible with the usage
        .filter((link) => !!link && prioritizer(link) >= 0)
    )
  }

  /**
   * Returns null if no usage found for link
   * @param link
   */
  getLinkUsages(link: MetadataLink): LinkUsage[] {
    return Object.keys(this.getLinkPriorityByUsage).filter(
      (usage) => this.getLinkPriorityByUsage[usage](link) > -1
    ) as LinkUsage[]
  }
}
