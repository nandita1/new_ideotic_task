import * as actionTypes from './actionTypes'
import {API} from '../../config';

export const fetchPosts = (response) => {
    return {
        type: actionTypes.FETCH_POSTS,
        posts: response
    }
}

export const fetchPostsMain = () => {
    return dispatch => {
        return fetch(`${API}/posts`, {
            method: "GET",
          })
            .then((response) => {
                console.log(response)
              return response.json()
            })
            .then((response) => {
                dispatch(fetchPosts(response))
            })
            .catch((err) => {
              console.log(err)
            });
    }
}