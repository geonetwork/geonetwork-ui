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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelReader = void 0;
exports.parseExcel = parseExcel;
const utils_1 = require("../utils");
const base_file_1 = require("./base-file");
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
class ExcelReader extends base_file_1.BaseFileReader {
    getData() {
        return (0, utils_1.fetchDataAsArrayBuffer)(this.url, this.cacheActive).then(parseExcel);
    }
}
exports.ExcelReader = ExcelReader;
//# sourceMappingURL=excel.js.map