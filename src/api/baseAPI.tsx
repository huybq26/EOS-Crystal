import Globals from "../globals";

export enum methodType {get = 'GET', post = 'POST', put = 'PUT', delete = 'DELETE'}

export default class BaseAPI {

    public static JSONRequest(api: string, method: methodType, headers: Record<string, string>, options: object, content: object) {
        const host = Globals().host;

        let requestOptions: any = {
            method: method,
            headers: {...headers, 'Content-Type': 'application/json'},
            ...options
        }

        if (method === methodType.post || method === methodType.put) {
            requestOptions.body = JSON.stringify(content)
        }

        // @ts-ignore
        return fetch(host + api, requestOptions)
            .then(response => response.json())
    }
}
