import { dropEmptyTranslations } from './translate.loader.utils'

const FR = {
  'first.label': '',
  'second.label': 'Deuxième libellé.',
}
describe('TranslateLoaderUtils', () => {
  it('should filter out empty translations', () => {
    expect(dropEmptyTranslations(FR)).toEqual({
      'second.label': 'Deuxième libellé.',
    })
  })
})
