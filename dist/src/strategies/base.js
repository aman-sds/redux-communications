"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const helpers_1 = require("../helpers");
class BaseStrategy {
    constructor(config) {
        this.config = config;
    }
    buildActions() {
        return {};
    }
    buildReducers() {
        const { namespace, branches } = this.config;
        const reducers = branches.reduce((accum, branch) => (Object.assign(Object.assign({}, accum), branch.buildBranchReducers(namespace))), {});
        const res = {};
        const initialState = branches.reduce((accumulator, branch) => {
            accumulator[branch.name] = branch.initialState;
            return accumulator;
        }, {});
        res[namespace] = (state = initialState, action) => {
            return reducers[action.type] ? Object.assign(Object.assign({}, state), reducers[action.type](state, action)) : state;
        };
        return res;
    }
    buildInjector() {
        const { namespace, branches } = this.config;
        const mapStateToProps = (state) => (Object.assign({}, branches.reduce((accum, branch) => (Object.assign(Object.assign({}, accum), { [helpers_1.getStateBranchName(namespace, branch.name)]: state[namespace][branch.name] })), {})));
        const mapDispatchToProps = dispatch => branches.reduce((accum, next) => (Object.assign(Object.assign({}, accum), next.buildBranchDispatchers(namespace, dispatch))), {});
        return react_redux_1.connect(mapStateToProps, mapDispatchToProps);
    }
    buildSagas() {
        const { namespace, branches, sagas = [] } = this.config;
        const saga = branches.reduce((accum, branch) => {
            const branchSagas = branch.buildBranchSagas(namespace);
            return [...accum, ...branchSagas];
        }, []);
        return [...saga, ...sagas];
    }
}
exports.BaseStrategy = BaseStrategy;
//# sourceMappingURL=base.js.map