import {ADD_ADDRESS ,GET_BOOKS, ADD_BOOK,DELETE_BOOK,BOOKS_LOADING, UPDATE_BOOK,ADD_FAILED,GET_BOOK} from './types'
import axios from 'axios'
import {tokenConfig} from './authActions' //helper function we created to get the token from local storage
import {returnErrors} from './errorActions'



// export const getBooks=()=> dispatch=>{
//     dispatch(setBooksLoading())
//     axios
//     .get('/api/books')
//     .then(res=>dispatch({
//         type: GET_BOOKS,
//         payload: res.data
//     }))
//     .catch(error=> dispatch(returnErrors(error.response.data, error.response.status)))
// }

// export const getBook=(id)=>(dispatch)=>{
//     axios
//     .get(`/api/books/${id}`)
//     .then(res=>dispatch({
//         type: GET_BOOK,
//         payload: res.data
//     }))
//     .catch(error=> dispatch(returnErrors(error.response.data, error.response.status)))
// }


// export const addAddress=(userID,newAddress)=> (dispatch)=>{ //get state get passed into the token config
//     axios
//     .post(`/api/borrowes/${userID}`,newAddress)

//     .then(res => {
//         if (res.data) {
//           dispatch({
//               type: ADD_ADDRESS,
//               payload: newAddress
//           })
//         }
//       })
//       .catch(err => { //if something goes wrong
//         dispatch(
//           returnErrors(err.response.data, err.response.status, 'ADD_FAILED')
//         );
//         dispatch({
//           type: ADD_FAILED
//         });
     

//             //dispatch(returnErrors(error.response.data, error.response.status))
          
//       });


    // .then(res=>dispatch({
    //     type: ADD_BOOK,
    //     payload: newBook // =newBook
        
    // }))
    // .catch(error=> dispatch(returnErrors(error.response.data, error.response.status)))

//}


// export const deleteBook=(id)=> (dispatch,getState)=>{
//     axios.delete(`/api/books/${id}`,tokenConfig(getState))
//     .then(res=>dispatch({
//         type:DELETE_BOOK,
//         payload: id
//     }))
//     .catch(error=>  console.log(error))


// }

// export const updateBook=(id,book)=>dispatch=>{
//     axios.patch(`/api/books/${id}`,book)
//     .then(res=>dispatch({
//         type: UPDATE_BOOK,
//         payload: id

//     }))
//     .catch(error=> dispatch(returnErrors(error.response.data, error.response.status)))

// }


// export const setBooksLoading=()=>{
//     return{
//         type: BOOKS_LOADING
//     }
// }