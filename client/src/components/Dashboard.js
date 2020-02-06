import React, { Component } from 'react';
// import { Container, Button, Row, Alert, CardHeader, Card, CardFooter, CardTitle, CardText, CardBody } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import myRequests from '../images/myRequests.png'
import req from '../images/req.png'
import books from '../images/books.png'
import booksbr from '../images/booksbr.png'




import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';



class Dashboard extends Component {

  static propTypes={
    isAuthenticated: PropTypes.bool,
    isAdmin:PropTypes.bool
}

render(){

  return(
<div>
    {this.props.isAdmin?
    <div className="nav flex-column nav-pills dashboard" id="v-pills-tab" role="tablist" aria-orientation="vertical" display='inline'>
     <Link className='link' to ='/BookList' ><NavLink  className='nav-link link-width' >
     Manage Books
       </NavLink> </Link>
     <Link className='link' to='/Requests'> <NavLink className='nav-link link-width '>
     Manage Requests

      </NavLink> </Link>

       
     <Link className='link'to='/Enquiries'><NavLink className='nav-link link-width '>Enquiries</NavLink> </Link>
      </div>

      //if the user is not an admin, but still a regestired user, display user's dashboard

      :this.props.isAuthenticated?
      <div className="nav flex-column nav-pills dashboard" id="v-pills-tab" role="tablist" aria-orientation="vertical" display='inline'>
      <Link className='link' to ='/BookList' ><NavLink className='nav-link link-width'>Browse Books</NavLink> </Link>
      <Link className='link' to='/Requests'> <NavLink className='nav-link link-width '>
      My Requests
        </NavLink> </Link>
      <Link className='link' to='/Enquiries'><NavLink className='nav-link link-width '>My Enquiries</NavLink> </Link>
       </div>
      

      
      :''}




</div> 


  )
}
}

const mapStateToProps=state=>({
    
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin

})
export default connect(mapStateToProps)(Dashboard)

//export default Dashboard;


// export default connect(
//     mapStateToProps,
//     { getBook, deleteBook }
//   )(DisplayBook);