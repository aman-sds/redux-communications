import { IBaseCollection, IBaseFilterModel } from '@axmit/client-models';
import { StoreBranch } from './models/StoreBranch';
export declare function buildCollectionResponseFormatter<TResponse extends IBaseCollection<any, any>, TPayload extends IBaseFilterModel>(): (response: TResponse, payload: TPayload, branchState: StoreBranch<TResponse, TPayload, null>) => {
    data: any[];
    meta: any;
};
export declare function buildCollectionPreRequestDataMapper<ICollection, TPayload>(): (response: null, payload: TPayload | undefined, branchState: StoreBranch<ICollection | null, TPayload | undefined, null>) => ICollection | null;
