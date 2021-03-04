"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const APIProvider_1 = require("../models/APIProvider");
class APIProviderBuilder {
    constructor() {
        this.hooks = {};
    }
    static create(hooks) {
        const builder = new APIProviderBuilder();
        if (hooks) {
            builder.hooks = hooks;
        }
        return builder;
    }
    setType(type) {
        this.type = type;
        return this;
    }
    setHandler(handler) {
        this.handler = handler;
        return this;
    }
    setDefaultHandler() {
        this.handler = (data) => tslib_1.__awaiter(this, void 0, void 0, function* () { return data; });
        return this;
    }
    beforeRequest(hook) {
        this.hooks.onStart = hook;
        return this;
    }
    formatResponse(hook) {
        this.hooks.mapSuccess = hook;
        return this;
    }
    formatFail(hook) {
        this.hooks.mapFail = hook;
        return this;
    }
    afterSuccess(hook) {
        this.hooks.onSuccess = hook;
        return this;
    }
    afterFail(hook) {
        this.hooks.onFail = hook;
        return this;
    }
    setPreRequestDataMapper(mapper) {
        this.hooks.preRequestDataMapper = mapper;
        return this;
    }
    clearBranchParams() {
        this.hooks.clearParams = true;
        return this;
    }
    throwOnFail() {
        this.hooks.throwOnFail = true;
        return this;
    }
    mapParams(mapper) {
        this.hooks.mapParams = mapper;
        return this;
    }
    hydrateTo(ModelCtor) {
        this.hooks.hydrateTo = ModelCtor;
        return this;
    }
    build() {
        const { type, handler, hooks } = this;
        return new APIProvider_1.APIProvider(type, handler, hooks);
    }
}
exports.APIProviderBuilder = APIProviderBuilder;
//# sourceMappingURL=APIProviderBuilder.js.map