"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvDataset = exports.parseCsv = void 0;
const tslib_1 = require("tslib");
const Papa = tslib_1.__importStar(require("papaparse"));
const base_1 = require("./base");
const utils_1 = require("../lib/utils");
function parseCsv(text) {
    // first parse the header to guess the delimiter
    // note that we do that to not rely on Papaparse logic for guessing delimiter
    let delimiter;
    try {
        const header = text.split('\n')[0];
        const result = Papa.parse(header, {
            header: false,
        });
        delimiter = result.meta.delimiter;
    }
    catch (e) {
        throw new Error('CSV parsing failed: the delimiter could not be guessed');
    }
    const parsed = Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        delimiter,
    });
    if (parsed.errors.length) {
        throw new Error('CSV parsing failed for the following reasons:\n' +
            parsed.errors
                .map((error) => `* ${error.message} at row ${error.row}, column ${error.index}`)
                .join('\n'));
    }
    const items = parsed.data.map(utils_1.jsonToGeojsonFeature);
    return (0, utils_1.processItemProperties)(items, true);
}
exports.parseCsv = parseCsv;
class CsvDataset extends base_1.BaseDataset {
    constructor() {
        super(...arguments);
        this.parseResult_ = this.fetchAsText().then(parseCsv);
        this.propertiesInfo_ = this.parseResult_.then((result) => result.properties);
        this.datasetInfo_ = this.parseResult_.then((result) => ({
            itemsCount: result.items.length,
        }));
    }
    get properties() {
        return this.propertiesInfo_;
    }
    get info() {
        return this.datasetInfo_;
    }
    readAll() {
        return this.parseResult_.then((result) => result.items);
    }
}
exports.CsvDataset = CsvDataset;
//# sourceMappingURL=csv.js.map