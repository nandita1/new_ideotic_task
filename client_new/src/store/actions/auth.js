import * as actionTypes from './actionTypes'
import {API} from '../../config';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSignupSuccess = () => {
    return {
        type: actionTypes.AUTH_SIGNUP_SUCCESS
    }
}

export const authSigninSuccess = (token, id, name) => {
  //console.log(response)
  return {
      type: actionTypes.AUTH_SIGNIN_SUCCESS,
      token: token,
      id: id,
      name: name
  }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_SIGNOUT
  }
}

export const authSignup = (name, email, password) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            name: name,
            email: email,
            password: password
        }
        fetch(`${API}/signup`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(authData),
          })
            .then((response) => {
              console.log(response);
              return response.json();
            })
            .then((response)=>{
                if(response.error)
                  dispatch(authFail(response.error))
                else{
                    //localStorage.setItem("token", response.token);
                    dispatch(authSignupSuccess())
                  
                }
                
            })
            .catch((err) => {
              console.log(err);
              dispatch(authFail(err))
            });
    }
}

export const authSignin = (email, password) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password
        }
        console.log(JSON.stringify(authData))
        fetch(`${API}/signin`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(authData),
          })
          .then((response) => {
            //console.log(response);
            return response.json();
          })
          .then((response)=>{
              console.log(response);

              //localStorage.setItem("token", JSON.stringify(response.token));
               if(response.error)
                  dispatch(authFail(response.error))
                else{
              dispatch(authSigninSuccess(response.token, response.user._id, response.user.name))
                }
          })
          .catch((err) => {
            console.log(err);
            dispatch(authFail(err))
          });
    }
}

export const authSignout = () => {
  return dispatch => {
    dispatch(authStart())
    if (typeof window !== "undefined") {
      return fetch(`${API}/signout`, {
        method: "GET",
      })
        .then((response) => {
          dispatch(authLogout())
          console.log("signout", response);
        })
        .catch((err) => {
          dispatch(authFail())
          console.log(err)
        });
    }
  }
}