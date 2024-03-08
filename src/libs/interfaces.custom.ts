export interface CsrfData {
    parameterName: string | "_csrf";
    token: string;
    headerName: string | "X-XSRF-TOKEN";
}