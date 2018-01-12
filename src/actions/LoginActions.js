import { loginService } from '../services/LoginService'
import { Alert } from 'react-native';

export function loginAction(data) {
    return dispatch => Promise.all([
        dispatch(loginStarted()),
        loginService(data).then(response => {
            if (!response.ok) {
                Alert.alert('ERROR', 'User or password is incorrect');
                dispatch(loginFailed('User or password is incorrect'));
            } else {
                Alert.alert('OK', 'Login is a success');
                return response.json().then(data => {
                    dispatch(loginSuccess(data));
                });
            }
        })
    ]);
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

export const loginStarted = () => {
    return {
        type: 'LOGIN_STARTED',
    }
}

export const loginSuccess = data => {
    return {
        type: 'LOGIN_SUCCESS',
        data
    }
}

export const loginFailed = data => {
    return {
        type: 'LOGIN_FAILED',
        data
    }
}