"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const Branch_1 = require("../models/Branch");
const APIProvider_1 = require("../models/APIProvider");
const enums_1 = require("../enums");
const effects_1 = require("redux-saga/effects");
const helpers_1 = require("../helpers");
const formatters_1 = require("../formatters");
class CRUDStrategy extends base_1.BaseStrategy {
    constructor(config) {
        const modelAPIProviders = [];
        const collectionAPIProviders = [];
        if (config.transport) {
            function* onSuccess() {
                const params = yield effects_1.select(state => state[config.namespace] && state[config.namespace].collection.params);
                yield effects_1.put({ type: helpers_1.getStartType(config.namespace, 'collection', enums_1.EActionsTypes.get), payload: params });
            }
            const modelHooks = { onSuccess };
            modelAPIProviders.push(new APIProvider_1.APIProvider(enums_1.EActionsTypes.add, config.transport.add, modelHooks), new APIProvider_1.APIProvider(enums_1.EActionsTypes.get, config.transport.get, modelHooks), new APIProvider_1.APIProvider(enums_1.EActionsTypes.update, config.transport.update, modelHooks), new APIProvider_1.APIProvider(enums_1.EActionsTypes.delete, config.transport.delete, modelHooks));
            const collectionHooks = {
                preRequestDataMapper: formatters_1.buildCollectionPreRequestDataMapper()
            };
            collectionAPIProviders.push(new APIProvider_1.APIProvider(enums_1.EActionsTypes.get, config.transport.getCollection, collectionHooks));
        }
        const extendedConfig = Object.assign(Object.assign({}, config), { branches: [
                new Branch_1.Branch('model', config.modelApiProviders || modelAPIProviders, config.modelInitialState),
                new Branch_1.Branch('collection', config.collectionApiProviders || collectionAPIProviders, config.collectionInitialState),
                ...(config.branches || [])
            ] });
        super(extendedConfig);
    }
}
exports.CRUDStrategy = CRUDStrategy;
//# sourceMappingURL=crud.js.map