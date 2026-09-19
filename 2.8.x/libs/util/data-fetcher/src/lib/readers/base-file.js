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
exports.BaseFileReader = void 0;
const utils_1 = require("../utils");
const sql_utils_1 = require("../sql-utils");
const base_cache_1 = require("./base-cache");
class BaseFileReader extends base_cache_1.BaseCacheReader {
    getData() {
        throw new Error('not implemented');
    }
    load() {
        this.parseResult_ = this.getData();
    }
    get properties() {
        return this.parseResult_.then((result) => result.properties);
    }
    get info() {
        return this.parseResult_.then((result) => ({
            itemsCount: result.items.length,
        }));
    }
    async read() {
        const items = (await this.parseResult_).items;
        // no query defined: return the full results as is
        if (this.groupedBy == null &&
            this.aggregations == null &&
            this.selected == null &&
            this.sort == null &&
            this.filter == null &&
            this.startIndex == null &&
            this.count == null) {
            return items;
        }
        const jsonItems = (0, utils_1.getJsonDataItemsProxy)(items);
        const query = (0, sql_utils_1.generateSqlQuery)(this.selected, this.filter, this.sort, this.startIndex, this.count, this.groupedBy, this.aggregations);
        const result = await Promise.resolve().then(() => __importStar(require('alasql'))).then((module) => module.default(query, [jsonItems]));
        return result.map(utils_1.jsonToGeojsonFeature);
    }
}
exports.BaseFileReader = BaseFileReader;
//# sourceMappingURL=base-file.js.map