import { APIProvider } from '../models/APIProvider';
export declare class CommunicationBuilder {
    private branches;
    private namespace;
    private sagas;
    setNamespace(namespace: string): this;
    addBranch(name: string, apiProviders: APIProvider | APIProvider[], initialState?: any): this;
    addSaga(saga: Generator): this;
    build<T>(): import("../types").ICommunication<T>;
}
