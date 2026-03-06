import { getStandaloneSearchSamples } from '../../.vitepress/load-webcomponent-samples'

export default {
  async paths() {
    const searchSamples = await getStandaloneSearchSamples()
    return searchSamples.map(
      ({ title, slug, sourceCode, htmlCode, jsCode }) => ({
        params: { id: slug, title, sourceCode, jsCode },
        content: htmlCode,
      })
    )
  },
}
