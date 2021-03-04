import { Dispatch } from 'redux';
import { IBranchType } from '../types';
import { APIProvider } from './APIProvider';
import { StoreBranch } from './StoreBranch';
export declare class Branch<Data extends any = any, Params extends any = any, Errors extends any = any> implements IBranchType {
    readonly name: string;
    readonly apiProviders: APIProvider[];
    readonly initialState: StoreBranch<Data, Params, Errors>;
    constructor(name: string, apiProviders: APIProvider[] | APIProvider, initialState?: StoreBranch<Data, Params, Errors>);
    buildBranchReducers<Data, Params, Errors>(namespace: string): {};
    buildBranchDispatchers(namespace: string, dispatch: Dispatch): {
        [key: string]: (data: Params) => Promise<unknown>;
    };
    buildBranchSagas(namespace: string): IterableIterator<unknown>[];
}
