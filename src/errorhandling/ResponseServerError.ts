export default class ResponseServerError extends Error {
    constructor(message: string, public code: number) {
        super(message);
        this.name = "ServerError";
    }
}