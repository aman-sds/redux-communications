"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const APIProviderBuilder_1 = require("./APIProviderBuilder");
class APIProviderGroup {
    constructor() {
        this.builders = [];
        this.hooks = {};
    }
    static create() {
        return new APIProviderGroup();
    }
    beforeRequest(hook) {
        this.hooks.onStart = hook;
        return this;
    }
    formatResponse(hook) {
        this.hooks.mapSuccess = hook;
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
    mapParams(mapper) {
        this.hooks.mapParams = mapper;
        return this;
    }
    hydrateTo(ModelCtor) {
        this.hooks.hydrateTo = ModelCtor;
        return this;
    }
    add(builderCallback) {
        this.builders.push(builderCallback);
        return this;
    }
    build() {
        return this.builders.map(builderCallback => builderCallback(APIProviderBuilder_1.APIProviderBuilder.create(this.hooks)));
    }
}
exports.APIProviderGroup = APIProviderGroup;
//# sourceMappingURL=APIProviderGroup.js.map