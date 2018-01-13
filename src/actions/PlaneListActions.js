import { insertService, deleteService, updateService, getService, getAllService } from '../services/PlaneListService'
import { Alert } from 'react-native';


export function getAllAction(token) {
    return dispatch => Promise.all([
        dispatch(getStarted()),
        getAllService(token).then(response => {
            if (!response.ok) {
                Alert.alert('ERROR', 'Server error');
                dispatch(getFailed('Error'));
            } else {
                return response.json().then(data => {
                    dispatch(getAllSuccess(data));
                });
            }
        })
    ]);
}

export function getAction(token, currentPage) {
    return dispatch => Promise.all([
        dispatch(getStarted()),
        getService(token, currentPage).then(response => {
            if (!response.ok) {
                Alert.alert('ERROR', 'Server error');
                dispatch(getFailed('Error'));
            } else {
                return response.json().then(data => {
                    dispatch(getSuccess(data));
                });
            }
        })
    ]);
}

export function updateAction(data, token) {
    return dispatch => Promise.all([
        dispatch(getStarted()),
        updateService(data, token).then(response => {
            if (!response.ok) {
                Alert.alert('ERROR', 'Could not be updated. Item already exists');
                dispatch(getFailed('Error'));
            } else {
                return response.json().then(data => {
                    dispatch(updateSuccess(data));
                });
            }
        })
    ]);
}

export function deleteAction(data, token) {
    return dispatch => Promise.all([
        dispatch(getStarted()),
        deleteService(data, token).then(response => {
            if (!response.ok) {
                Alert.alert('ERROR', 'Could not be deleted. Item does not exist');
                dispatch(getFailed('Error'));
            } else {
                return response.json().then(data => {
                    dispatch(deleteSuccess(data));
                });
            }
        })
    ]);
}

export const datasetstateSet = obj => {
    return {
        type: 'DATASETSTATE_SET',
        obj
    }
}

export const setDataset = obj => {
    return {
        type: 'DATASET_SET',
        obj
    }
}

export const getStarted = () => {
    return {
        type: 'GET_START'
    }
}

export const getAllSuccess = () => {
    return {
        type: 'GET_ALL_SUCCESS'
    }
}

export const getSuccess = obj => {
    return {
        type: 'GET_SUCCESS',
        obj
    }
}

export const fontFinishedLoad = () => {
    return {
        type: 'FONT_OVER'
    }
}

export const getFailed = obj => {
    return {
        type: 'GET_FAIL',
        obj
    }
}

export const deleteSuccess = () => {
    return {
        type: 'DELETE_SUCCESS'
    }
}





