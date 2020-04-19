import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    id: null,
    name: null,
    success: false,
    error: false,
    loading: false,
    likedPosts: []
}

const authReducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true,
                error: false,
                success: false,
            } 
        case actionTypes.AUTH_FAIL:
            return {
                 ...state,
                loading: false,
                error: action.error,
				success: false,
            } 
        case actionTypes.AUTH_SIGNIN_SUCCESS:

            return {
                ...state,
                token: action.token,
                id: action.id,
                name: action.name,
                success: true,
                loading: false,
                error: false,
                likedPosts: [...action.likedPosts]
            }
        case actionTypes.AUTH_SIGNOUT:
            return{
                ...state,
                token: null,
                id: null,
                name: null,
                error: false,
                success: false,
                loading: false
            }
        case actionTypes.LIKE_POST:
            return {
                ...state,
                likedPosts: [...state.likedPosts, action.postId]
            }
        default: return state;
    }
}

export default authReducer