"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("./enums");
function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.substring(1);
}
exports.capitalize = capitalize;
function formatMethodName(s) {
    if (s.includes('_')) {
        let result = s.toLowerCase();
        const matches = result.match(/(_\w)/g);
        if (!matches) {
            return result.toLowerCase();
        }
        for (const match of matches) {
            result = result.replace(match, match.toUpperCase());
        }
        return result.replace(/_/g, '');
    }
    else {
        const condition = s.split('').reduce((prev, next) => prev && next.toUpperCase() === next, true);
        if (condition) {
            return s.toLowerCase();
        }
        else {
            return s.charAt(0).toLowerCase() + s.substring(1);
        }
    }
}
exports.formatMethodName = formatMethodName;
function getTypePrefix(namespace, branchName, type) {
    return `${namespace.toUpperCase()}_${branchName.toUpperCase()}_${type.toUpperCase()}`;
}
exports.getTypePrefix = getTypePrefix;
function getStartType(namespace, branchName, type) {
    const typePrefix = getTypePrefix(namespace, branchName, type);
    return `${typePrefix}_TRY`;
}
exports.getStartType = getStartType;
function getSuccessType(namespace, branchName, type) {
    const typePrefix = getTypePrefix(namespace, branchName, type);
    return `${typePrefix}_SUCCESS`;
}
exports.getSuccessType = getSuccessType;
function getFailType(namespace, branchName, type) {
    const typePrefix = getTypePrefix(namespace, branchName, type);
    return `${typePrefix}_FAIL`;
}
exports.getFailType = getFailType;
function getActionMethodName(namespace, branchName, type) {
    return `${formatMethodName(type)}${capitalize(namespace)}${capitalize(branchName)}`;
}
exports.getActionMethodName = getActionMethodName;
function getStateBranchName(namespace, branchName) {
    return `${namespace}${capitalize(branchName)}`;
}
exports.getStateBranchName = getStateBranchName;
function getAPIMethodName(namespace, branchName, method) {
    let type = method;
    switch (method.toUpperCase()) {
        case 'POST':
            type = enums_1.EActionsTypes.add;
            break;
        case 'GET':
            type = enums_1.EActionsTypes.get;
            break;
        case 'PUT':
            type = enums_1.EActionsTypes.update;
            break;
        case 'DELETE':
            type = enums_1.EActionsTypes.delete;
            break;
    }
    return getActionMethodName(namespace, branchName, type);
}
exports.getAPIMethodName = getAPIMethodName;
//# sourceMappingURL=helpers.js.map