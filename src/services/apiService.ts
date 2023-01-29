import { getToken, verifyToken } from "../auth/tokenMenagment";

const serverUrl = 'http://localhost:3000/';

const handleRequest = (
    url: string,
    method: string,
    headers?: HeadersInit,
    data?: object,
    checkToken = true): Promise<Response> | null => {

    if (checkToken && !verifyToken()) {
        return null;
    }

    const config = {
        method,
        headers: {
            ...headers,
            'x-auth-token' : getToken()
        },
        body: (data) ? JSON.stringify(data) : null
    }

    return fetch(url, config);
}

export const getRequest = (endpoint: string, checkToken = true): Promise<Response> | null => {
    return handleRequest(
        `${serverUrl}${endpoint}`,
        'GET',
        undefined, // Skip parameter
        undefined, // Skip parameter
        checkToken
    );
}

export const postRequest = (
    endpoint: string, 
    data: object,
    checkToken?: boolean): Promise<Response> | null => {
    return handleRequest(
        `${serverUrl}${endpoint}`,
        'POST',
        {'Content-Type': 'application/json'},
        data,
        checkToken
    ); 
}

export const patchRequest = (
    endpoint: string, 
    data: object): Promise<Response> | null => {
    return handleRequest(
        `${serverUrl}${endpoint}`,
        'PATCH',
        {'Content-Type': 'application/json'},
        data
    ); 
}

export const deleteRequest = (
    endpoint: string): Promise<Response> | null => {
    return handleRequest(
        `${serverUrl}${endpoint}`,
        'DELETE'
    ); 
}


