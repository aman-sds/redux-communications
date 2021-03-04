import { ISimpleStrategyConfig } from '../types';
import { BaseStrategy } from './base';
export declare class SimpleStrategy<InjectedProps, Data, Params, Errors> extends BaseStrategy<InjectedProps> {
    constructor(config: ISimpleStrategyConfig);
}
