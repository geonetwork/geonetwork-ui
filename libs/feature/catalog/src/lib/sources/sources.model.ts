export interface CatalogSource {
  label: Record<Iso3Langs, string>
  name: string
  type: string
  uuid: string
}
export type Iso3Langs =
  | 'ara'
  | 'cat'
  | 'chi'
  | 'dut'
  | 'eng'
  | 'fin'
  | 'fre'
  | 'ger'
  | 'ita'
  | 'nor'
  | 'pol'
  | 'por'
  | 'rus'
  | 'slo'
  | 'spa'
  | 'tur'
  | 'vie'
