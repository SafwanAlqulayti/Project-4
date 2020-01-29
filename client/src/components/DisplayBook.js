import React, { Component } from 'react';
import { Container, Button, Row, Alert, CardHeader, Card, CardFooter, CardTitle, CardText, CardBody } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';

import { connect } from 'react-redux';
import { getBook, deleteBook } from '../actions/bookActions';
import PropTypes from 'prop-types';
import NewBookForm from './NewBookForm';

class DisplayBook extends Component {
  static propTypes = {
    getBook: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    // this.props.getBook();
  }



  render() {

    const { selectedBook } = this.props.book;
    console.log(selectedBook)



    return (
      <div>
        <h4>Book Details</h4>





        {selectedBook ?
<div>
<Card >
<CardHeader>{selectedBook.title}</CardHeader>

<CardBody>
<img src={selectedBook.img_src} width={400} height={600}></img>

  <ListGroup variant="flush" >
    <ListGroupItem><b>Author(s):</b>    {selectedBook.author}</ListGroupItem>
    <ListGroupItem><b>Description:</b> {selectedBook.description}</ListGroupItem>
    <ListGroupItem><b>Genre:</b> {selectedBook.category}</ListGroupItem>
    <ListGroupItem><b>Published in:</b> {selectedBook.publish_year}</ListGroupItem>
    <ListGroupItem><b>Publisher:</b> {selectedBook.publisher}</ListGroupItem>
    <ListGroupItem><b>ISBN:</b> {selectedBook.ISBN}</ListGroupItem>
  </ListGroup>



</CardBody>
<Button>Request</Button>
  <Button>Add to my Books</Button>
</Card>

 
</div>
              : <Alert color='danger'>Sorry, something went wrong</Alert>}


        {/* {this.props.isAuthenticated ? <NewBookForm></NewBookForm> : ''} */}









      </div>
    );
  }
}

const mapStateToProps = state => ({
  book: state.book,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getBook }
)(DisplayBook);