"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("@redux-saga/core/effects");
class APIProvider {
    constructor(type, handler, hooks = {}, effectHandler = effects_1.takeEvery) {
        this.effectHandler = effects_1.takeEvery;
        this.type = type;
        this.handler = handler;
        this.hooks = hooks;
        this.effectHandler = effectHandler;
    }
}
exports.APIProvider = APIProvider;
//# sourceMappingURL=APIProvider.js.map