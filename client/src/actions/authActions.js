import axios from 'axios';
import { returnErrors } from './errorActions';


import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  ADMIN_LOADED,
  ADMIN_LOADING,
  GET_BORROWER,
  ADD_ADDRESS,
  ADD_FAILED
} from './types';

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get('/api/auth/user', tokenConfig(getState)) //possible place to check for admin
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};



// Register User
export const register = ({ name, email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify({ name, email, password }); //js object to json object.

  axios
    .post('/api/users', body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => { //if something goes wrong
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

// Login User
export const login = ({ email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify({ email, password });

  axios
    .post('/api/auth', body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};



// Setup config/headers and token
export const tokenConfig = getState => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };



  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};


export const getBorrower=(userID)=>(dispatch)=>{
  axios
  .get(`/api/borrowers/getByID/${userID}`)
  .then(res=>dispatch({
      type: GET_BORROWER,
      payload: res.data
  }))
  .catch(error=> dispatch(returnErrors(error.response.data, error.response.status)))
}


export const addAddress=(newAddress)=> (dispatch)=>{ //get state get passed into the token config
  axios
  .post(`/api/borrowers/${newAddress.userID}/address`,newAddress)

  .then(res => {
      if (res.data) {
        dispatch({
            type: ADD_ADDRESS,
            payload: newAddress
        })
      }
    })
    .catch(err => { //if something goes wrong
      dispatch(
        returnErrors(err.response.data, err.response.status, 'ADD_FAILED')
      );
      dispatch({
        type: ADD_FAILED
      });
   

          //dispatch(returnErrors(error.response.data, error.response.status))
        
    });


  // .then(res=>dispatch({
  //     type: ADD_BOOK,
  //     payload: newBook // =newBook
      
  // }))
  // .catch(error=> dispatch(returnErrors(error.response.data, error.response.status)))

}
