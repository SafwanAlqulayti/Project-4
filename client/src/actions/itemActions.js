import {GET_ITEMS, ADD_ITEM,DELETE_ITEM,ITEMS_LOADING, UPDATE_ITEM} from './types'
import axios from 'axios'
export const getItems=()=> dispach=>{
    dispach(setItemsLoading())
    axios
    .get('/api/items')
    .then(res=>dispach({
        type: GET_ITEMS,
        payload: res.data
    }))
}

export const addItem=(newItem)=> dispatch=>{
    axios
    .post('/api/items',newItem)
    .then(res=>dispatch({
        type: ADD_ITEM,
        payload: newItem // =newItem
        
    }))
}


export const deleteItem=(id)=> dispatch=>{
    axios.delete(`/api/items/${id}`)
    .then(res=>dispatch({
        type:DELETE_ITEM,
        payload: id
    }))

}

export const updateItem=(id,item)=>dispatch=>{
    axios.patch(`/api/items/${id}`,item)
    .then(res=>dispatch({
        type: UPDATE_ITEM,

    }))
}


export const setItemsLoading=()=>{
    return{
        type: ITEMS_LOADING
    }
}