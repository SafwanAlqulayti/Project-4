import React , {Component} from 'react';
import {Provider} from 'react-redux'
import store from './store'
//import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import AppNavbar from './components/AppNavbar'
import ShoppingList from './components/ShoppingList'
import BookList from './components/BookList'
import ItemModal from './components/itemModal'
import {Container} from 'reactstrap'
import Footer from './components/Footer'
import {loadUser} from './actions/authActions'
import DisplayBook from './components/DisplayBook'
import NewBookForm from './components/NewBookForm';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import List from './components/List';
import DisplayEnquiry from './components/DisplayEnquiry';
import EnquiryForm from './components/EnquiryForm';






import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { MongoNetworkError } from 'mongodb';
import AddressForm from './components/AddressForm';
import RequestsList from './components/RequestsList';
import DisplayRequest from './components/DisplayRequest';

class  App extends Component{
  componentDidMount(){
    //store.dispatch(loadUser())
  }

  render(){
  return (
    <Router>
    {/* <Provider store={store}> */}
       
    <div className="App">


      
     <AppNavbar></AppNavbar>

     <header id="showcase">
    <h1>Welcome To The Beach</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi officiis ipsum officia numquam expedita ullam.</p>
  </header>

  <Dashboard></Dashboard>

     <Container >
    
     
     {/* <ItemModal></ItemModal> */}
     <div  className="cont" >
  
        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/" component={BookList} />
        <Route  path="/BookList" component={BookList} />


        <Route path="/contact" component={ShoppingList} />

        <Route path="/DisplayBook" component={DisplayBook} />

        <Route path="/NewBookForm" component={NewBookForm} />

        {/* <Route path="/Requests" component={() =><List listType="request"/>} /> */}
        <Route path="/Enquiries" component={List} />
        <Route path="/newEnquiry" component={EnquiryForm} />
        <Route path='/DisplayEnquiry' component={DisplayEnquiry}/>
        <Route path='/Address' component={AddressForm}/>
        <Route path='/Requests' component={RequestsList}/>
        <Route path='/DisplayRequest' component={DisplayRequest}/>





        


     


      </div>
     {/* <ShoppingList></ShoppingList> */}

     </Container>

     {/* <h1>Hello</h1> */}
     </div>

    <div className='clear'></div>
     <Footer></Footer>


    {/* </Provider> */}

    </Router>

  );

  }
}

export default App;
