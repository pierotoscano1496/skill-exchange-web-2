export default class HttpResponse {
    private _responseBody: any;
    private _statusCode: number;

    constructor(responseBody: any, statusCode: number) {
        this._responseBody = responseBody;
        this._statusCode = statusCode;
    }

    /**
     * Getter responseBody
     * @return {any}
     */
    public get responseBody(): any {
        return this._responseBody;
    }

    /**
     * Getter statusCode
     * @return {number}
     */
    public get statusCode(): number {
        return this._statusCode;
    }

}