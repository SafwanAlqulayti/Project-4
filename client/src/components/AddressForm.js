

import React, { Component } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addAddress } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import { submitANewRequest } from '../actions/requestActions';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';

import SweetAlert from 'react-bootstrap-sweetalert'

class AddressForm extends Component {

  state = {
    full_name: '',
    phone_number: '',
    country: '',
    city: '',
    district: '',
    street: '',
    userID:'',
    user:'',
    alert: null

  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    isAdmin: PropTypes.bool,
    error: PropTypes.object.isRequired,
   submitANewRequest: PropTypes.func.isRequired,
    addAddress: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
};

showAlert() {
  const getAlert = () => (
      <SweetAlert
          success
          title="Success!"
          timeout={1800}
          showConfirm={false}
          onConfirm={() => this.hideAlert()}
      > Your request has been submitted
    </SweetAlert>
  );

  this.setState({
      alert: getAlert()
  });
}

hideAlert() {
  console.log('Hiding alert...');
  this.setState({
      alert: null
  });
  //this.submitRequest
}


componentDidMount(){
  const user = JSON.parse(localStorage.getItem('useru'))
  console.log(user)
  this.setState({
    userID:user.id,
    user:user
  })
  console.log(this.state.userID)
}


  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };


  submitRequest=(request,address)=>{
 
   // const address=user.address
   // const userID=user._id
   // const  book = this.props.location.book
    //const request={book,address,userID}
    this.props.submitANewRequest(request,address)

  }
  onSubmit = e => {
    e.preventDefault();
    const { full_name, phone_number, district, street,userID } = this.state;
   

    //const userID=user._id
    //console.log(userID)
    //var address=user.address
   // console.log(user)
    const address = {
      full_name, phone_number, district, street,userID}   

    console.log('user to be posted to ') 
  





   
    console.log(address)

    //const userID=this.state.userID
    //this.props.addAddress(address)

    const  book = this.props.location.book
    const request={book,userID}
    const bookTitle=book.title
    const combinedValues={ full_name, phone_number, district, street,userID,book,bookTitle}

    //this.props.submitANewRequest(request)

   // this.submitRequest(request,address)

    this.props.submitANewRequest(combinedValues)
    this.showAlert();

    this.setState({
      addStatus: 'added',
      redirect: true

  })

  

  }
  render() {
    const  book = this.props.location.book
    const bookTitle=book.title
   // console.log(selectedBook)
   // var user = JSON.parse(localStorage.getItem('useru'))
  //  var userID=user._id
  //  console.log(user)


  if (this.state.redirect && this.state.alert == null) {


    // return <Redirect to={{pathname:'/DisplayBook', selected:book}} />
    return <Redirect to='/Requests' />

}

    return (
<div>
{this.state.alert}

      <Form onSubmit={this.onSubmit}>
        <FormGroup>

          <Label for='full_Name'>Full Name</Label>
          <Input
            type='text'
            name='full_name'
            id='full_Name'
            placeholder='Full Name'
            className='mb-3'
            value={this.state.full_Name}
            onChange={this.onChange}
            required
          />

          <Label for='phone_number'>Phone Number</Label>
          <Input
            type='text'
            name='phone_number'
            id='phone_number'
            placeholder='Please write your question here'
            className='mb-3'
            value={this.state.phone_number}
            onChange={this.onChange}
            required
          />



          <Label for="country">Country</Label>
          <Input type="select" id="exampleCustomSelectDisabled" name="country" disabled>
            <option value="">Saudi Arabia</option>
            value={this.state.country}
            onChange={this.onChange}
          </Input>


          <Label for="city">City</Label>
          <Input type="select" name="city" id="exampleSelect"disabled>
            <option>Jeddah </option>
            value={this.state.city}
            onChange={this.onChange}



          </Input>



          <Label for='district'>District</Label>
          <Input
            type='text'
            name='district'
            // id='enquirybody'
            placeholder='Please write your question here'
            className='mb-3'
            value={this.state.district}
            onChange={this.onChange}
            required
          />

          <Label for='street'>Street</Label>
          <Input
            type='text'
            name='street'
            // id='enquirybody'
            placeholder='Please write your question here'
            className='mb-3'
            value={this.state.street}
            onChange={this.onChange}
            required
          />




        </FormGroup>
        <Button>Submit</Button>
      </Form>
</div>

    )
  }


}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin,
  error: state.error,

});
export default connect(
  mapStateToProps,
  { addAddress, clearErrors,submitANewRequest }
)(AddressForm);

