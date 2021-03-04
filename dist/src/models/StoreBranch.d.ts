export declare class StoreBranch<Data, Params = null, Error extends any = null> {
    data: Data | null;
    params: Params | null;
    errors: Error | null;
    loading: boolean;
    constructor(data?: Data | null, params?: Params | null, errors?: Error | null, loading?: boolean);
}
