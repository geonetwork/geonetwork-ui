import { firstValueFrom } from 'rxjs'
import { EmbeddedTranslateLoader } from './embedded.translate.loader'

jest.mock(
  '../../../../../translations/en.json',
  () => ({
    'first.label': 'First Label.',
    'second.label': 'Second Label.',
  }),
  { virtual: true }
)
jest.mock(
  '../../../../../translations/fr.json',
  () => ({
    'first.label': '',
    'second.label': 'Deuxième libellé.',
  }),
  { virtual: true }
)
describe('EmbeddedTranslateLoader', () => {
  let loader: EmbeddedTranslateLoader
  beforeEach(() => {
    loader = new EmbeddedTranslateLoader()
  })
  it('should create an instance', () => {
    expect(loader).toBeTruthy()
  })
  it('uses only 2 letter code (ignore regional code)', async () => {
    const translation = await firstValueFrom(loader.getTranslation('en_US'))
    expect(translation['first.label']).toEqual('First Label.')
  })
  it('filters out empty translations', async () => {
    const translation = await firstValueFrom(loader.getTranslation('fr'))
    expect(translation).toEqual({
      'second.label': 'Deuxième libellé.',
    })
  })
})
