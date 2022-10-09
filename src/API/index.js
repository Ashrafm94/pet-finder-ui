export const HTTP_METHOD = {
    GET: 'GET',
    POST: 'POST',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
    PUT: 'PUT'
};

export const HttpRequest = async (url, params = null, type = HTTP_METHOD.GET, token = null) => {
    let res = await fetch(url, GetRequestBody(type, params, token));

    if (res && res.status >= 200 && res.status <= 299) {
        return await res.json();
    } else {
        return null;
    }
}

const GetRequestBody = (type, body, token) => {
    let req = GetRequestHeaders(type, token);

    if (body) {
        req['body'] = JSON.stringify(body);
    }

    return req;
};

const GetRequestHeaders = (type, token) => {
    let authorization = {};

    if (token) {
        authorization = {
            'Authorization': 'Bearer ' + token
        };
    }

    return {
        method: type,
        headers: {
            'Content-Type': 'application/json',
            ...authorization
        }
    }
}
