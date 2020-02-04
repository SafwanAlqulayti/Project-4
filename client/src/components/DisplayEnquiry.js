import React, { Component } from 'react';
import { Container, Button, Row, Alert, CardHeader, Card, CardFooter, CardTitle, CardText, CardBody } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';

import { connect } from 'react-redux';
import { getBook, deleteBook } from '../actions/bookActions';
import PropTypes from 'prop-types';
import NewBookForm from './NewBookForm';
import {
  Link
} from 'react-router-dom';

class DisplayEnquiry extends Component {
  static propTypes = {
    getBook: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
  }




  render() {
   // this.onDeleteClick = this.onDeleteClick.bind(this);
    const { selectedEnquiry } = this.props.enquiry;
    console.log(selectedEnquiry)



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
                  <ListGroupItem><b>Author(s):</b>    {selectedEnquiry.title}</ListGroupItem>
                  <ListGroupItem><b>Description:</b> {selectedEnquiry.description}</ListGroupItem>
                  <ListGroupItem><b>Genre:</b> {selectedEnquiry.category}</ListGroupItem>
                  <ListGroupItem><b>Published in:</b> {selectedEnquiry.publish_year}</ListGroupItem>
                
                </ListGroup>
              </CardBody>
              <Button>Submit Response</Button>
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
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getBook, deleteBook }
)(DisplayEnquiry);