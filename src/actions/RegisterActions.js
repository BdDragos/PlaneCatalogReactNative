import { registerService } from '../services/RegisterService'
import { Alert } from 'react-native';

export function registerAction(data) {
    return dispatch => Promise.all([
        dispatch(registerStarted()),
        registerService(data).then(response => {
            console.log(response);
            if (!response.ok) {
                Alert.alert('ERROR', 'User already exists');
                dispatch(loginFailed('User already exists'));
            } else {
                Alert.alert('OK', 'Registering is a success');
                return response.json().then(data => {
                    console.log(data);
                    dispatch(registerSuccess(data));
                });
            }
        })
    ]);
}

export const addNewUser = obj => {
    return {
        type: 'ADD_NEW_USER',
        obj
    }
}

export const updateUsernameState = obj => {
    return {
        type: 'UPDATE_USERNAME',
        obj
    }
}
export const updatePasswordState = obj => {
    return {
        type: 'UPDATE_PASSWORD',
        obj
    }
}
export const updatePasswordRepeatState = obj => {
    return {
        type: 'UPDATE_REPEAT_PASSWORD',
        obj
    }
}

export const registerStarted = () => {
    return {
        type: 'REGISTER_STARTED',
    }
}

export const registerSuccess = data => {
    return {
        type: 'REGISTER_SUCCESS',
        data
    }
}

export const registerFailed = data => {
    return {
        type: 'REGISTER_FAILED',
        data
    }
}