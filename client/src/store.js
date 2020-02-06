// import {createStore, applyMiddleware, compose} from 'redux'
// import thunk from 'redux-thunk'
// import rootReducer from './reducers'
// import {loadUser} from './actions/authActions'
// import { getUserRequests } from './actions/requestActions'


// const initialState={}

// const middleware=[thunk]//middle ware we're gonna use

// const store=createStore(rootReducer,initialState,compose(
//     applyMiddleware(...middleware),
//     //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// ))

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      // your reducers here...
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
store.dispatch(loadUser())

//export default store