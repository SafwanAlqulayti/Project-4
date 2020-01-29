import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Row} from 'reactstrap';

import {
    Card, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody
  } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getBooks, deleteBook, getBook } from '../actions/bookActions';
import PropTypes from 'prop-types';
import NewBookForm from './NewBookForm';
import {
  Link
} from 'react-router-dom';

class BookList extends Component {
  static propTypes = {
    getBooks: PropTypes.func.isRequired,
    books: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.getBooks();
  }

  onDeleteClick = id => {
    this.props.deleteBook(id);
    window.location.reload();

  };

  onClickGetBook=id=>{
    this.props.getBook(id);
  }

  render() {
    const { books } = this.props.book;
    const allBooks=books.map((book,index) => (
        <Card key={index} style={{ width: '18rem' }}>
        <CardImg  width="20px" src={book.img_src} alt="Card image cap" />
        <CardBody body className="text-center">
          <CardTitle><b>{book.title}</b></CardTitle>
          <CardSubtitle>{book.author}</CardSubtitle>
          <CardText>{book.description}</CardText>
          <Button onClick={this.onClickGetBook.bind(this,book._id)}><Link to='/DisplayBook'>More</Link></Button>
          {this.props.isAuthenticated? <Button
                      className='remove-btn'
                      color='danger'
                      size='sm'
                      onClick={this.onDeleteClick.bind(this, book._id)}
                    >
                      &times;
                    </Button>: ''}
        </CardBody>
      </Card>

))

    
    return (
      <Container>
        <h4>Book List</h4>
          <Row>
          

           {allBooks}

          
           </Row>
           {this.props.isAuthenticated?  <NewBookForm></NewBookForm>: ''}
          
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  book: state.book,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getBooks, deleteBook,getBook }
)(BookList);