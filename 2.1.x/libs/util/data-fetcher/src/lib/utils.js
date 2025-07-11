"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJsonDataItemsProxy = exports.processItemProperties = exports.jsonToGeojsonFeature = exports.tryParseNumber = exports.tryParseDate = exports.fetchDataAsArrayBuffer = exports.fetchDataAsText = exports.fetchHeaders = exports.inferDatasetType = void 0;
const tslib_1 = require("tslib");
const model_1 = require("./model");
const ogc_client_1 = require("@camptocamp/ogc-client");
const headers_1 = require("./headers");
const parse_1 = tslib_1.__importDefault(require("date-fns/parse"));
const parseISO_1 = tslib_1.__importDefault(require("date-fns/parseISO"));
async function inferDatasetType(url, typeHint) {
    const fileExtensionMatches = new URL(url, typeof window !== 'undefined' ? window.location.toString() : undefined).pathname.match(/\.(.+)$/);
    const fileExtension = fileExtensionMatches && fileExtensionMatches.length
        ? fileExtensionMatches[1].toLowerCase()
        : null;
    // 1. type hint
    if (typeHint)
        return Promise.resolve(typeHint);
    // 2. content-type header
    const headers = await fetchHeaders(url);
    if ('supportedType' in headers)
        return headers.supportedType;
    // 3. file extension from url
    else if (model_1.SupportedTypes.indexOf(fileExtension) > -1)
        return fileExtension;
    // no type inferred or hinted
    if ('mimeType' in headers)
        throw model_1.FetchError.unsupportedType(headers.mimeType);
    else
        throw model_1.FetchError.unknownType();
}
exports.inferDatasetType = inferDatasetType;
function fetchHeaders(url) {
    return (0, ogc_client_1.sharedFetch)(url, 'HEAD')
        .catch((error) => {
        throw model_1.FetchError.corsOrNetwork(error.message);
    })
        .then((response) => {
        if (!response.ok) {
            throw model_1.FetchError.http(response.status);
        }
        return (0, headers_1.parseHeaders)(response.headers);
    });
}
exports.fetchHeaders = fetchHeaders;
function fetchDataAsText(url) {
    return (0, ogc_client_1.useCache)(() => (0, ogc_client_1.sharedFetch)(url)
        .catch((error) => {
        throw model_1.FetchError.corsOrNetwork(error.message);
    })
        .then(async (response) => {
        if (!response.ok) {
            throw model_1.FetchError.http(response.status);
        }
        return response.text();
    }), url, 'asText');
}
exports.fetchDataAsText = fetchDataAsText;
function fetchDataAsArrayBuffer(url) {
    return (0, ogc_client_1.useCache)(() => (0, ogc_client_1.sharedFetch)(url)
        .catch((error) => {
        throw model_1.FetchError.corsOrNetwork(error.message);
    })
        .then(async (response) => {
        if (!response.ok) {
            throw model_1.FetchError.http(response.status);
        }
        // convert to a numeric array so that we can store the response in cache
        return Array.from(new Uint8Array(await response.arrayBuffer()));
    }), url, 'asArrayBuffer').then((array) => {
        return new Uint8Array(array).buffer;
    });
}
exports.fetchDataAsArrayBuffer = fetchDataAsArrayBuffer;
function tryParseDate(input) {
    function tryIso() {
        const parsed = (0, parseISO_1.default)(input);
        return isNaN(parsed.getDate()) ? null : parsed;
    }
    function tryFormat(format) {
        const parsed = (0, parse_1.default)(input, format, new Date());
        return isNaN(parsed.getDate()) ? null : parsed;
    }
    return (tryIso() ||
        tryFormat('dd/MM/yyyy') ||
        tryFormat('dd.MM.yyyy') ||
        tryFormat('MM/dd/yyyy') ||
        null);
}
exports.tryParseDate = tryParseDate;
function tryParseNumber(input) {
    if (isNaN(input))
        return null;
    const parsed = parseFloat(input);
    return isNaN(parsed) ? null : parsed;
}
exports.tryParseNumber = tryParseNumber;
function jsonToGeojsonFeature(object) {
    const { id, properties } = Object.keys(object)
        .map((property) => (property ? property : 'unknown')) //prevent empty strings
        .reduce((prev, curr) => curr.toLowerCase().endsWith('id')
        ? {
            ...prev,
            id: object[curr],
        }
        : {
            ...prev,
            properties: { ...prev.properties, [curr]: object[curr] },
        }, { id: undefined, properties: {} });
    return {
        type: 'Feature',
        geometry: null,
        properties,
        ...(id !== undefined && { id }),
    };
}
exports.jsonToGeojsonFeature = jsonToGeojsonFeature;
function mutateProperties(items, mutators) {
    const mutatorKeys = Object.keys(mutators);
    for (let i = 0, ii = items.length; i < ii; i++) {
        const item = items[i];
        for (const mutatorField of mutatorKeys) {
            if (!(mutatorField in item.properties))
                continue;
            item.properties[mutatorField] = mutators[mutatorField](item.properties[mutatorField]);
        }
    }
    return items;
}
const SAMPLE_SIZE = 20;
/**
 * This will infer field types from a list of data items and cast the values accordingly
 * @param items
 * @param inferTypes
 */
function processItemProperties(items, inferTypes = false) {
    const foundFields = {};
    for (let i = 0, ii = Math.min(SAMPLE_SIZE, items.length); i < ii; i++) {
        const item = items[i];
        const fields = Object.keys(item.properties);
        for (const field of fields) {
            if (!(field in foundFields)) {
                foundFields[field] = {
                    label: field,
                    name: field,
                    type: null,
                };
            }
            const value = item.properties[field];
            const info = foundFields[field];
            if (value === undefined || value === '' || value === null)
                continue;
            if (!inferTypes) {
                if (info.type === null && typeof value === 'number') {
                    info.type = 'number';
                }
                else if (info.type === 'number' && typeof value !== 'number') {
                    info.type = 'string';
                }
                continue;
            }
            const parsedNumber = tryParseNumber(value);
            if (info.type === null && parsedNumber !== null) {
                info.type = 'number';
                continue;
            }
            else if (info.type === 'number' && parsedNumber === null) {
                info.type = 'string';
                continue;
            }
            const parsedDate = tryParseDate(value);
            if (info.type === null && parsedDate !== null) {
                info.type = 'date';
            }
            else if (info.type === 'date' && parsedDate === null) {
                info.type = 'string';
            }
        }
    }
    const properties = [];
    const mutators = {};
    for (const field in foundFields) {
        const info = foundFields[field];
        if (info.type === 'number') {
            mutators[field] = tryParseNumber;
        }
        else if (info.type === 'date') {
            mutators[field] = tryParseDate;
        }
        properties.push({ ...info, type: info.type || 'string' });
    }
    if (inferTypes) {
        mutateProperties(items, mutators);
    }
    return { items, properties };
}
exports.processItemProperties = processItemProperties;
/**
 * This creates a Proxy that allows reading and writing to the data item properties
 * as if it was a simple array of JSON objects
 * @param items
 */
function getJsonDataItemsProxy(items) {
    return new Proxy(items, {
        get(target, p) {
            if (typeof p === 'string' &&
                !Number.isNaN(parseInt(p)) &&
                target[p]?.properties) {
                return target[p].properties;
            }
            return target[p];
        },
        set() {
            throw new Error('This object is read-only');
        },
    });
}
exports.getJsonDataItemsProxy = getJsonDataItemsProxy;
//# sourceMappingURL=utils.js.map