import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';

import {
    Card, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody
  } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getBooks, deleteBook } from '../actions/bookActions';
import PropTypes from 'prop-types';

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
  };

  render() {
    const { books } = this.props.book;
    const allBooks=books.map((book) => (
        <Card style={{ width: '18rem' }}>
        <CardImg  width="20px" src={book.img_src} alt="Card image cap" />
        <CardBody body className="text-center">
          <CardTitle><b>{book.title}</b></CardTitle>
          <CardSubtitle>{book.author}</CardSubtitle>
          <CardText>{book.description}</CardText>
          <Button>More</Button>
        </CardBody>
      </Card>

))

    
    return (
      <Container>

           {allBooks}

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
  { getBooks, deleteBook }
)(BookList);