/**
 * If the API you are using has a standard response type,
 * alter this class to match that standard. Otherwise,
 * remove this class and refrences to it in the API class
 * below.
 */
class APIResponse
{
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

class API
{
    constructor(apiBaseUrl)
    {
        this.apiBaseUrl = apiBaseUrl
    }

    //#region General Request Methods

    /**
     * 
     * @param {string} endpoint
     * The string value of the endpoint without
     * the leading slash. This will be appended
     * to the base Funtility API URL.
     * @param {[[string,string]]} params 
     * A two dimensional array of key value pairs: 
     * E.G. [ [ "id" , 10 ] ]
     * @returns 
     * See the Funtility API documentation for
     * the return type of the endpoint.
     * http://api.funtility.com/index.html
     */
    async GET(endpoint,params = [])
    {
        let init = this.getInit("GET")
        endpoint = `${endpoint}${this.getQueryParamString(params)}`
        const data = await this.request(endpoint, init)
        return new APIResponse(data)
    }
    
    /**
     * 
     * @param {string} endpoint
     * The string value of the endpoint without
     * the leading slash. This will be appended
     * to the base Funtility API URL.
     * @param {[[string,string]]} params 
     * A two dimensional array of key value pairs: 
     * E.G. [ [ "id" , 10 ] ]
     * @returns 
     * See the Funtility API documentation for
     * the return type of the endpoint.
     * http://api.funtility.com/index.html
     */
    async PUT(endpoint,body,params = [])
    {
        let init = this.getInit("PUT",body)
        endpoint = `${endpoint}${this.getQueryParamString(params)}`
        const data = await this.request(endpoint, init)
        return new APIResponse(data)
    }
    
    /**
     * 
     * @param {string} endpoint
     * The string value of the endpoint without
     * the leading slash. This will be appended
     * to the base Funtility API URL.
     * @param {[[string,string]]} params 
     * A two dimensional array of key value pairs: 
     * E.G. [ [ "id" , 10 ] ]
     * @returns 
     * See the Funtility API documentation for
     * the return type of the endpoint.
     * http://api.funtility.com/index.html
     */
    async POST(endpoint,body)
    {
        let init = this.getInit("POST",body)
        const data = await this.request(endpoint, init)
        return new APIResponse(data)
    }
    
    /**
     * 
     * @param {string} endpoint
     * The string value of the endpoint without
     * the leading slash. This will be appended
     * to the base Funtility API URL.
     * @param {[[string,string]]} params 
     * A two dimensional array of key value pairs: 
     * E.G. [ [ "id" , 10 ] ]
     * @returns 
     * See the Funtility API documentation for
     * the return type of the endpoint.
     * http://api.funtility.com/index.html
     */
    async DELETE(endpoint,params = [])
    {
        let init = this.getInit("DELETE")
        endpoint = `${endpoint}${this.getQueryParamString(params)}`
        const data = await this.request(endpoint, init)
        return new APIResponse(data)
    }

    //#endregion

    //#region Request Helper Methods

    getInit(method, body = {})
    {
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
    
    getHeaders()
    {
        let headers = new Headers()
        headers.append('Content-Type', 'application/json;charset=UTF-8')
        return headers
    }

    getQueryParamString(params = [])
    {
        let result = params.length > 0 ? "?" : ""
        params.forEach(keyVal => {
            let amp = result === "?" ? "" : "&"
            result = `${result}${amp}${keyVal[0]}=${keyVal[1]}`
        })
        return result
    }

    async request(endpoint,init)
    {
        const res = await fetch(`${this.apiBaseUrl}${endpoint}`, init)
        return await res.json()
    }

    //#endregion
}
