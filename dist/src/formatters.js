"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function buildCollectionResponseFormatter() {
    return (response, payload, branchState) => {
        if (typeof payload.offset !== 'undefined' && payload.offset === 0) {
            return response;
        }
        const oldData = (branchState.data && branchState.data.data) || [];
        return { data: [...oldData, ...response.data], meta: response.meta };
    };
}
exports.buildCollectionResponseFormatter = buildCollectionResponseFormatter;
function buildCollectionPreRequestDataMapper() {
    return (response, payload, branchState) => branchState.data;
}
exports.buildCollectionPreRequestDataMapper = buildCollectionPreRequestDataMapper;
//# sourceMappingURL=formatters.js.map