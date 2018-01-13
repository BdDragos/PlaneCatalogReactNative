import { httpApiUrl } from '../core/api';
import { getLogger } from "../core/utils";


export const getService = (token, currentPage) => {

    const pagesize = 10
    const url = `${httpApiUrl}/api/plane/allPagined?pageNumber=${currentPage}&_pageSize=${pageSize}&pageSize=${pageSize}`

    return fetch(urlConc, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + token,
        }
    })
        .then(function (response) {
            return response;
        });
};

export const getAllService = (token) => {

    return fetch(`${httpApiUrl}/api/plane/all`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + token,
        }
    })
        .then(function (response) {
            return response;
        });
};

export const insertService = (data, token) => {

    console.log(data)
    return fetch(`${httpApiUrl}/api/plane/AddPlaneReact`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + token,
        },
        body: JSON.stringify(data)
    })
        .then(function (response) {
            return response;
        });
};

export const deleteService = (data, token) => {

    return fetch(`${httpApiUrl}/api/plane/DeletePlaneReact`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + token,
        },
        body: JSON.stringify(data)
    })
        .then(function (response) {
            return response;
        });
};

export const updateService = (data, token) => {

    return fetch(`${httpApiUrl}/api/plane/UpdatePlaneReact`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + token,
        },
        body: JSON.stringify(data)
    })
        .then(function (response) {
            return response;
        });
};