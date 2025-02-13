"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseHeaders = parseHeaders;
const model_1 = require("./model");
function parseHeaders(httpHeaders) {
    const result = {};
    if (httpHeaders.has('Content-Type')) {
        result.mimeType = httpHeaders.get('Content-Type').split(';')[0];
        const supported = model_1.SupportedTypes.filter((type) => model_1.AllMimeTypes[type].indexOf(result.mimeType) > -1)[0] || null;
        if (supported !== null)
            result.supportedType = supported;
    }
    if (httpHeaders.has('Content-Length')) {
        result.fileSizeBytes = parseInt(httpHeaders.get('Content-Length'));
    }
    if (httpHeaders.has('Last-Modified')) {
        const date = new Date(httpHeaders.get('Last-Modified'));
        if (Number.isNaN(date.valueOf()))
            result.lastUpdateInvalid = true;
        else
            result.lastUpdate = date;
    }
    return result;
}
//# sourceMappingURL=headers.js.map