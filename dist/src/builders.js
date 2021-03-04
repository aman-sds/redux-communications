"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("redux-saga/effects");
const helpers_1 = require("./helpers");
const StoreBranch_1 = require("./models/StoreBranch");
function buildReducer(namespace, branchName, type, initialState, providerHooks = {}) {
    const startActionType = helpers_1.getStartType(namespace, branchName, type), successActionType = helpers_1.getSuccessType(namespace, branchName, type), failActionType = helpers_1.getFailType(namespace, branchName, type);
    return {
        [startActionType]: (state, action) => {
            let data = initialState.data;
            let errors = initialState.errors;
            if (providerHooks.preRequestDataMapper) {
                data = providerHooks.preRequestDataMapper(null, action.payload, state[branchName], state);
            }
            return Object.assign(Object.assign({}, state), { [branchName]: new StoreBranch_1.StoreBranch(data, action.payload, errors, true) });
        },
        [successActionType]: (state, action) => {
            return Object.assign(Object.assign({}, state), { [branchName]: new StoreBranch_1.StoreBranch(action.payload, providerHooks.clearParams ? null : state[branchName] && state[branchName].params) });
        },
        [failActionType]: (state, action) => {
            return Object.assign(Object.assign({}, state), { [branchName]: new StoreBranch_1.StoreBranch(state[branchName] && state[branchName].data, state[branchName] && state[branchName].params, action.payload) });
        }
    };
}
exports.buildReducer = buildReducer;
function buildSaga(namespace, branchName, apiProvider) {
    const saga = function* () {
        const { type, hooks, effectHandler = effects_1.takeEvery } = apiProvider;
        const { mapSuccess, mapFail, onSuccess, onFail, onStart, mapParams, hydrateTo } = hooks;
        const actionType = helpers_1.getStartType(namespace, branchName, type);
        yield effectHandler(actionType, function* (action) {
            const fullState = yield effects_1.select(state => state);
            const branchState = (fullState && fullState[namespace] && fullState[namespace][branchName]) || null;
            if (!branchState) {
                throw new Error(`Branch ${branchName} in namespace ${namespace} not defined`);
            }
            try {
                if (onStart) {
                    yield effects_1.call(onStart, action.payload, branchState, fullState);
                }
                const params = mapParams ? yield effects_1.call(mapParams, action.payload, branchState, fullState) : action.payload;
                const response = yield effects_1.call(apiProvider.handler, params);
                const formattedResponse = mapSuccess
                    ? yield effects_1.call(mapSuccess, response, action.payload, branchState, fullState)
                    : response;
                const hydratedResponse = hydrateTo ? hydrateResponse(formattedResponse, hydrateTo) : formattedResponse;
                yield effects_1.put({ type: helpers_1.getSuccessType(namespace, branchName, type), payload: hydratedResponse });
                if (onSuccess) {
                    yield effects_1.call(onSuccess, hydratedResponse, action.payload, branchState, fullState);
                }
                if (action.cb) {
                    action.cb(null, hydratedResponse);
                }
            }
            catch (e) {
                const error = e || new Error('Something went wrong. Please check network connection.');
                const formattedError = mapFail
                    ? yield effects_1.call(mapFail, error, action.payload, branchState, fullState)
                    : error;
                yield effects_1.put({ type: helpers_1.getFailType(namespace, branchName, type), payload: formattedError });
                if (onFail) {
                    yield effects_1.call(onFail, formattedError, action.payload, branchState, fullState);
                }
                if (action.cb) {
                    action.cb(formattedError, null);
                }
            }
        });
    };
    return saga();
}
exports.buildSaga = buildSaga;
function buildActionCreator(actionType, cb) {
    return (data) => ({ type: actionType, payload: data, cb });
}
exports.buildActionCreator = buildActionCreator;
function hydrateResponse(response, ModelCtor) {
    return new ModelCtor(response);
}
//# sourceMappingURL=builders.js.map