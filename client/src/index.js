// import React from 'react';
 //import ReactDOM from 'react-dom';
// import App from './App';
 import 'bootstrap/dist/css/bootstrap.min.css';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

import React from 'react'
import ReactDOM from 'react-dom';

//import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import {loadUser} from './actions/authActions'

import { Provider } from 'react-redux'
//import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
//import reducer from './reducers'
import rootReducer from './reducers'

//.import { getAllProducts } from './actions'
import App from './App'
import store from './store'


// const middleware = [ thunk ];
// const initialState={}
// // if (process.env.NODE_ENV !== 'production') {
// //   //middleware.push(createLogger());
// // }

// const store = createStore(
//   rootReducer,initialState,compose(
//   applyMiddleware(...middleware),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
// )

// //store.dispatch(getAllProducts())
// store.dispatch(loadUser())


// //render(
// //   <Provider store={store}>
// //     <App />
// //   </Provider>,
 ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'))
//)