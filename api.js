/**
 * If the API you are using has a standard response type,
 * alter this class to match that standard. Otherwise,
 * remove this class and refrences to it in the API class
 * below.
 */
class APIResponse {
    constructor(data = {})
    {
        this.errors = data.hasOwnProperty('errors') ? data.errors : []
        this.result = data.hasOwnProperty('result') ? data.result : {}
    }

    get hasErrors()
    {
        return this.errors.length > 0
    }
}

/**
 * A basic implementation of the four most commonly used
 * http verbs: GET, PUT, POST, and DELETE.
 * 
 * https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 */
class API {
    constructor(apiBaseUrl)
    {
        this.apiBaseUrl = apiBaseUrl
    }

    //#region General Request Methods

    /**
     * A wrapper around the fetch api using the GET verb.
     * 
     * https://developer.mozilla.org/en-US/docs/Web/API/Request/method
     * @param {string} endpoint
     * The string value of the endpoint without
     * the leading slash. This will be appended
     * to the API's base URL.
     * @param {[[string,string]]} params 
     * A two dimensional array of key value pairs: 
     * E.G. [ [ "id" , 10 ] ]
     * @returns 
     * See your API's documentation for
     * the return type of the endpoint.
     */
    async GET(endpoint,params = []) {
        let init = this.getInit("GET")
        endpoint = `${endpoint}${this.getQueryParamString(params)}`
        const data = await this.request(endpoint, init)
        return new APIResponse(data)
    }
    
    /**
     * A wrapper around the fetch api using the PUT verb.
     * 
     * https://developer.mozilla.org/en-US/docs/Web/API/Request/method
     * @param {string} endpoint
     * The string value of the endpoint without
     * the leading slash. This will be appended
     * to the API's base URL.
     * @param {[[string,string]]} params 
     * A two dimensional array of key value pairs: 
     * E.G. [ [ "id" , 10 ] ]
     * @returns 
     * See your API's documentation for
     * the return type of the endpoint.
     */
    async PUT(endpoint,body,params = []) {
        let init = this.getInit("PUT",body)
        endpoint = `${endpoint}${this.getQueryParamString(params)}`
        const data = await this.request(endpoint, init)
        return new APIResponse(data)
    }
    
    /**
     * A wrapper around the fetch api using the POST verb.
     * 
     * https://developer.mozilla.org/en-US/docs/Web/API/Request/method
     * @param {string} endpoint
     * The string value of the endpoint without
     * the leading slash. This will be appended
     * to the API's base URL.
     * @param {[[string,string]]} params 
     * A two dimensional array of key value pairs: 
     * E.G. [ [ "id" , 10 ] ]
     * @returns 
     * See your API's documentation for
     * the return type of the endpoint.
     */
    async POST(endpoint,body) {
        let init = this.getInit("POST",body)
        const data = await this.request(endpoint, init)
        return new APIResponse(data)
    }
    
    /**
     * A wrapper around the fetch api using the DELETE verb.
     * 
     * https://developer.mozilla.org/en-US/docs/Web/API/Request/method
     * @param {string} endpoint
     * The string value of the endpoint without
     * the leading slash. This will be appended
     * to the API's base URL.
     * @param {[[string,string]]} params 
     * A two dimensional array of key value pairs: 
     * E.G. [ [ "id" , 10 ] ]
     * @returns 
     * See your API's documentation for
     * the return type of the endpoint.
     */
    async DELETE(endpoint,params = []) {
        let init = this.getInit("DELETE")
        endpoint = `${endpoint}${this.getQueryParamString(params)}`
        const data = await this.request(endpoint, init)
        return new APIResponse(data)
    }

    //#endregion

    //#region Request Builder Methods

    /**
     * Constructs the options object for the Fetch API.
     * @param {HTTP Method} method GET | PUT | POST | DELETE
     * @param {*} body 
     * @returns The return type of your API's endpoint
     * being called.
     */
    getInit(method, body = {}) {
        if (method == "GET" || method == "DELETE") {
            return {
                method: method,
                headers: this.getHeaders(),
                mode: 'cors'
            }
        } else {
            return {
                method: method,
                body: JSON.stringify(body),
                headers: this.getHeaders(),
                mode: 'cors'
            }
        }
    }
    
    /**
     * Builds the Header object for the api call. Modify this with
     * any custom headers required for your api.
     * 
     * https://developer.mozilla.org/en-US/docs/Web/API/Request/headers
     * @returns A new Header object.
     */
    getHeaders() {
        let headers = new Headers()
        headers.append('Content-Type', 'application/json;charset=UTF-8')
        return headers
    }

    /**
     * Constructs the query parameter part of a web request.
     * @param {[[key,value]]} params A two dimentional array of key value pairs
     * @returns A formatted query parameter string.
     */
    getQueryParamString(params = []) {
        let result = params.length > 0 ? "?" : ""
        params.forEach(keyVal => {
            let amp = result === "?" ? "" : "&"
            result = `${result}${amp}${keyVal[0]}=${keyVal[1]}`
        })
        return result
    }

    /**
     * A wrapper around the Fetch API.
     * 
     * https://developer.mozilla.org/en-US/docs/Web/API/fetch
     * @param {string} endpoint The endpoint part of the web url to send the
     * request to including any query parameters.
     * @param {*} init The options for the request. These are built by the
     * getInit method.
     * @returns 
     */
    async request(endpoint,init) {
        const res = await fetch(`${this.apiBaseUrl}${endpoint}`, init)
        return await res.json()
    }

    //#endregion
}
