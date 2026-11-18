"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseReader = exports.getJsonDataItemsProxy = exports.FetchError = exports.SupportedTypes = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./lib/data-fetcher"), exports);
var model_1 = require("./lib/model");
Object.defineProperty(exports, "SupportedTypes", { enumerable: true, get: function () { return model_1.SupportedTypes; } });
Object.defineProperty(exports, "FetchError", { enumerable: true, get: function () { return model_1.FetchError; } });
var utils_1 = require("./lib/utils");
Object.defineProperty(exports, "getJsonDataItemsProxy", { enumerable: true, get: function () { return utils_1.getJsonDataItemsProxy; } });
var base_1 = require("./lib/readers/base");
Object.defineProperty(exports, "BaseReader", { enumerable: true, get: function () { return base_1.BaseReader; } });
//# sourceMappingURL=index.js.map