

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
    street: ''

  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    isAdmin: PropTypes.bool,
    error: PropTypes.object.isRequired,
   // addBook: PropTypes.func.isRequired,
    addAddress: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
};



  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };


  onSubmit = e => {
    e.preventDefault();
    const { full_name, phone_number, district, street } = this.state;

    const address = {
      full_name, phone_number, district, street
    }
    var user = JSON.parse(localStorage.getItem('useru'))
    console.log(address)
    console.log(user.id)
    this.props.addAddress(user._id,address)
  


  }
  render() {

    return (
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
  { addAddress, clearErrors }
)(AddressForm);

