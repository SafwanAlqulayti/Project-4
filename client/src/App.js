import React , {Component} from 'react';
import {Provider} from 'react-redux'
import store from './store'
//import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import AppNavbar from './components/AppNavbar'
import ShoppingList from './components/ShoppingList'
import ItemModal from './components/itemModal'
import {Container} from 'reactstrap'
import Footer from './components/Footer'
import {loadUser} from './actions/authActions'

class  App extends Component{
  componentDidMount(){
    store.dispatch(loadUser())
  }

  render(){
  return (
  
    <Provider store={store}>
    <div className="App">
     <AppNavbar></AppNavbar>
     <Container>
     <ItemModal></ItemModal>
     <ShoppingList></ShoppingList>
     </Container>
     {/* <h1>Hello</h1> */}
     <Footer></Footer>
    </div>
    </Provider>
  );

  }
}

export default App;
