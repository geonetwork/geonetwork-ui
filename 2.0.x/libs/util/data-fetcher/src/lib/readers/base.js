"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseReader = void 0;
class BaseReader {
    constructor(url) {
        this.url = url;
        this.selected = null;
        this.groupedBy = null;
        this.aggregations = null;
        this.filter = null;
        this.sort = null;
        this.startIndex = null;
        this.count = null;
    }
    load() {
        throw new Error('not implemented');
    }
    get properties() {
        throw new Error('not implemented');
    }
    get info() {
        throw new Error('not implemented');
    }
    read() {
        throw new Error('not implemented');
    }
    selectAll() {
        this.groupedBy = null;
        this.aggregations = null;
        this.selected = null;
        this.filter = null;
        this.startIndex = null;
        this.count = null;
        return this;
    }
    select(...selectedFields) {
        this.selected = selectedFields;
        this.aggregations = null; // clear aggregations & groups when selecting fields
        this.groupedBy = null;
        return this;
    }
    groupBy(...groupBy) {
        this.groupedBy = groupBy;
        this.selected = null; // clear normal field selection when aggregating
        return this;
    }
    aggregate(...aggregations) {
        this.aggregations = aggregations;
        return this;
    }
    where(filter) {
        this.filter = filter;
        return this;
    }
    orderBy(...fieldSorts) {
        this.sort = fieldSorts;
        return this;
    }
    limit(startIndex, count) {
        this.startIndex = startIndex;
        this.count = count;
        return this;
    }
}
exports.BaseReader = BaseReader;
//# sourceMappingURL=base.js.map