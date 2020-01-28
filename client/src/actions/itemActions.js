import {GET_ITEMS, ADD_ITEM,DELETE_ITEM,ITEMS_LOADING, UPDATE_ITEM} from './types'
import axios from 'axios'

import {tokenConfig} from './authActions' //helper function we created to get the token from local storage
import {returnErrors} from './errorActions'



export const getItems=()=> dispatch=>{
    dispatch(setItemsLoading())
    axios
    .get('/api/items')
    .then(res=>dispatch({
        type: GET_ITEMS,
        payload: res.data
    }))
    .catch(error=> dispatch(returnErrors(error.response.data, error.response.status)))
}

export const addItem=(newItem)=> (dispatch,getState)=>{ //get state get passed into the token config
    axios
    .post('/api/items',newItem,tokenConfig(getState))
    .then(res=>dispatch({
        type: ADD_ITEM,
        payload: newItem // =newItem
        
    }))
    .catch(error=> dispatch(returnErrors(error.response.data, error.response.status)))

}


export const deleteItem=(id)=> (dispatch,getState)=>{
    axios.delete(`/api/items/${id}`,tokenConfig(getState))
    .then(res=>dispatch({
        type:DELETE_ITEM,
        payload: id
    }))
    .catch(error=> dispatch(returnErrors(error.response.data, error.response.status)))


}

export const updateItem=(id,item)=>dispatch=>{
    axios.patch(`/api/items/${id}`,item)
    .then(res=>dispatch({
        type: UPDATE_ITEM,

    }))
    .catch(error=> dispatch(returnErrors(error.response.data, error.response.status)))

}


export const setItemsLoading=()=>{
    return{
        type: ITEMS_LOADING
    }
}