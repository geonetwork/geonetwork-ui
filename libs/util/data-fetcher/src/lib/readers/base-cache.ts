import { BaseReader } from './base'

export abstract class BaseCacheReader extends BaseReader {
  constructor(
    protected url: string,
    protected cacheActive = true
  ) {
    super(url)
  }

  setCacheActive(value: boolean) {
    this.cacheActive = value
  }
}
