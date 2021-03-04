import { IAction, IFullState } from './types';
import { StoreBranch } from './models/StoreBranch';
import { APIProvider, IAPIProviderHooks } from './models/APIProvider';
export declare function buildReducer<Data = object, Params = any, Errors = any>(namespace: string, branchName: string, type: string, initialState: StoreBranch<Data, Params, Errors>, providerHooks?: IAPIProviderHooks<Data, Params, Errors>): {
    [x: string]: ((state: IFullState<StoreBranch<Data, Params, Errors>>, action: IAction<Params, any, any>) => {
        [x: string]: StoreBranch<Data, Params, Errors>;
    }) | ((state: IFullState<StoreBranch<Data, Params, Errors>>, action: IAction<Data, any, any>) => {
        [x: string]: StoreBranch<Data, Params, Errors> | StoreBranch<Data, Params, null>;
    }) | ((state: IFullState<StoreBranch<Data, Params, Errors>>, action: IAction<Errors, any, any>) => {
        [x: string]: StoreBranch<Data, Params, Errors>;
    });
};
export declare function buildSaga<Data, Params, Errors>(namespace: string, branchName: string, apiProvider: APIProvider<Data, Params, Errors>): IterableIterator<unknown>;
export declare function buildActionCreator(actionType: string, cb?: (error: unknown, response: unknown) => void): (data: unknown) => {
    type: string;
    payload: unknown;
    cb: ((error: unknown, response: unknown) => void) | undefined;
};
