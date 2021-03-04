"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const APIProvider_1 = require("./APIProvider");
const builders_1 = require("../builders");
const helpers_1 = require("../helpers");
const enums_1 = require("../enums");
const StoreBranch_1 = require("./StoreBranch");
class Branch {
    constructor(name, apiProviders, initialState = new StoreBranch_1.StoreBranch()) {
        this.name = name;
        this.initialState = initialState;
        if (apiProviders instanceof Array) {
            this.apiProviders = apiProviders;
        }
        else {
            this.apiProviders = [apiProviders];
        }
        this.apiProviders.push(new APIProvider_1.APIProvider(enums_1.EActionsTypes.clear, () => Promise.resolve(null)));
        this.apiProviders.push(new APIProvider_1.APIProvider(enums_1.EActionsTypes.set, payload => Promise.resolve(payload)));
        this.apiProviders.push(new APIProvider_1.APIProvider(enums_1.EActionsTypes.setErrors, errors => Promise.reject(errors)));
    }
    buildBranchReducers(namespace) {
        return this.apiProviders.reduce((accum, provider) => (Object.assign(Object.assign({}, accum), builders_1.buildReducer(namespace, this.name, provider.type, this.initialState, provider.hooks))), {});
    }
    buildBranchDispatchers(namespace, dispatch) {
        return this.apiProviders.reduce((accum, provider) => {
            const actionMethodLabel = helpers_1.getActionMethodName(namespace, this.name, provider.type);
            const startActionType = helpers_1.getStartType(namespace, this.name, provider.type);
            accum[actionMethodLabel] = data => new Promise((res, rej) => {
                const actionCreator = builders_1.buildActionCreator(startActionType, (e, r) => {
                    if (e) {
                        if (provider.hooks.throwOnFail) {
                            rej(e);
                        }
                        else {
                            console.error(e);
                            res(r);
                        }
                    }
                    else {
                        res(r);
                    }
                });
                const action = actionCreator(data);
                dispatch(action);
            });
            return accum;
        }, {});
    }
    buildBranchSagas(namespace) {
        return this.apiProviders.map(provider => {
            return builders_1.buildSaga(namespace, this.name, provider);
        });
    }
}
exports.Branch = Branch;
//# sourceMappingURL=Branch.js.map