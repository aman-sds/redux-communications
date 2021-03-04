"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const Branch_1 = require("../models/Branch");
class SimpleStrategy extends base_1.BaseStrategy {
    constructor(config) {
        const extendedConfig = Object.assign(Object.assign({}, config), { branches: [
                new Branch_1.Branch('model', config.modelApiProvider || [], config.modelInitialState),
                ...(config.branches || [])
            ] });
        super(extendedConfig);
    }
}
exports.SimpleStrategy = SimpleStrategy;
//# sourceMappingURL=simple.js.map