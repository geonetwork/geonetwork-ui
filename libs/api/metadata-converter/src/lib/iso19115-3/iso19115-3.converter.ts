import { Iso19139Converter } from '../iso19139'
import { readUniqueIdentifier } from './read-parts'
import { writeUniqueIdentifier } from './write-parts'

export class Iso191153Converter extends Iso19139Converter {
  constructor() {
    super()
    this.readers = {
      ...this.readers,
      uniqueIdentifier: readUniqueIdentifier,
    }
    this.writers = {
      ...this.writers,
      uniqueIdentifier: writeUniqueIdentifier,
    }
  }
}
