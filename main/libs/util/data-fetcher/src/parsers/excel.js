"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelDataset = exports.parseExcel = void 0;
const base_1 = require("./base");
const utils_1 = require("../lib/utils");
/**
 * This will read the first sheet of the excel workbook and expect the first
 * line to contain the properties names
 * @param buffer
 */
function parseExcel(buffer) {
    return Promise.resolve().then(() => __importStar(require('xlsx'))).then(({ read, utils }) => {
        const workbook = read(buffer);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        let json = utils.sheet_to_json(sheet);
        if (!json.length) {
            json = [];
        }
        return (0, utils_1.processItemProperties)(json.map(utils_1.jsonToGeojsonFeature), true);
    });
}
exports.parseExcel = parseExcel;
class ExcelDataset extends base_1.BaseDataset {
    constructor() {
        super(...arguments);
        this.parseResult_ = this.fetchAsBuffer().then(parseExcel);
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
exports.ExcelDataset = ExcelDataset;
//# sourceMappingURL=excel.js.map