import * as actionTypes from '../actions/commonActionTypes';

const initialState = {
    isLoading: false,
    error: null,
    successfulOperation: null
};

const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_LOADER:      
            return {
                ...state,
                isLoading: true,
                error: null,
                successfulOperation: null
            };
        case actionTypes.HIDE_LOADER:
            return {
                ...state,
                isLoading: false
            };
        case actionTypes.RAISE_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        case actionTypes.CLEAR_ERROR:
            return {
                ...state,
                isLoading: false,
                error: null
            };
        case actionTypes.OPERATION_SUCCEEDED: 
            return {
                ...state,
                successfulOperation: action.operation
            };
        default:
            return state;
    }
};

export default commonReducer;