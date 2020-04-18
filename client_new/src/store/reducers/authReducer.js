import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    id: null,
    name: null,
    successSignup: false,
	successSignin: false,
    error: false,
    loading: false,
}

const authReducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true,
                error: false,
                successSignup: false,
				successSignin: false,
            } 
        case actionTypes.AUTH_SIGNUP_SUCCESS:
            return {
                    ...state,
                    loading: false,
                    error: false,
					successSignup: true,
					successSignin: false,
                } 
        case actionTypes.AUTH_FAIL:
            return {
                 ...state,
                loading: false,
                error: action.error,
				successSignup: false,
				successSignin: false,
            } 
        case actionTypes.AUTH_SIGNIN_SUCCESS:
            return {
                ...state,
                token: action.token,
                id: action.id,
                name: action.name,
                successSignup: false,
				successSignin: true,
                loading: false,
                error: false
            }
        case actionTypes.AUTH_SIGNOUT:
            return{
                ...state,
                token: null,
                id: null,
                name: null,
                error: false,
                successSignup: false,
				successSignin: false,
                loading: false
            }
        default: return state;
    }
}

export default authReducer