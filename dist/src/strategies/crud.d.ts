import { IBuilderCrudConfig } from '../types';
import { BaseStrategy } from './base';
import { IBaseCollection, IBaseFilterModel } from '@axmit/client-models';
export declare class CRUDStrategy<InjectedProps, IModel = any, ICollection extends IBaseCollection<IModel, any> = IBaseCollection<IModel, any>, ICollectionFilters extends IBaseFilterModel = IBaseFilterModel> extends BaseStrategy<InjectedProps> {
    constructor(config: IBuilderCrudConfig);
}
