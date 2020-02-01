import React, { Component } from 'react';
// import { Container, Button, Row, Alert, CardHeader, Card, CardFooter, CardTitle, CardText, CardBody } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux';

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



class Dashboard extends Component {

render(){

  return(




    <div className="nav flex-column nav-pills dashboard" id="v-pills-tab" role="tablist" aria-orientation="vertical" display='inline'>
      <NavLink className='nav-link active'>Manage Books</NavLink>
      <NavLink className='nav-link '>Requests</NavLink>
      <NavLink className='nav-link '>Enquiries</NavLink>
      <NavLink className='nav-link '>Manage Admins</NavLink>
      <NavLink className='nav-link '>Settings</NavLink>




</div> 


  )
}
}

export default Dashboard;


// export default connect(
//     mapStateToProps,
//     { getBook, deleteBook }
//   )(DisplayBook);