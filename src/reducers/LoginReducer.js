export const authReducer = (state = { error: null, isLoading: false, token: null }, action) => {
    switch (action.type) {
        case 'LOGIN_STARTED':
            return { ...state, isLoading: true };
        case 'LOGIN_SUCCESS':
            return { ...state, error: null, token: action.data, isLoading: false, username: '', password: '' };
        case 'LOGIN_FAILED':
            return { ...state, error: action.data, isLoading: false };
        case 'UPDATE_USERNAME':
            return { ...state, username: action.obj }
        case 'UPDATE_PASSWORD':
            return { ...state, password: action.obj }
        default:
            return state;
    }
};

export default authReducer