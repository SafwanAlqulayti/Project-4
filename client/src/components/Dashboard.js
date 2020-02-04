import React, { Component } from 'react';
// import { Container, Button, Row, Alert, CardHeader, Card, CardFooter, CardTitle, CardText, CardBody } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


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
     <Link to ='/BookList' ><NavLink className='nav-link active'>Manage Books</NavLink> </Link>
     <Link to='/Requests'> <NavLink className='nav-link '>Manage Requests</NavLink> </Link>
     <Link to='/Enquiries'><NavLink className='nav-link '>Enquiries</NavLink> </Link>
      <NavLink className='nav-link '>Manage Admins</NavLink>
      <NavLink className='nav-link '>Settings</NavLink>
      </div>

      //if the user is not an admin, but still a regestired user, display user's dashboard

      :this.props.isAuthenticated?
      <div className="nav flex-column nav-pills dashboard" id="v-pills-tab" role="tablist" aria-orientation="vertical" display='inline'>
      <Link to ='/BookList' ><NavLink className='nav-link active'>Browse Books</NavLink> </Link>
      <Link to='/Requests'> <NavLink className='nav-link '>My Requests</NavLink> </Link>
      <Link to='/Enquiries'><NavLink className='nav-link '>My Enquiries</NavLink> </Link>
       <NavLink className='nav-link '>Favorites</NavLink>
       <NavLink className='nav-link '>Settings</NavLink>
       </div>
      
      
      :<div className="nav flex-column nav-pills dashboard" id="v-pills-tab" role="tablist" aria-orientation="vertical" display='inline'>
      <Link to ='/BookList' ><NavLink className='nav-link active'>Browse Books</NavLink> </Link>
      </div>}




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