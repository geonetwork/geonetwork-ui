import { BaseReader } from './base'

export abstract class BaseCacheReader extends BaseReader {
  constructor(
    protected url: string,
    protected cacheActive: boolean
  ) {
    super(url)
  }
}
