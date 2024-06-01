export default function wrapPromise<T>(promise: Promise<T>) {
    let status = "pending";
    let result: T | Error;

    const suspender = promise.then(res => {
        status = "success";
        result = res;
    }).catch(err => {
        status = "error";
        result = err;
    });

    return {
        read() {
            if (status === "pending") {
                throw suspender;
            } else if (status === "error") {
                throw result;
            } else if (status === "success") {
                return result;
            }
        }
    }
}