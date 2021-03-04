"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Branch_1 = require("../models/Branch");
const base_1 = require("../strategies/base");
const communicationFactory_1 = require("../communicationFactory");
class CommunicationBuilder {
    constructor() {
        this.branches = [];
        this.sagas = [];
    }
    setNamespace(namespace) {
        this.namespace = namespace;
        return this;
    }
    addBranch(name, apiProviders, initialState) {
        const branch = new Branch_1.Branch(name, apiProviders, initialState);
        this.branches.push(branch);
        return this;
    }
    addSaga(saga) {
        this.sagas.push(saga);
        return this;
    }
    build() {
        const { namespace, branches, sagas } = this;
        const strategy = new base_1.BaseStrategy({
            namespace,
            branches
        });
        const communication = communicationFactory_1.buildCommunication(strategy);
        communication.sagas = communication.sagas.concat(sagas);
        return communication;
    }
}
exports.CommunicationBuilder = CommunicationBuilder;
//# sourceMappingURL=CommunicationBuilder.js.map