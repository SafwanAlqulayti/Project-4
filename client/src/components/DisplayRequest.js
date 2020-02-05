import React, { Component } from 'react';
import { Container, Button, Row, Alert, CardHeader, Card, CardFooter, CardTitle, CardText, CardBody } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';

import { connect } from 'react-redux';
import { getBook, deleteBook } from '../actions/bookActions';
import { updateRequest } from '../actions/requestActions';

import PropTypes from 'prop-types';
import NewBookForm from './NewBookForm';
import {
  Link
} from 'react-router-dom';

import {
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  
} from 'reactstrap';
import moment from 'moment'

class DisplayRequest extends Component {


    state={
        response:'',
        status:''
      }

      componentDidMount() {
        // const selectedEnquiry=this.props.selected
        // console.log(selectedEnquiry)
         console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))
     
         const  selectedRequest = this.props.location.selected
        // const askedBy=this.props.location.postedBy
         this.setState({
            request:selectedRequest
         })
       }

       
  onChange = e => {
    this.setState({ [e.target.name]: e.target.options[e.target.selectedIndex].value
    });
  };

       onSubmit = e => {
        e.preventDefault();
        // const { enquiry, response} = this.state
        // const updatedEnquiry = enquiry
        // updatedEnquiry.response=response
        // console.log(updatedEnquiry)
        // console.log(updatedEnquiry._id)
        // this.props.updateEnquiry(updatedEnquiry._id, updatedEnquiry)
        
      
        this.setState({
      
      
        })
      
      
      
      };

      render() {
          console.log(this.state.status)
          const selectedRequest=this.state.request

          if(selectedRequest){

        return(
            <div className='requestDetails'>
              <Card >
              <CardHeader><h4>Request Details</h4></CardHeader>
              <CardBody>
              <CardHeader><h5>Book</h5></CardHeader>

                <img src={selectedRequest.book.img_src} width={200} height={200}></img>
                
                <ListGroup variant="flush" className='bookDetails-request'>
                  <ListGroupItem><b>Book Title:</b>  {selectedRequest.book.title}</ListGroupItem>
                  <ListGroupItem><b>Author(s):</b> {selectedRequest.book.author}</ListGroupItem>
                  <ListGroupItem><b>Publish Year:</b> {selectedRequest.book.publish_year}</ListGroupItem>

                </ListGroup>
                <CardHeader><h5>Address</h5></CardHeader>
              
                <ListGroup variant="flush" className='bookDetails-request'>
                  <ListGroupItem><b>Name:</b>  {selectedRequest.address.full_name}</ListGroupItem>
                  <ListGroupItem><b>Phone Number:</b> {selectedRequest.address.phone_number}</ListGroupItem>
                  <ListGroupItem><b>Address:</b> <br></br>{selectedRequest.address.country}-{selectedRequest.address.city}
                  <br></br>{selectedRequest.address.district}-{selectedRequest.address.street}</ListGroupItem>

                </ListGroup>


              </CardBody>
</Card>
<Card body outline color="primary">
<CardHeader><h4>Request Action</h4></CardHeader>

              <CardBody>
              <div class="border-top my-3"></div>
              <Form onSubmit={this.onSubmit}>
             <FormGroup>
             <Label for="status"></Label>
          <Input type="select" id="exampleCustomSelectDisabled" name="status"  value={this.state.status}   onChange={this.onChange}>
            <option value="Approve">Approve</option>
            <option value="Reject">Reject</option>
           
          
          
          </Input>
                 </FormGroup>
                 </Form>
                
              <Button >Update Request</Button>
              </CardBody>
            </Card>


            </div>
        )

        }// end of if request has a value

        else{
            return null
        }
      }

    }

    const mapStateToProps = state => ({
        request: state.request,
        isAuthenticated: state.auth.isAuthenticated,
        isAdmin: state.auth.isAdmin
      });
      
      export default connect(
        mapStateToProps,
        { updateRequest }
      )(DisplayRequest);
      