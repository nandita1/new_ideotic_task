import * as actionTypes from '../actions/actionTypes';

const initialState = {
    posts: []
}

const postsReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_POSTS:
            return {
                ...state,
                posts: action.posts
            }
         default: return state;
    }
}

export default postsReducer