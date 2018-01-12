import { httpApiUrl } from '../core/api';
import { getLogger } from "../core/utils";

export const registerService = (user) => {

    return fetch(`${httpApiUrl}/api/userdata/ReactAddUser`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    })
        .then(function (response) {
            return response;
        });
};