import '!style-loader!css-loader!../src/styles.css'

// note that the nx run webcomponents:build task _must_ have been run for these
// imports to work
import '../../../dist/apps/webcomponents/runtime'
import '../../../dist/apps/webcomponents/main'
import '../../../dist/apps/webcomponents/polyfills'
