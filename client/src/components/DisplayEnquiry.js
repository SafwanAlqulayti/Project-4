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

class DisplayEnquiry extends Component {


  state={
    response:''
  }
  static propTypes = {
    getBook: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    isAdmin: PropTypes.bool,
    

  };

  componentDidMount() {
    const selectedEnquiry=this.props.selected
    console.log(selectedEnquiry)
  }


  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
};

  render() {
   // this.onDeleteClick = this.onDeleteClick.bind(this);
    const  selectedEnquiry = this.props.location.selected
    const askedBy=this.props.location.postedBy
    console.log(selectedEnquiry)
    //console.log(selectedEnquiry)



    return (
      <div>
        <h4>Details:</h4>
      {/* <h2>  {this.props.match.params.id} </h2> for testing purposes only, add it to the book schema */}




        {selectedEnquiry ?
          <div>

      {/* <Link to={ {pathname:'/NewBookForm', type:'Edit', currentBook:selectedBook}} >    <Button className='remove-btn' color='info'size='sm'> Update Book</Button></Link>  */}
        



            <Card >
              <CardHeader>{selectedEnquiry.title}</CardHeader>

              <CardBody>
                {/* <img src={selectedBook.img_src} width={400} height={600}></img> */}

                <ListGroup variant="flush" className='bookDetails'>
                  <ListGroupItem><b>Author(s):</b>    {selectedEnquiry.enquiry_title}</ListGroupItem>
                  <ListGroupItem><b>Description:</b> {selectedEnquiry.enquiry_body}</ListGroupItem>
                  <ListGroupItem><b>Genre:</b> {askedBy.name}</ListGroupItem>
                  <ListGroupItem><b>Published in:</b> {askedBy.email}</ListGroupItem>
                
                </ListGroup>
              </CardBody>
              {this.props.isAdmin?
              <div>
              <Label for='response'>Response</Label>
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
              <Button>Submit Response</Button> </div>:''}
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
  { getBook, deleteBook }
)(DisplayEnquiry);