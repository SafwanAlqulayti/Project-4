import React, { Component } from 'react';
import { Container, Button, Row, Alert, CardHeader, Card, CardFooter, CardTitle, CardText, CardBody } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';

import { connect } from 'react-redux';
import { getBook, deleteBook } from '../actions/bookActions';
import { updateEnquiry } from '../actions/enquiryActions';

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

class DisplayEnquiry extends Component {


  state={
    response:'',
    enquiry:''
  }
  static propTypes = {
    updateEnquiry: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    isAdmin: PropTypes.bool,
    

  };

  componentDidMount() {
   // const selectedEnquiry=this.props.selected
   // console.log(selectedEnquiry)
    console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))

    const  selectedEnquiry = this.props.location.selected
   // const askedBy=this.props.location.postedBy
    this.setState({
      enquiry:selectedEnquiry
    })
  }


  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
};

onSubmit = e => {
  e.preventDefault();
  const { enquiry, response} = this.state
  const updatedEnquiry = enquiry
  updatedEnquiry.response=response
  console.log(updatedEnquiry)
  console.log(updatedEnquiry._id)
  this.props.updateEnquiry(updatedEnquiry._id, updatedEnquiry)
  //this.showAlert();

  this.setState({
    //  addStatus: 'added',
     // redirect: true

  })



};

  render() {
   // this.onDeleteClick = this.onDeleteClick.bind(this);
    const  selectedEnquiry = this.props.location.selected
    const askedBy=this.props.location.postedBy
    // this.setState({
    //   enquiry:selectedEnquiry
    // })
    console.log(selectedEnquiry)
    //console.log(selectedEnquiry)



    return (
      <div>
       
      {/* <h2>  {this.props.match.params.id} </h2> for testing purposes only, add it to the book schema */}




        {selectedEnquiry ?
          <div>

      {/* <Link to={ {pathname:'/NewBookForm', type:'Edit', currentBook:selectedBook}} >    <Button className='remove-btn' color='info'size='sm'> Update Book</Button></Link>  */}
        



            <Card >
              <CardHeader><h5>{selectedEnquiry.enquiry_title}</h5></CardHeader>

              <CardBody>
                {/* <img src={selectedBook.img_src} width={400} height={600}></img> */}

                <ListGroup variant="flush" className="enquiryDetails">
                  <ListGroupItem><b>Posted By:</b>    {askedBy.name}</ListGroupItem>
                  <ListGroupItem><b>Email:</b> {askedBy.email}</ListGroupItem>
                  <ListGroupItem><b>Question:</b> {selectedEnquiry.enquiry_body}</ListGroupItem>
                  <ListGroupItem><b>Date:</b> {moment(selectedEnquiry.submitted_date).format('LLL')}</ListGroupItem>
          
                </ListGroup>
              </CardBody>

            {selectedEnquiry.response?
            <div>
              <h4>Response</h4>
              <ListGroup variant="flush" className="enquiryDetails">
                  <ListGroupItem><b>Answered By:</b>    {askedBy.name}</ListGroupItem>
                  <ListGroupItem><b>Response:</b> {selectedEnquiry.response}</ListGroupItem>
                  <ListGroupItem><b>Date:</b> {moment(selectedEnquiry.response_date).format('LLL')}</ListGroupItem>
          
                </ListGroup>
                </div>
:
              this.props.isAdmin?
              <div>
             <Form onSubmit={this.onSubmit}>

              <Label for='response'><h4>Response</h4></Label>
                                <Input
                                    type='textarea'
                                    name='response'
                                    // id='enquirybody'
                                    placeholder='Please write your question here'
                                    className='mb-3'
                                    value={this.state.response}
                                    onChange={this.onChange}
                                    required
                                />
              <Button>Submit Response</Button>
              </Form>
            </div>:''}
            </Card>


          </div>
          : <Alert color='danger'>Sorry, something went wrong</Alert>}


        {/* {this.props.isAuthenticated ? <NewBookForm></NewBookForm> : ''} */}









      </div>
    );
  }
}

const mapStateToProps = state => ({
  enquiry: state.enquiry,
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin
});

export default connect(
  mapStateToProps,
  { updateEnquiry, deleteBook }
)(DisplayEnquiry);