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
import searchIcon from './../search.png'
// import './../App.css';
import {
  Link
} from 'react-router-dom';

class BookList extends Component {

state={
  
    booksToDisplay:[],
    filterValue:'',
    firstDisplayedList: true
  }


  static propTypes = {
    getBooks: PropTypes.func.isRequired,
    books: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };


  componentDidMount() {
    this.props.getBooks();
  }



  handleFilterChange=(event)=>{
    event.preventDefault()
    const filterValue=event.target.value
    console.log(filterValue)
    this.setState({
      firstDisplayedList:false
    })
    this.setState((prevState,props)=>{
      
    const { books } = this.props.book;
     const filteredBookList=books.filter((book)=>{
       //console.log(book)
       return (book.title.toLowerCase().includes(filterValue.toLowerCase())||
              book.author.toLowerCase().includes(filterValue.toLowerCase())||
              book.description.toLowerCase().includes(filterValue.toLowerCase())||
              book.ISBN==filterValue)
     })

     return {
       booksToDisplay:filteredBookList,
       filterValue
     }
    })
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
    const bookList=(!(this.state.firstDisplayedList)? this.state.booksToDisplay: books)

    const allBooks=bookList.map((book,index) => (
        <Card key={index} style={{ width: '18rem' }}>
        <CardImg  width="20px" src={book.img_src} alt="Card image cap" />
        <CardBody body className="text-center">
          <CardTitle><b>{book.title}</b></CardTitle>
          <CardSubtitle>{book.author}</CardSubtitle>
          <CardText>{book.description}</CardText>
          <Button onClick={this.onClickGetBook.bind(this,book._id)}><Link to='/DisplayBook'>More</Link></Button>

        </CardBody>
      </Card>

))
    
    return (
      <Container>
        <h4>Book List</h4>
        <Link to={ {pathname:'/NewBookForm', type:'New'}} >    <Button className='remove-btn' color='info'size='sm'> New Book</Button></Link> 
        <div>
        <label > Search Books:  </label>
        <input type="search"  size="35" value={this.state.filterValue} onChange={this.handleFilterChange}  placeholder=" By name, author or description" results="0"/>
       
        {/* <input type="image" width="10%" heigth="10%" src={searchIcon} alt="Search"/> */}
      </div>


          <Row>
          

           {allBooks}

          
           </Row>
           {/* {this.props.isAuthenticated?  <NewBookForm></NewBookForm>: ''} */}
          
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