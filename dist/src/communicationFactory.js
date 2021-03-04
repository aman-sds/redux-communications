"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function buildCommunication(strategy) {
    const reducers = strategy.buildReducers();
    const sagas = strategy.buildSagas();
    const injector = strategy.buildInjector();
    return {
        namespace: strategy.config.namespace,
        branches: strategy.config.branches,
        reducers,
        sagas,
        injector
    };
}
exports.buildCommunication = buildCommunication;
//# sourceMappingURL=communicationFactory.js.map