import { ADD_ADDRESS, CLEAR_ERRORS } from '../actions/types'

const initialState = {
    message: {},
    status: null,
    id: null,
    address:null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_ADDRESS:
            return {
                ...state,
                address:action.payload
            }

    }


}