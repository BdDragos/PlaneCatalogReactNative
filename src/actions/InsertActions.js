import { insertService } from '../services/PlaneListService'
import { Alert } from 'react-native';

export function insertAction(data, token) {
    return dispatch => Promise.all([
        dispatch(insertStarted()),
        insertService(data, token).then(response => {
            if (!response.ok) {
                Alert.alert('ERROR', 'The item already exists');
                dispatch(insertFailed('Error'));
            } else {
                Alert.alert('Success', 'A new plane was inserted')
                return response.json().then(data => {
                    dispatch(insertSuccess(data));
                });
            }
        })
    ]);
}

export const addNewPlane = obj => {
    return {
        type: 'ADD_NEW_USER',
        obj
    }
}

export const updateName = obj => {
    return {
        type: 'UPDATE_NAME',
        obj
    }
}
export const updateProd = obj => {
    return {
        type: 'UPDATE_PROD',
        obj
    }
}

export const updateCountry = obj => {
    return {
        type: 'UPDATE_COUNTRY',
        obj
    }
}
export const updateYear = obj => {
    return {
        type: 'UPDATE_YEAR',
        obj
    }
}

export const updateEngine = obj => {
    return {
        type: 'UPDATE_ENGINE',
        obj
    }
}
export const updateLink = obj => {
    return {
        type: 'UPDATE_LINK',
        obj
    }
}

export const insertStarted = () => {
    return {
        type: 'INSERT_STARTED',
    }
}

export const insertSuccess = data => {
    return {
        type: 'INSERT_SUCCESS',
        data
    }
}

export const insertFailed = data => {
    return {
        type: 'INSERT_FAILED',
        data
    }
}