import { ICommunication, IStrategy } from './types';
export declare function buildCommunication<InjectedProps>(strategy: IStrategy<InjectedProps>): ICommunication<InjectedProps>;
