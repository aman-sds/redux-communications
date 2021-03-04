import { APIProvider, TApiProviderFailHook, TApiProviderFailMapper, TApiProviderMapParamsHook, TApiProviderPreRequestHook, TApiProviderSuccessHook, TApiProviderSuccessMapper } from '../models/APIProvider';
import { TAPIProviderBuilderInitial } from './APIProviderBuilder';
import { INewable } from '../types';
declare type TBuilderCallback = (builder: TAPIProviderBuilderInitial) => APIProvider;
declare type TOmitedCallOrder<T, P extends keyof T> = CallOrder<Omit<T, P>>;
declare type CallOrder<T> = {
    [P in keyof T]: T[P] extends (...args: any) => T ? P extends 'add' ? (builderCallback: TBuilderCallback) => CallOrder<T> : P extends 'onStart' ? (hook: TApiProviderMapParamsHook<any, any, any>) => TOmitedCallOrder<T, P> : P extends 'mapParams' ? (mapper: TApiProviderMapParamsHook<any, any, any>) => TOmitedCallOrder<T, P> : P extends 'preRequestDataMapper' ? (mapper: TApiProviderPreRequestHook<any, any, any>) => TOmitedCallOrder<T, P> : P extends 'onSuccess' ? (mapper: TApiProviderSuccessHook<any, any, any>) => TOmitedCallOrder<T, P> : P extends 'onFail' ? (mapper: TApiProviderFailHook<any, any, any>) => TOmitedCallOrder<T, P> : P extends 'mapSuccess' ? (mapper: TApiProviderSuccessMapper<any, any, any>) => TOmitedCallOrder<T, P> : P extends 'mapFail' ? (mapper: TApiProviderFailMapper<any, any, any>) => TOmitedCallOrder<T, P> : P extends 'clearBranchParams' ? () => TOmitedCallOrder<T, P> : P extends 'throwOnFail' ? () => TOmitedCallOrder<T, P> : P extends 'hydrateTo' ? (ModelCtor: INewable) => TOmitedCallOrder<T, P> : T[P] : T[P];
};
export declare class APIProviderGroup {
    private builders;
    private hooks;
    private constructor();
    static create(): CallOrder<APIProviderGroup>;
    beforeRequest(hook: TApiProviderMapParamsHook<any, any, any>): this;
    formatResponse(hook: TApiProviderSuccessMapper<any, any, any>): this;
    afterSuccess(hook: TApiProviderSuccessHook<any, any, any>): this;
    afterFail(hook: TApiProviderFailHook<any, any, any>): this;
    setPreRequestDataMapper(mapper: TApiProviderPreRequestHook<any, any, any>): this;
    clearBranchParams(): this;
    mapParams(mapper: TApiProviderMapParamsHook<any, any, any>): this;
    hydrateTo(ModelCtor: INewable): this;
    add(builderCallback: TBuilderCallback): this;
    build(): APIProvider[];
}
export {};
