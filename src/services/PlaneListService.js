import { httpApiUrl } from '../core/api';
import { getLogger } from "../core/utils";


function createStringFromTemplate(template, variables) {
    return template.replace(new RegExp("\{([^\{]+)\}", "g"), function (_unused, varName) {
        return variables[varName];
    });
}

export const getService = (token, currentPage) => {

    const url = 'desktop-28cnhan:8090/InventoryManagement/api/plane/allPagined?pageNumber={pageNumber}&_pageSize={_pageSize}&pageSize={pageSize}'

    var urlConc = createStringFromTemplate(
        url,
        {
            pageNumber: currentPage,
            _pageSize: 10,
            pageSize: 10,
        }
    )

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