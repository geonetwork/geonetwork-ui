import { getWebcomponentSamples } from '../.vitepress/load-webcomponent-samples'

export default {
  async paths() {
    const wcSamples = await getWebcomponentSamples()
    return wcSamples.map(({ title, slug, sourceCode, htmlCode, jsCode }) => ({
      params: { id: slug, title, sourceCode, jsCode },
      content: htmlCode,
    }))
  },
}
