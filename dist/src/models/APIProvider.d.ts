import { takeEvery } from '@redux-saga/core/effects';
import { StoreBranch } from './StoreBranch';
import { IFullState, INewable } from '../types';
export declare type TApiProviderPreRequestHook<Data, Params, Errors> = (response: null, payload: Params, branchState: StoreBranch<Data, Params, Errors>, fullState: IFullState<StoreBranch<Data, Params, Errors>>) => Data;
export declare type TApiProviderSuccessHook<Data, Params, Errors> = (response: Data, originalParams: Params, branchState: StoreBranch<Data, Params, Errors>, fullState: IFullState<StoreBranch<Data, Params, Errors>>) => any;
export declare type TApiProviderFailHook<Data, Params, Errors> = (response: Errors, originalParams: Params, branchState: StoreBranch<Data, Params, Errors>, fullState: IFullState<StoreBranch<Data, Params, Errors>>) => any;
export declare type TApiProviderSuccessMapper<Data, Params, Errors> = (response: any, payload: Params, branchState: StoreBranch<Data, Params, Errors>, fullState: IFullState<StoreBranch<Data, Params, Errors>>) => Data;
export declare type TApiProviderFailMapper<Data, Params, Errors> = (response: any, payload: Params, branchState: StoreBranch<Data, Params, Errors>, fullState: IFullState<StoreBranch<Data, Params, Errors>>) => Errors;
export declare type TApiProviderMapParamsHook<Data, Params, Errors> = (originalParams: Params, branchState: StoreBranch<Data, Params, Errors>, fullState: IFullState<StoreBranch<Data, Params, Errors>>) => any;
export interface IAPIProviderHooks<Data, Params, Errors> {
    onStart?: TApiProviderMapParamsHook<Data, Params | undefined, Errors>;
    mapParams?: TApiProviderMapParamsHook<Data, Params | undefined, Errors>;
    preRequestDataMapper?: TApiProviderPreRequestHook<Data, Params | undefined, Errors>;
    onSuccess?: TApiProviderSuccessHook<Data, Params | undefined, Errors>;
    onFail?: TApiProviderFailHook<Data, Params | undefined, Errors>;
    mapSuccess?: TApiProviderSuccessMapper<Data, Params | undefined, Errors>;
    mapFail?: TApiProviderFailMapper<Data, Params | undefined, Errors>;
    clearParams?: boolean;
    throwOnFail?: true;
    hydrateTo?: INewable;
}
export declare class APIProvider<Data = any, Params = any, Errors = any> {
    readonly type: string;
    readonly handler: (payload: Params) => Promise<any>;
    readonly hooks: IAPIProviderHooks<Data, Params, Errors>;
    readonly effectHandler: typeof takeEvery;
    constructor(type: string, handler: (payload: Params) => Promise<any>, hooks?: IAPIProviderHooks<Data, Params, Errors>, effectHandler?: typeof takeEvery);
}
