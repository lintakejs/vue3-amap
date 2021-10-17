export default class MapApiLoader {
    private config;
    private scriptLoadingPromise;
    private scriptLoadingPromiseResolve;
    private scriptDom;
    constructor(config: MapConfig);
    loader(): Promise<void>;
}
