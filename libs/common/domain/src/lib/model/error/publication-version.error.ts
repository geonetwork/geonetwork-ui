export class PublicationVersionError extends Error {
  detectedApiVersion: string

  constructor(detectedApiVersion: string) {
    super()
    this.name = 'PublicationVersionError'
    this.detectedApiVersion = detectedApiVersion
  }
}
