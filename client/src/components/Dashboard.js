import React, { Component } from 'react';
// import { Container, Button, Row, Alert, CardHeader, Card, CardFooter, CardTitle, CardText, CardBody } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import myRequests from '../images/myRequests.png'


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
     <Link to ='/BookList' ><NavLink  className='nav-link'>
       <img src=" https://www.incimages.com/uploaded_files/image/970x450/getty_496612468_2000138820009280460_336567.jpg" width={300} height={80}></img>
       </NavLink> </Link>
     <Link to='/Requests'> <NavLink className='nav-link '>
     <img src="       https://www.incimages.com/uploaded_files/image/970x450/getty_496612468_2000138820009280460_336567.jpg
" width={300} height={80}></img>

       Manage Requests</NavLink> </Link>

       
     <Link to='/Enquiries'><NavLink className='nav-link '>Enquiries</NavLink> </Link>
      </div>

      //if the user is not an admin, but still a regestired user, display user's dashboard

      :this.props.isAuthenticated?
      <div className="nav flex-column nav-pills dashboard" id="v-pills-tab" role="tablist" aria-orientation="vertical" display='inline'>
      <Link to ='/BookList' ><NavLink className='nav-link active'>Browse Books</NavLink> </Link>
      <Link to='/Requests'> <NavLink className='nav-link '>
      <img src={myRequests}
width={300} height={80}></img>
        My Requests</NavLink> </Link>
      <Link to='/Enquiries'><NavLink className='nav-link '>My Enquiries</NavLink> </Link>
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