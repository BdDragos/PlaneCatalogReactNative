export const planeReducer = (state = { error: null, isLoading: false, token: null, thelist: null, currentPage: 1, viewableItems: null }, action) => {
    switch (action.type) {
        case 'GET_SUCCESS':
            return { ...state, isLoading: false, thelist: thelist.concat(action.obj) }
        case 'GET_ALL_SUCCESS':
            return { ...state, isLoading: false, thelist: action.obj }
        case 'GET_FAIL':
            return { ...state, isLoading: false, error: action.obj }
        case 'INSERT_SUCCESS':
            return state;
        case 'DELETE_SUCCESS':
            return state;
        case 'UPDATE_SUCCESS':
            return state;
        case 'GET_START':
            return { ...state, isLoading: true }
        case 'NEW_VIEWABLE':
            return { ...state, viewableItems: action.obj }
        case 'CHANGE_PAGE':
            return { ...state, currentPage: currentPage + 1 }
        default:
            return state;
    }
};

export default planeReducer