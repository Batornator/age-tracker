
class HTTP {
    static _baseUrl = "http://localhost:1337/";

    static _setHeaders = (req, headers) => {
        req.setRequestHeader("Content-Type", "application/json");

        if (!headers) {
            return;
        }

        if (!Array.isArray(headers)) {
            headers = [headers];
        }

        headers.forEach(header => {
            req.setRequestHeader(header.header, header.value);
        });
    };

    static _formatBody = (body) => {
        if (body && typeof body !== "string") {
            return JSON.stringify(body);
        }

        return body;
    };

    static _handleResponse = (req, resolve, reject) => {
        let responseBody;
        if (req.readyState === XMLHttpRequest.DONE) {
            if (req.status === 204) {
                // no content so just return good response
                return resolve();
            }

            try {
                responseBody = JSON.parse(req.responseText);
            } catch (err) {
                // invalid JSON response
                return reject("Bad response");
            }

            if (req.status === 200) {
                if (responseBody.error) {
                    // handle error response - this probably shouldnt happen as status code should handle this
                    return reject(responseBody.error);
                }

                return resolve(responseBody);
            }

            return reject(responseBody.error || "Unexpected error occurred");
        }
    };

    static _makeRequest = (method, url, {headers, body} = {headers: null, body: null}) => {
        return new Promise((resolve, reject) => {
            if (!url) {
                console.warn(`No URL specified to delete call. Will make HTTP ${method} request to ${this._baseUrl}`);
            }

            const req = new XMLHttpRequest();

            req.open(method, `${this._baseUrl}${url}`);

            this._setHeaders(req, headers);
            
            req.onreadystatechange = () => { 
                return this._handleResponse(req, resolve, reject);
            };

            req.send(this._formatBody(body));
        });
    };

    static get = (url, headers = null) => {
        return this._makeRequest("GET", url, headers);
    };

    static put = (url, { headers, body } = {headers: null, body: null}) => {
        return this._makeRequest("PUT", url, {headers, body});
    };

    static post = (url, { headers, body } = {headers: null, body: null}) => {
        return this._makeRequest("POST", url, {headers, body});
    };

    /*
        Expect headers to be an array of key value pairs.
    */
    static delete = (url, { headers, body } = {headers: null, body: null}) => {
        return this._makeRequest("DELETE", url, {headers, body});
    };
}

export default HTTP;