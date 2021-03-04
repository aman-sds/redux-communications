import { IBuilderConfig, IReducers, IStrategy } from '../types';
export declare class BaseStrategy<InjectedProps> implements IStrategy<InjectedProps> {
    readonly config: IBuilderConfig;
    constructor(config: IBuilderConfig);
    buildActions(): {};
    buildReducers(): IReducers;
    buildInjector(): import("react-redux").InferableComponentEnhancerWithProps<{}, {}>;
    buildSagas(): any[];
}
