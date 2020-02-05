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

class DisplayBook extends Component {
  static propTypes = {
    getBook: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    isAdmin:PropTypes.bool
  };

  componentDidMount() {
    // this.props.getBook();
  }

  onDeleteClick = (id) => {
    this.props.deleteBook(id)
    window.location.href = "/"

  }

  handleRedirect=()=>{
      
  }


  render() {
    this.onDeleteClick = this.onDeleteClick.bind(this);
    const  selectedBook  =this.props.location.selected
    console.log(selectedBook)


 if(selectedBook){


    return (
      <div>
        <h4>Book Details</h4>
      {/* <h2>  {this.props.match.params.id} </h2> for testing purposes only, add it to the book schema */}




        {/* {selectedBook ? */}




            <Card >
              <CardHeader className="text-center"><b>{selectedBook.title}</b></CardHeader>

              <CardBody>
                <img className='displayImage' src={selectedBook.img_src} width={320} height={420}></img>

                <ListGroup variant="flush" className='bookDetails'>
                  <ListGroupItem><b>Author(s):</b>    {selectedBook.author}</ListGroupItem>
                  <ListGroupItem><b>Description:</b> {selectedBook.description}</ListGroupItem>
                  <ListGroupItem><b>Genre:</b> {selectedBook.category}</ListGroupItem>
                  <ListGroupItem><b>Published in:</b> {selectedBook.publish_year}</ListGroupItem>
                  <ListGroupItem><b>Publisher:</b> {selectedBook.publisher}</ListGroupItem>
                  <ListGroupItem><b>ISBN:</b> {selectedBook.ISBN}</ListGroupItem>
                </ListGroup>
              </CardBody>

              {this.props.isAuthenticated&&!this.props.isAdmin?
              <div className='wrapper'>
             <Link to={{pathname:'/Address' ,book:selectedBook}}><Button color="info" link to={{pathname:'/Address' ,book:selectedBook}}>Submit a Request</Button></Link> 
             </div>
             :""}
              {/* <Button >Add to my Books</Button> */}

              {this.props.isAdmin?
          <div>

<div className='wrapper'>
      <Link to={ {pathname:'/NewBookForm', type:'Edit', currentBook:selectedBook}} >    <Button className='remove-btn' color='info'size='sm'> Update Book</Button></Link> 
        


            <Button
              className='remove-btn'
              color='danger'
              size='sm'
              onClick={() => { if (window.confirm(`Are you sure you want to delete ${selectedBook.title}`)) { this.onDeleteClick(selectedBook._id) }; }}
            >
              Delete Book
                    </Button>

                    </div>
                    </div>:""}
            </Card>


          {/* </div> */}
          {/* : */}


        {/* {this.props.isAuthenticated ? <NewBookForm></NewBookForm> : ''} */}









      </div>
    );
        }
        else {
          return(<Alert color='danger'>Sorry, something went wrong</Alert> )
        }
  }
}

const mapStateToProps = state => ({
  book: state.book,
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin
});

export default connect(
  mapStateToProps,
  { getBook, deleteBook }
)(DisplayBook);