declare global {
    interface Window {
        mapScriptInitCallback: () => any;
    }
}
export default class MapApiLoader {
    private config;
    private scriptLoadingPromise;
    constructor(config: MapConfig);
    loader(): Promise<void>;
}
