import { APIProvider, IAPIProviderHooks, TApiProviderFailHook, TApiProviderFailMapper, TApiProviderMapParamsHook, TApiProviderPreRequestHook, TApiProviderSuccessHook, TApiProviderSuccessMapper } from '../models/APIProvider';
import { INewable } from '../types';
declare type TOmitedCallOrder<T, P extends keyof T> = THooksAPIProviderBuilder<Omit<T, P>>;
declare type THooksAPIProviderBuilder<T> = {
    [P in keyof Omit<T, 'setType' | 'setHandler' | 'type' | 'handler' | 'hooks'>]: T[P] extends (...args: any) => T ? P extends 'clearBranchParams' ? () => TOmitedCallOrder<T, P> : P extends 'mapParams' ? (mapper: TApiProviderMapParamsHook<any, any, any>) => TOmitedCallOrder<T, P> : P extends 'preRequestDataMapper' ? (mapper: TApiProviderPreRequestHook<any, any, any>) => TOmitedCallOrder<T, P> : P extends 'onSuccess' ? (mapper: TApiProviderSuccessHook<any, any, any>) => TOmitedCallOrder<T, P> : P extends 'onFail' ? (mapper: TApiProviderFailHook<any, any, any>) => TOmitedCallOrder<T, P> : P extends 'mapSuccess' ? (mapper: TApiProviderSuccessMapper<any, any, any>) => TOmitedCallOrder<T, P> : P extends 'mapFail' ? (mapper: TApiProviderFailMapper<any, any, any>) => TOmitedCallOrder<T, P> : P extends 'clearBranchParams' ? () => TOmitedCallOrder<T, P> : P extends 'throwOnFail' ? () => TOmitedCallOrder<T, P> : P extends 'hydrateTo' ? (ModelCtor: INewable) => TOmitedCallOrder<T, P> : T[P] : T[P];
};
export declare type TAPIProviderBuilderInitial = Pick<APIProviderBuilder, 'setType'>;
export declare class APIProviderBuilder<Response extends any = any, Payload extends any = any, Errors extends any = any> {
    private type;
    private handler;
    private hooks;
    private constructor();
    static create<Response extends any = any, Payload extends any = any, Errors extends any = any>(hooks?: IAPIProviderHooks<Response, Payload, Errors>): TAPIProviderBuilderInitial;
    setType(type: string): Pick<APIProviderBuilder, 'setHandler' | 'setDefaultHandler'>;
    setHandler(handler: (payload: Payload) => Promise<Response>): THooksAPIProviderBuilder<APIProviderBuilder<Response, Payload>>;
    setDefaultHandler(): THooksAPIProviderBuilder<APIProviderBuilder<Response, Payload>>;
    beforeRequest(hook: TApiProviderMapParamsHook<Response, Payload | undefined, Errors>): this;
    formatResponse(hook: TApiProviderSuccessMapper<Response, Payload | undefined, Errors>): this;
    formatFail(hook: TApiProviderFailMapper<Response, Payload | undefined, Errors>): this;
    afterSuccess(hook: TApiProviderSuccessHook<Response, Payload | undefined, Errors>): this;
    afterFail(hook: TApiProviderFailHook<Response, Payload | undefined, Errors>): this;
    setPreRequestDataMapper(mapper: TApiProviderPreRequestHook<Response, Payload | undefined, Errors>): this;
    clearBranchParams(): this;
    throwOnFail(): this;
    mapParams(mapper: TApiProviderMapParamsHook<Response, Payload | undefined, Errors>): this;
    hydrateTo(ModelCtor: INewable): this;
    build(): APIProvider<Response, Payload>;
}
export {};
