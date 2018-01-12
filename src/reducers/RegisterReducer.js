export const registerReducer = (state = { ok: null, error: null, isLoading: false, username: '', password: '', repeatPassword: '' }, action) => {
    switch (action.type) {
        case 'REGISTER_STARTED':
            return { ...state, isLoading: true };
        case 'REGISTER_SUCCESS':
            return { ...state, error: null, ok: action.data, isLoading: false, username: '', password: '', repeatPassword: '' };
        case 'REGISTER_FAILED':
            return { ...state, error: action.data, isLoading: false };
        case 'UPDATE_USERNAME':
            return { ...state, username: action.obj }
        case 'UPDATE_PASSWORD':
            return { ...state, password: action.obj }
        case 'UPDATE_REPEAT_PASSWORD':
            return { ...state, repeatPassword: action.obj }
        default:
            return state;
    }
};

export default registerReducer