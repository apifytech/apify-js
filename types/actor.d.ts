export function getEnv(): any;
export function main(userFunc: Function): void;
export function call(actId: string, input?: any, options?: {
    contentType?: string;
    token?: string;
    memoryMbytes?: number;
    timeoutSecs?: number;
    build?: string;
    waitSecs?: string;
    fetchOutput?: boolean;
    disableBodyParser?: boolean;
    webhooks?: any[];
}): Promise<ActorRun>;
export function callTask(taskId: string, input?: any, options?: {
    contentType?: string;
    token?: string;
    memoryMbytes?: number;
    timeoutSecs?: number;
    build?: string;
    waitSecs?: string;
    webhooks?: any[];
}): Promise<ActorRun>;
export function metamorph(targetActorId: string, input?: any, options?: {
    contentType?: string;
    build?: string;
}): Promise<any>;
export function getApifyProxyUrl(options?: {
    password?: string;
    groups?: string[];
    session?: string;
    country?: string;
}): string;
export function addWebhook({ eventTypes, requestUrl, payloadTemplate, idempotencyKey }: {
    eventTypes: string[];
    requestUrl: string;
    payloadTemplate?: string;
    idempotencyKey?: string;
}): Promise<any>;
/**
 * Represents information about an actor run, as returned by the
 * [`Apify.call()`](../api/apify#module_Apify.call) or [`Apify.callTask()`](../api/apify#module_Apify.callTask) function.
 * The object is almost equivalent to the JSON response
 * of the
 * <a href="https://apify.com/docs/api/v2#/reference/actors/run-collection/run-actor" target="_blank">Actor run</a>
 * Apify API endpoint and extended with certain fields.
 * For more details, see
 * <a href="https://docs.apify.com/actor/run" target="_blank">Runs.</a>
 */
export type ActorRun = {
    /**
     * Actor run ID
     */
    id: string;
    /**
     * Actor ID
     */
    actId: string;
    /**
     * Time when the actor run started
     */
    startedAt: Date;
    /**
     * Time when the actor run finished. Contains `null` for running actors.
     */
    finishedAt: Date;
    /**
     * Status of the run. For possible values, see
     * <a href="https://docs.apify.com/actor/run#lifecycle" target="_blank">Run lifecycle</a>
     * in Apify actor documentation.
     */
    status: string;
    /**
     * Actor run meta-data. For example:
     * ```
     * {
     * "origin": "API",
     * "clientIp": "1.2.3.4",
     * "userAgent": "ApifyClient/0.2.13 (Linux; Node/v8.11.3)"
     * }
     * ```
     */
    meta: any;
    /**
     * An object containing various actor run statistics. For example:
     * ```
     * {
     * "inputBodyLen": 22,
     * "restartCount": 0,
     * "workersUsed": 1,
     * }
     * ```
     * Beware that object fields might change in future releases.
     */
    stats: any;
    /**
     * Actor run options. For example:
     * ```
     * {
     * "build": "latest",
     * "waitSecs": 0,
     * "memoryMbytes": 256,
     * "diskMbytes": 512
     * }
     * ```
     */
    options: any;
    /**
     * ID of the actor build used for the run. For details, see
     * <a href="https://docs.apify.com/actor/build" target="_blank">Builds</a>
     * in Apify actor documentation.
     */
    buildId: string;
    /**
     * Number of the actor build used for the run. For example, `0.0.10`.
     */
    buildNumber: string;
    /**
     * Exit code of the actor run process. It's `null` if actor is still running.
     */
    exitCode: number;
    /**
     * ID of the default key-value store associated with the actor run. See [`KeyValueStore`](../api/keyvaluestore) for details.
     */
    defaultKeyValueStoreId: string;
    /**
     * ID of the default dataset associated with the actor run. See [`Dataset`](../api/dataset) for details.
     */
    defaultDatasetId: string;
    /**
     * ID of the default request queue associated with the actor run. See [`RequestQueue`](../api/requestqueue) for details.
     */
    defaultRequestQueueId: string;
    /**
     * URL on which the web server running inside actor run's Docker container can be accessed.
     * For more details, see
     * <a href="https://docs.apify.com/actor/run#container-web-server" target="_blank">Container web server</a>
     * in Apify actor documentation.
     */
    containerUrl: string;
    /**
     * Contains output of the actor run. The value is `null` or `undefined` in case the actor is still running,
     * or if you pass `false` to the `fetchOutput` option of [`Apify.call()`](../api/apify#module_Apify.call).
     *
     * For example:
     * ```
     * {
     * "contentType": "application/json; charset=utf-8",
     * "body": {
     * "message": "Hello world!"
     * }
     * }
     * ```
     */
    output: any;
};
