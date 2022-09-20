import { TextEncoder, TextDecoder } from 'util'

// this is needed because jsdom does not include these as globals by default
// see https://github.com/jsdom/jsdom/issues/2524
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
