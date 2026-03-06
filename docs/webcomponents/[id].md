<script setup>
import { useData } from "vitepress";
import { onMounted } from 'vue';

const { params } = useData();

onMounted(() => {
  // importing the web components script dynamically because it assumes a browser context
  // see https://vitepress.dev/guide/ssr-compat#libraries-that-access-browser-api-on-import
  import('../../dist/gn-wc.js');

  document.title = params.value.title;

  if (params.value.jsCode) {
    const fn = new Function(`
console.log('Running sample code...');
${decodeURIComponent(params.value.jsCode)}
`);
    fn();
  }
});
</script>

# {{ params.title }}

## Example

<!-- @content -->

## Source code

```html-vue
{{ decodeURIComponent(params.sourceCode) }}
```
