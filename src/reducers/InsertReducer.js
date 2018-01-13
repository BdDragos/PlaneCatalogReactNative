export const insertReducer = (state = {
    ok: null, error: null, isLoading: false, planeName: '',
    planeProducer: '', planeCountry: '', planeYear: '', planeEngine: '', wikiLink: ''
}, action) => {
    switch (action.type) {
        case 'INSERT_STARTED':
            return { ...state, isLoading: true };
        case 'INSERT_SUCCESS':
            return { ...state, error: null, ok: action.data, isLoading: false, planeName: '', planeProducer: '', planeCountry: '', planeYear: '', planeEngine: '', wikiLink: '' };
        case 'INSERT_FAILED':
            return { ...state, error: action.data, isLoading: false };
        case 'UPDATE_NAME':
            return { ...state, planeName: action.obj }
        case 'UPDATE_PROD':
            return { ...state, planeProducer: action.obj }
        case 'UPDATE_COUNTRY':
            return { ...state, planeCountry: action.obj }
        case 'UPDATE_YEAR':
            return { ...state, planeYear: action.obj }
        case 'UPDATE_ENGINE':
            return { ...state, planeEngine: action.obj }
        case 'UPDATE_LINK':
            return { ...state, wikiLink: action.obj }
        default:
            return state;
    }
};

export default insertReducer