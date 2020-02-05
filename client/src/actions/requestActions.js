import { GET_ALL_REQUESTS, GET_USER_REQUESTS, UPDATE_REQUEST, SUBMIT_REQUEST, ADD_FAILED,LOGOUT_SUCCESS } from '../actions/types'
import axios from 'axios'
import {tokenConfig} from './authActions' //helper function we created to get the token from local storage
import {returnErrors} from './errorActions'


export const getALLRequests=()=> dispatch=>{
   // dispatch(setBooksLoading())
    axios
    .get('/api/requests')
    .then(res=>dispatch({
        type: GET_ALL_REQUESTS,
        payload: res.data
    }))
    .catch(error=> dispatch(returnErrors(error.response.data, error.response.status)))
}

export const getUserRequests=(borrowerID)=> dispatch=>{
    // dispatch(setBooksLoading())
     axios
     .get(`/api/borrowers/${borrowerID}/requests`)
     .then(res=>dispatch({
         type: GET_USER_REQUESTS,
         payload: res.data
     }))
     .catch(error=> dispatch(returnErrors(error.response.data, error.response.status)))
 }


//  export const submitANewEnqiry=(borrowerID,newEnquiry)=> dispatch=>{
//     // dispatch(setBooksLoading())
//      axios
//      .post(`/api/borrowers/${borrowerID}/enquiries`)
//      .then(res=>dispatch({
//          type: SUBMIT_ENQUIRY,
//          payload: res.data
//      }))
//      .catch(error=> dispatch(returnErrors(error.response.data, error.response.status)))
//  }


 export const submitANewRequest=(newRequest,newAddress)=> (dispatch)=>{ //get state get passed into the token config
    axios
    .post(`/api/borrowers/${newRequest.userID}/requests`,newRequest,newAddress)

    .then(res => {
        if (res.data) {
          dispatch({
              type: SUBMIT_REQUEST,
              payload: res.data
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
    }


 export const updateRequest=(requestID,updateRequest)=> dispatch=>{
    // dispatch(setBooksLoading())
     axios
     .patch(`/api/requests/${requestID}`,updateRequest)
     .then(res=>dispatch({
         type: UPDATE_REQUEST,
         payload: requestID
     }))
     .catch(error=> dispatch(returnErrors(error.response.data, error.response.status)))
 }

 
// export const getEnquiry=(id)=>(dispatch)=>{
//     axios
//     .get(`/api/enquiries/${id}`)
//     .then(res=>dispatch({
//         type: GET_ENQUIRY,
//         payload: res.data
//     }))
//     .catch(error=> dispatch(returnErrors(error.response.data, error.response.status)))
// }
